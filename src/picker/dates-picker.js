import React, {useReducer, useEffect, useRef} from 'react'
import Select from './select/select'
import './dates-picker.css'
import './submitElement.css'
import Input, { ArrowIcon } from './input/input'
import Calendar from './calendars/calendar'
import PeriodSideBar from './period-side-bar/period-side-bar'
import {pickerReducer} from './pickerReducer'
import { inputValueValidation, formatDate, createInputValue } from '../utils/converters'

import {
  START_DATE,
  END_DATE,
  SUBMIT,
  CHANGE_STEP,
  CHANGE_PERIOD,
  CHANGE_CALENDAR_TYPE,
  CHANGE_YEAR,
  CHANGE_MONTH,
  SET_INPUT_FOCUS,
  UPDATE_DATES,
  VALID_FORM,
  NEED_INPUTS_REVERSE,
  MASKS,
  INPUTS_PLACEHOLDERS
} from '../utils/consts'
export default function DatesPicker(props) {
  

  let newProps = {
    validFormData: false,
    focusLocation: null,

    startDate:{
      name: 'startDate',
      selectedValuesStr:{startDate: '', endDate: ''},
      visibleValuesStr:{startDate: '', endDate: ''},
      selectedValuesDateFormat:{startDate: null, endDate: null},
      visibleValuesDateFormat:{startDate: null, endDate: null}
    },

    endDate:{
      name: 'endDate',
      selectedValuesStr:{startDate: '', endDate: ''},
      visibleValuesStr:{startDate: '', endDate: ''},
      selectedValuesDateFormat:{startDate: null, endDate: null},
      visibleValuesDateFormat:{startDate: null, endDate: null}
    }

  }

  let expProps = Object.assign({}, props, newProps)
  const [state, dispatch] = useReducer(pickerReducer, expProps)


  //foo смена фокуса
  const changeFocusLocation = (id) => {

    if(id) {
      dispatch({ type: SET_INPUT_FOCUS, focusLocation: id})  
      return
    }

    if(state.startDate.selectedValuesDateFormat.startDate && state.endDate.selectedValuesDateFormat.endDate){
      dispatch({ type: SET_INPUT_FOCUS, focusLocation: null})
      return
    }

    if(state.focusLocation===START_DATE && state.startDate.selectedValuesDateFormat.startDate){
      dispatch({ type: SET_INPUT_FOCUS, focusLocation: END_DATE})
      return
    }

    if(state.focusLocation===END_DATE && state.endDate.selectedValuesDateFormat.endDate){
      dispatch({ type: SET_INPUT_FOCUS, focusLocation: START_DATE})
      return
    }
    
  }

  //возвращает id другого интпута
  function anotherInput(id){
    if(id===START_DATE){
      return END_DATE
    }
    if(id===END_DATE){
      return START_DATE
    }
  }


  const setVisibleValue = (value) =>{
    const id = state.focusLocation

    if(!value){
      let dateCopy = Object.assign({}, state[id])
      dateCopy.visibleValuesStr = Object.assign({}, dateCopy.selectedValuesStr)
      dateCopy.visibleValuesDateFormat = Object.assign({}, dateCopy.selectedValuesDateFormat)
      
      dispatch({type: UPDATE_DATES, id: id, value: dateCopy})
      
      return
    }

    const startDateValue = createInputValue(value, START_DATE, state.calendarType, state.year, state.month)
    const endDateValue = createInputValue(value, END_DATE, state.calendarType, state.year, state.month)

    const startDateResult = inputValueValidation(START_DATE, startDateValue, state.year, state.period).newDate
    const endDateResult = inputValueValidation(END_DATE, endDateValue, state.year, state.period).newDate

    let dateCopy = Object.assign({}, state[id])
    dateCopy.visibleValuesStr = {startDate: startDateValue, endDate: endDateValue}
    dateCopy.visibleValuesDateFormat = {startDate: startDateResult, endDate: endDateResult}
  
    dispatch({type: UPDATE_DATES, id: id, value: dateCopy})
  
  }


  const setRealInputValue = ( value, wherefrom) =>{
    const id = state.focusLocation
    let startDateValue, endDateValue
    if((wherefrom)&&(wherefrom==='calendar')){
      startDateValue = createInputValue(value, START_DATE, state.calendarType, state.year, state.month)
      endDateValue = createInputValue(value, END_DATE, state.calendarType, state.year, state.month)

    } else{
      startDateValue = value
      endDateValue = value
      //что насчет period == WEEK ??????? need validation
    }
    const startDateResult = inputValueValidation(START_DATE, startDateValue, state.year, state.period).newDate
    const endDateResult = inputValueValidation(END_DATE, endDateValue, state.year, state.period).newDate
    const dateIsCorrect = startDateResult && endDateResult

    dispatch({type: UPDATE_DATES, id: id, value: {
      name: id,
      selectedValuesStr:{startDate: startDateValue, endDate: endDateValue},
      visibleValuesStr:{startDate: startDateValue, endDate: endDateValue},
      selectedValuesDateFormat:{
        startDate: startDateResult, 
        endDate: endDateResult
      },
      visibleValuesDateFormat:{
        startDate: startDateResult, 
        endDate: endDateResult
      }
    }})

    if(dateIsCorrect){
      if(!state[anotherInput(id)].selectedValuesDateFormat[anotherInput(id)]){
        console.log('changeFocusLocation')
        changeFocusLocation(anotherInput(id))
      }else{
        changeFocusLocation('null')
        console.log('changeFocusLocation else')
      }
    }
    
  }


  function deepCopyDate(date){
    return{
      name: date.name,
      selectedValuesStr: Object.assign({}, date.selectedValuesStr),
      visibleValuesStr: Object.assign({}, date.visibleValuesStr),
      selectedValuesDateFormat: Object.assign({}, date.selectedValuesDateFormat),
      visibleValuesDateFormat: Object.assign({}, date.visibleValuesDateFormat)
    }
  }

  useEffect(()=>{
    const firstDate = state.startDate.visibleValuesDateFormat.startDate
    const secondDate = state.endDate.visibleValuesDateFormat.endDate
    //переписать changeFocusLocation
    //changeFocusLocation()
    if(!firstDate || !secondDate){
      dispatch({type:VALID_FORM, validFormData: false})
      return
    }

    //ошибка!!!!!!!!!
    if(firstDate > secondDate){
      const newStartDate = deepCopyDate(state.endDate)
      const newEndDate = deepCopyDate(state.startDate)
      dispatch({type: UPDATE_DATES, id: START_DATE, value: newStartDate})
      dispatch({type: UPDATE_DATES, id: END_DATE, value: newEndDate})
      changeFocusLocation(anotherInput(state.focusLocation))
    }
    dispatch({type:VALID_FORM, validFormData: true})

  },[state.startDate.visibleValuesDateFormat.startDate, state.endDate.visibleValuesDateFormat.endDate])


////////////////////////////////////////////////////////////////
// сброс данных при смене периода
  const dropInputsValues = () => {
    
    const pureStartDate = {
      name: 'startDate',
      selectedValuesStr:{startDate: '', endDate: ''},
      visibleValuesStr:{startDate: '', endDate: ''},
      selectedValuesDateFormat:{startDate: null, endDate: null},
      visibleValuesDateFormat:{startDate: null, endDate: null}
    }

    const pureEndDate = {
      name: 'endDate',
      selectedValuesStr:{startDate: '', endDate: ''},
      visibleValuesStr:{startDate: '', endDate: ''},
      selectedValuesDateFormat:{startDate: null, endDate: null},
      visibleValuesDateFormat:{startDate: null, endDate: null}
    }

    dispatch({type: UPDATE_DATES, id: START_DATE, value: pureStartDate})
    dispatch({type: UPDATE_DATES, id: END_DATE, value: pureEndDate})

  }

  useEffect(()=>{
    //console.log('изменился период')
    dropInputsValues()
    dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: state.period })
  },[state.period])
