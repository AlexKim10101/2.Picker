import React, {useEffect, useRef} from 'react'
import classnames from 'classnames'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import {
  steps,
  months,
  monthsFull,
  quarters,
  halfYear,
  stepsLabels,
  CHANGE_STEP,
  CHANGE_PERIOD,
  CHANGE_CALENDAR_TYPE,
  CHANGE_START_DATE,
  CHANGE_END_DATE,
  VALID_START_DATE,
  VALID_END_DATE,  
  VALID_FORM,
  SET_RESULT_START_DATE,
  SET_RESULT_END_DATE,
  SET_INPUT_FOCUS,
  MONTH_MODIFICATOR_FOR_START,
  MONTH_MODIFICATOR_FOR_END,
  DATE_MONTH_MODIFICATOR_FOR_START,
  DATE_MONTH_MODIFICATOR_FOR_END,
  QUART_VALUES_FOR_START,
  QUART_VALUES_FOR_END,
  HALF_YEAR_VALUES_FOR_START,
  HALF_YEAR_VALUES_FOR_END,
  YEAR_VALUE_FOR_START,
  YEAR_VALUE_FOR_END,
  START_DATE,
  END_DATE,
  SUBMIT,
  SET_FOCUS_TRANSFER,
  SET_INPUT_VALIDATION,
  SET_FORM_VALIDATION,
  UPDATE_DATES
} from '../../utils/consts'

import {dateCreater, dateValidation, inputValueValidation} from  '../../utils/converters'

import './input.css'
const [
  DAY,
  WEEK,
  MONTH,
  QUARTER,
  HALFYEAR,
  YEAR
] = steps



export default function Input({ id, placeholder }){
  const {      
    validFormData, 
    period,
    year,
    inputFocus,
    needChangeFocus,
    needInputValidation,
    needFormValidation,
    dates
  } = usePickerState()
  const dispatch = usePickerDispatch()

  
  const myOnBlur = (e) =>{
    let value = e.target.id;
    let name = value
    console.log('test',e.relatedTarget)
    const clickOnCalendar = ({relatedTarget})=>{
      if (relatedTarget === undefined) return false
      if (relatedTarget === null) return false;
      let node = relatedTarget.parentNode;
      while (node !== null) {
        if (node.id === 'calendar') return true;
        node = node.parentNode;
      }
      return false
    }
    if (clickOnCalendar(e)){
      return
    }

    console.log('клик не по календарю')
    dispatch({type: SET_INPUT_VALIDATION, needInputValidation: true})
    /////
    // let dateObj = {value: dates[name].inputValue, year: dates[name].year}
    // const {verdict, newDate} = inputValueValidation(dates[name].name, dateObj, period)
    // const newValue = Object.assign({}, dates[name], {result: newDate, invalidValue:verdict})
    // const result = Object.assign({}, dates, {[name]:newValue})
    // dispatch({type: UPDATE_DATES, dates: result})
    
  }

  useEffect(()=>{
    if(!needInputValidation){return}
    for (let key in dates){
      //console.log(dates[key])
      let dateObj = {value: dates[key].inputValue, year: dates[key].year}
      const {verdict, newDate} = inputValueValidation(dates[key].name, dateObj, period)
      console.log('newDate',newDate)
      const newValue = Object.assign({}, dates[key], {result: newDate, invalidValue:verdict})
      console.log('newValue', newValue)

      const result = Object.assign({}, dates, {[key]:newValue})
      console.log('result', result)

      dispatch({type: UPDATE_DATES, dates: result})

    }
    dispatch({type: SET_INPUT_VALIDATION, needInputValidation: false})
    dispatch({type: SET_FORM_VALIDATION, needFormValidation: true})

    //console.log(dates)
  },[needInputValidation])



  useEffect(()=>{
    //валидация всей формы

    console.log('ALARM!!!!!!')
    console.log('needFormValidation', needFormValidation)
    console.log('dates.startDate.result', dates.startDate.result)



    if(!needFormValidation){return}

    if(dates.startDate.result && dates.endDate.result){
      dispatch({type:VALID_FORM, validFormData: dates.startDate.result<dates.endDate.result})
    } else{
      dispatch({type: VALID_FORM, validFormData: false})
    }    
    dispatch({type: SET_FOCUS_TRANSFER, needChangeFocus:true})
    dispatch({type: SET_FORM_VALIDATION, needFormValidation: false})

    console.log('DISPATCH needFormValidation')
  },[needFormValidation])


  useEffect(()=>{
    if(!needChangeFocus){return}
    const{startDate, endDate} = dates
    console.log(startDate)
    const nextFocus = nextFocusSetter(startDate.inputValue,
      startDate.invalidValue,
      endDate.inputValue,
      endDate.invalidValue)
    console.log('nextFocus',nextFocus)
    dispatch({type: SET_INPUT_FOCUS, inputFocus: nextFocus})
    dispatch({type: SET_FOCUS_TRANSFER, needChangeFocus: false})

  },[needChangeFocus, validFormData])


  function nextFocusSetter(startDateInputValue, startDateStatus, endDateInputValue, endDateStatus){    
    if((startDateInputValue === '') || (!startDateStatus)){
      return START_DATE
    }
    if((endDateInputValue==='') || (!endDateStatus)){
      return END_DATE
    }
    return SUBMIT
  }


  const onChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    const newValue = Object.assign({}, dates[name], {inputValue: value, year: year})
    const result = Object.assign({}, dates, {[name]:newValue})
    dispatch({type:UPDATE_DATES, dates: result})
  
  }
  


  const myOnFocus = (e) =>{
    let value = e.target.id;
    dispatch({type: SET_INPUT_FOCUS, inputFocus: value})    
  }

  //let rejected = id === START_DATE? invalidStartDate : invalidEndDate
  const rejected = dates[id].invalidValue && id !== inputFocus;
  const clsx = classnames('input-field', { active: id === inputFocus }, {rejected: rejected})
  //const clsx = classnames('input-field',  {rejected: rejected})

  //установка фокуса
  const inputEl = useRef(null)
  useEffect(() => {
  
    if (inputEl.current.id === inputFocus) {
      inputEl.current.focus()
    }
  }, [inputFocus])


  


  function handleKeyPress(e){
    if(e.key==="Enter"){      
      console.log('enter')
      myOnBlur(e)
    }
  }


  return (
    <div className="input-wrapper">
      <input
        ref={inputEl}
        id={id}
        name={id}
        className={clsx}
        autoComplete="off"
        placeholder={placeholder}
        onFocus={myOnFocus}
        onBlur={myOnBlur}
        value={dates[id].inputValue}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export function ArrowIcon() {
  return (
    <div className="arrow-icon">
      <svg viewBox="0 0 1000 1000">
        <path d="M694 242l249 250c12 11 12 21 1 32L694 773c-5 5-10 7-16 7s-11-2-16-7c-11-11-11-21 0-32l210-210H68c-13 0-23-10-23-23s10-23 23-23h806L662 275c-21-22 11-54 32-33z" />
      </svg>
    </div>
  )
}