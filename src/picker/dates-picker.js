import React, {useReducer, useEffect, useRef} from 'react'
import Select from './select/select'
import './dates-picker.css'
import './submitElement.css'
import Input, { ArrowIcon } from './input/input'
import Calendar from './calendars/calendar'
import PeriodSideBar from './period-side-bar/period-side-bar'
import {pickerReducer} from './pickerReducer'
import { inputValueCreater, inputValueValidation, maskQualifier } from '../utils/converters'


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
  steps
} from '../utils/consts'
export default function DatesPicker(props) {
  

  let newProps = { 
    validFormData: false,
    inputFocus: null,
    startDate:{
      name: START_DATE,
      inputValue: '',
      year: null,
      result: null,
    },
    endDate:{
      name: END_DATE,
      inputValue: '',
      year: null,
      result: null,
    }
  }

  let expProps = Object.assign({}, props, newProps)

  const [state, dispatch] = useReducer(pickerReducer, expProps)


  const changePeriodInSelect = (target) => {
    dispatch({ type: CHANGE_STEP, step: target.value })
    dispatch({ type: CHANGE_PERIOD, period: target.value })
    //dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: target.value })
    dispatch({ type: SET_INPUT_FOCUS, inputFocus: START_DATE})  
  }

  const changeYear = (year) => {
    dispatch({ type: CHANGE_YEAR, year: year })
  }

  const changeMonth = (month) => {
    dispatch({ type: CHANGE_MONTH, month: month })

  }

  const changeClendarType = (type) =>{
    dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: type })
  }

  //input's functions
  const changeFocusLocation = (id) => {
    // console.log(state.inputFocus)
    // console.log(state.inputFocus)

    if(id) {
      dispatch({ type: SET_INPUT_FOCUS, inputFocus: id})  
      return
    }

    if(!state.inputFocus){
      console.log('!state.inputFocus')
      return
    }

    if(state.startDate.result && state.endDate.result){
      dispatch({ type: SET_INPUT_FOCUS, inputFocus: SUBMIT})
      console.log('state.startDate.result && state.endDate.result')
      return
    }

    if(state.inputFocus===START_DATE && state.startDate.result){
      dispatch({ type: SET_INPUT_FOCUS, inputFocus: END_DATE})
      return
    }

    if(state.inputFocus===END_DATE && state.endDate.result){
      dispatch({ type: SET_INPUT_FOCUS, inputFocus: START_DATE})
      return
    }
    
  }

  const changeInputValue = (id, value) => {
    const resultValidation = inputValueValidation(id, value, state[id].year, state.period)
    const newField = Object.assign({}, state[id])

    newField.inputValue = (value==='__.__.____'||value==='_-ое полугодие') ? '' : value;
    newField.year = state.year
    newField.result = resultValidation.newDate

    dispatch({type: UPDATE_DATES, id: id, value: newField})
    
  }


  const inputsValidation = () => {
    const newStartDate = Object.assign({}, state.startDate)
    const newEndDate = Object.assign({}, state.endDate)

    const validationResultStartDate = inputValueValidation(START_DATE, state.startDate.inputValue, state.startDate.year, state.period)
    const validationResultEndDate = inputValueValidation(END_DATE, state.endDate.inputValue, state.endDate.year, state.period)

    newStartDate.result = validationResultStartDate.newDate
    newEndDate.result = validationResultEndDate.newDate

    dispatch({type: UPDATE_DATES, id: START_DATE, value: newStartDate})
    dispatch({type: UPDATE_DATES, id: END_DATE, value: newEndDate})

  }

  useEffect(()=>{
    console.log('state.startDate.result ', state.startDate.result)
    console.log('state.endDate.result ', state.endDate.result)
    changeFocusLocation()
    if(state.startDate.result && state.endDate.result){
      dispatch({type:VALID_FORM, validFormData: state.startDate.result<state.endDate.result})
      return
    }
    dispatch({type:VALID_FORM, validFormData: false})

  },[state.startDate.result, state.endDate.result])

  useEffect(()=>{
    console.log('изменился период')
    inputsValidation()
    dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: state.period })
  },[state.period])


//submitElem
  const submitEl = useRef(null)

  useEffect(() => {
    if (submitEl.current.id === state.inputFocus) {
      submitEl.current.focus()
    }
  }, [state.inputFocus, state.validFormData])
  
  const startDateIsOk = (state.startDate.inputValue===''||state.inputFocus===START_DATE||state.startDate.result)? true : false
  const endDateIsOk = (state.endDate.inputValue===''||state.inputFocus===END_DATE||state.endDate.result)? true : false
  const showErrorMessage = !startDateIsOk||!endDateIsOk

  //test

  useEffect(()=>{
    console.log(state.validFormData)
  },[state.validFormData])



  useEffect(()=>{
    console.log(state.inputFocus)
  },[state.inputFocus])
  const showCalendar = (state.inputFocus===START_DATE)||(state.inputFocus===END_DATE)


  return (
    <>
      <div className="dates-picker-wrapper">
        <Select changePeriod={changePeriodInSelect} step={state.step}/>
        
        <div>
          <Input 
            data={state[START_DATE]} 
            focusLocation={state.inputFocus} 
            period={state.period} 
            placeholder="Начало" 
            changeFocusLocation={changeFocusLocation}
            changeInputValue={changeInputValue}
          />
          <ArrowIcon />
          <Input 
            data={state[END_DATE]} 
            focusLocation={state.inputFocus} 
            period={state.period} 
            placeholder="Конец" 
            changeFocusLocation={changeFocusLocation}
            changeInputValue={changeInputValue}
          />

          {showCalendar && (
          <div aria-roledescription="datepicker" id="datepicker">

            <Calendar 
              step={state.step}
              calendarType={state.calendarType}
              year={state.year}
              month={state.month}
              inputFocus={state.inputFocus}
              changeInputValue={changeInputValue}
              changeClendarType={changeClendarType}
              changeMonth={changeMonth}
              changeYear={changeYear}
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
        
        <input ref={submitEl} id={SUBMIT} type="submit" value="Отправить" disabled={!state.validFormData}></input>

      </div>
      
    </>
    
  )
}