//////////////////////////////////////////////////////////////

  function messageCreator(id){
    if(state[id].visibleValuesDateFormat[id]){
      return formatDate(state[id].visibleValuesDateFormat[id])
    }

    if((state.focusLocation === id)||(state[id].visibleValuesStr[id]==='')){
      return '...'
    }

    return 'внесены некорректные данные'
  }

  
  const startDateIsOk = (state.startDate.inputValue===''||state.focusLocation===START_DATE||state.startDate.result)? true : false
  const endDateIsOk = (state.endDate.inputValue===''||state.focusLocation===END_DATE||state.endDate.result)? true : false
  const showErrorMessage = !startDateIsOk||!endDateIsOk||(!state.validFormData&&state.startDate.result&&state.endDate.result&&state.focusLocation!==START_DATE&&state.focusLocation!==END_DATE)
  
  const showCalendar = (state.focusLocation===START_DATE)||(state.focusLocation===END_DATE)
  const value1 = state.startDate.visibleValuesStr.startDate
  const mask1 = (state.focusLocation === START_DATE )? MASKS[state.period] : ''
  const value2 = state.endDate.visibleValuesStr.endDate
  const mask2 = (state.focusLocation === END_DATE )? MASKS[state.period] : ''
  const message1 = `Начало: ${messageCreator(START_DATE)}`
  const message2 = `Конец: ${messageCreator(END_DATE)}`

  return (
    <>
      <div className="dates-picker-wrapper">
        <Select changePeriod={(value)=>dispatch({ type: CHANGE_STEP, step: value })} step={state.step}/>      

        
        <div>
          <div className="input-container">
            <Input
              id={START_DATE} 
              value={value1}
              mask={mask1}
              placeholder={INPUTS_PLACEHOLDERS[state.period]} 
              focusLocation={state.focusLocation} 
              changeFocusLocation={changeFocusLocation}
              setRealInputValue={setRealInputValue}
            />
            <ArrowIcon />
            <Input 
              id={END_DATE}
              value={value2}
              mask={mask2}
              placeholder={INPUTS_PLACEHOLDERS[state.period]} 
              focusLocation={state.focusLocation} 
              changeFocusLocation={changeFocusLocation}
              setRealInputValue={setRealInputValue}
            />
          </div>

          {showCalendar && (
          <div aria-roledescription="datepicker" id="datepicker">

            <Calendar 
              step={state.step}
              calendarType={state.calendarType}
              year={state.year}
              month={state.month}              
              setRealInputValue={setRealInputValue}
              setVisibleValue={setVisibleValue}
              changeClendarType={(type)=>dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: type })}
              changeMonth={(month)=>dispatch({ type: CHANGE_MONTH, month: month })}
              changeYear={(year)=>dispatch({ type: CHANGE_YEAR, year: year })}
            />		
            <PeriodSideBar 
              period={state.period} 
              step={state.step} 
              changePeriod={(p)=>dispatch({ type: CHANGE_PERIOD, period: p })}
            />
			    </div>)}

        </div>

      </div>
      <div className="submitElement">
          <div>{message1}</div>
          <div>{message2}</div>

        {state.validFormData && (<div>Данные корректны</div>)}
        
        <input id={SUBMIT} type="submit" value="Отправить" disabled={!state.validFormData}></input>

      </div>
      
    </>
    
  )
}
