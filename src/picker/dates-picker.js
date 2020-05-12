import React, {useReducer, useEffect, useRef} from 'react'
import Select from './select/select'
import './dates-picker.css'
import './submitElement.css'
import Input, { ArrowIcon } from './input/input'
import Calendar from './calendars/calendar'
import PeriodSideBar from './period-side-bar/period-side-bar'
import {pickerReducer} from './pickerReducer'
import { inputValueValidation, formatDate } from '../utils/converters'

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
  NEED_INPUTS_REVERSE
} from '../utils/consts'
export default function DatesPicker(props) {
  

  let newProps = {
    validFormData: false,
    focusLocation: null,
    needIpnutsReverse: false,
    startDate:{
      name: START_DATE,
      inputValue: '',
      inputHoverValue: '',
      year: null,
      result: null,
    },
    endDate:{
      name: END_DATE,
      inputValue: '',
      inputHoverValue: '',
      year: null,
      result: null,
    }
  }

  let expProps = Object.assign({}, props, newProps)
  const [state, dispatch] = useReducer(pickerReducer, expProps)

  const changeFocusLocation = (id) => {

    if(id) {
      dispatch({ type: SET_INPUT_FOCUS, focusLocation: id})  
      return
    }

    if(state.startDate.result && state.endDate.result){
      dispatch({ type: SET_INPUT_FOCUS, focusLocation: SUBMIT})
      return
    }

    if(state.focusLocation===START_DATE && state.startDate.result){
      dispatch({ type: SET_INPUT_FOCUS, focusLocation: END_DATE})
      return
    }

    if(state.focusLocation===END_DATE && state.endDate.result){
      dispatch({ type: SET_INPUT_FOCUS, focusLocation: START_DATE})
      return
    }
    
  }

  function anotherInput(id){
    if(id===START_DATE){
      return END_DATE
    }
    if(id===END_DATE){
      return START_DATE
    }
  }

  const changeInputHoverValue = (id, value) => {
    //const resultValidation = inputValueValidation(id, value, state.year, state.period)
    const newField = Object.assign({}, state[id])

    if(!value){
      newField.inputHoverValue = newField.inputValue
      dispatch({type: UPDATE_DATES, id: id, value: newField})
      return
    }

    newField.inputHoverValue = (value==='__.__.____'||value==='_-ое полугодие') ? '' : value;
    dispatch({type: UPDATE_DATES, id: id, value: newField})
    

    //console.log(state[anotherInput(id)])
    if(!state[anotherInput(id)].result){
      console.log('второго нет')
      return
    }


    const resultValidation = inputValueValidation(id, value, state.year, state.period)
    //console.log(resultValidation.newDate)
    

    if((id===START_DATE&&resultValidation.newDate>state[anotherInput(id)].result)||(id===END_DATE&&resultValidation.newDate<state[anotherInput(id)].result)){
      dispatch({type: NEED_INPUTS_REVERSE, needIpnutsReverse: true})
    } else{
      dispatch({type: NEED_INPUTS_REVERSE, needIpnutsReverse: false})
    }

  }

  

  const setInputResult = (id, value) => {
    const resultValidation = inputValueValidation(id, value, state.year, state.period)
    const newField = Object.assign({}, state[id])

    newField.inputValue = (value==='__.__.____'||value==='_-ое полугодие') ? '' : value;
    newField.year = state.year
    newField.result = resultValidation.newDate

    dispatch({type: UPDATE_DATES, id: id, value: newField})
    
  }

  const dropInputsValues = () => {
    const newStartDate = Object.assign({}, state.startDate)
    const newEndDate = Object.assign({}, state.endDate)

    newStartDate.inputValue = ''
    newEndDate.inputValue = ''

    newStartDate.inputHoverValue = ''
    newEndDate.inputHoverValue = ''
    
    newStartDate.result = null
    newEndDate.result = null

    dispatch({type: UPDATE_DATES, id: START_DATE, value: newStartDate})
    dispatch({type: UPDATE_DATES, id: END_DATE, value: newEndDate})

  }

  useEffect(()=>{
    changeFocusLocation()
    if(!state.startDate.result || !state.endDate.result){
      return
    }

    if(state.startDate.result>state.endDate.result){
      const bufer = Object.assign({}, state.startDate)
      state.startDate = Object.assign({}, state.endDate)
      state.endDate = Object.assign({}, bufer)

    }
    dispatch({type:VALID_FORM, validFormData: true})
    dispatch({type: NEED_INPUTS_REVERSE, needIpnutsReverse: false})


  },[state.startDate.result, state.endDate.result])

  useEffect(()=>{
    //console.log('изменился период')
    dropInputsValues()
    dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: state.period })
  },[state.period])


//submitElem
  const submitEl = useRef(null)

  useEffect(() => {
    if (submitEl.current.id === state.focusLocation) {
      submitEl.current.focus()
    }
  }, [state.focusLocation, state.validFormData])
  
  const startDateIsOk = (state.startDate.inputValue===''||state.focusLocation===START_DATE||state.startDate.result)? true : false
  const endDateIsOk = (state.endDate.inputValue===''||state.focusLocation===END_DATE||state.endDate.result)? true : false
  const showErrorMessage = !startDateIsOk||!endDateIsOk||(!state.validFormData&&state.startDate.result&&state.endDate.result&&state.focusLocation!==START_DATE&&state.focusLocation!==END_DATE)
  const showCalendar = (state.focusLocation===START_DATE)||(state.focusLocation===END_DATE)

  return (
    <>
      <div className="dates-picker-wrapper">
        <Select changePeriod={(value)=>dispatch({ type: CHANGE_STEP, step: value })} step={state.step}/>      

        
        <div>
          <div className="input-container">
            <Input 
              data={state[START_DATE]} 
              focusLocation={state.focusLocation} 
              period={state.period} 
              placeholder="Начало" 
              changeFocusLocation={changeFocusLocation}
              //changeInputValue={changeInputValue}
              setInputResult={setInputResult}
              needIpnutsReverse={state.needIpnutsReverse}
            />
            <ArrowIcon />
            <Input 
              data={state[END_DATE]} 
              focusLocation={state.focusLocation} 
              period={state.period} 
              placeholder="Конец" 
              changeFocusLocation={changeFocusLocation}
              // changeInputValue={changeInputValue}
              setInputResult={setInputResult}
              needIpnutsReverse={state.needIpnutsReverse}
            />
          </div>

          {showCalendar && (
          <div aria-roledescription="datepicker" id="datepicker">

            <Calendar 
              step={state.step}
              calendarType={state.calendarType}
              year={state.year}
              month={state.month}
              focusLocation={state.focusLocation}
              changeInputHoverValue={changeInputHoverValue}
              setInputResult={setInputResult}
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

        {state.validFormData && (<div>Данные корректны</div>)}
        {showErrorMessage && (<div>Данные некорректны</div>)}
        {(state.startDate.result && state.endDate.result) &&(<div>Выбран период с {formatDate(state.startDate.result)} по {formatDate(state.endDate.result)}</div>)}
        
        <input ref={submitEl} id={SUBMIT} type="submit" value="Отправить" disabled={!state.validFormData}></input>

      </div>
      
    </>
    
  )
}
