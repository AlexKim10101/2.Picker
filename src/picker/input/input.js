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
} from '../../utils/consts'
import './input.css'
const [
  DAY,
  WEEK,
  MONTH,
  QUARTER,
  HALFYEAR,
  YEAR
] = steps

function dateCreater(string){
	let arrD = string.split(".");
  arrD[1] -= 1;
  return new Date(arrD[2], arrD[1], arrD[0]);
}

function dateValidation(value){
	let arrD = value.split(".");
  arrD[1] -= 1;
  let d = new Date(arrD[2], arrD[1], arrD[0]);
  if ((value.length == 10) && (d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
    return true;
  } else {    
    return false;
  }
}



export default function Input({
  id,
  placeholder,
  focused,
  onFocus,
  keyPress
}) {

  
  const { 
    startDate, 
    endDate,   
    invalidStartDate,
    invalidEndDate,
    validFormData, 
    period,
    year,
    resultStartDate,
    resultEndDate,
    inputFocus
  } = usePickerState()
  const dispatch = usePickerDispatch()
  const value = id === 'startDate' ? startDate.value : endDate.value

  function inputValueValidation(fieldName, dateObj, period){
    let monthModificator, 
      monthDateModificator,   
      qurtArr,    
      halfYearArr,   
      yearPreDate;


    let newDate = null;
    let changeIsCorrect = false;

    if(fieldName == START_DATE){
      monthModificator = MONTH_MODIFICATOR_FOR_START
      monthDateModificator = DATE_MONTH_MODIFICATOR_FOR_START
      qurtArr = QUART_VALUES_FOR_START;
      halfYearArr = HALF_YEAR_VALUES_FOR_START;      
      yearPreDate = YEAR_VALUE_FOR_START;

    }

    if(fieldName == END_DATE){
      monthModificator = MONTH_MODIFICATOR_FOR_END;
      monthDateModificator = DATE_MONTH_MODIFICATOR_FOR_END;
      qurtArr = QUART_VALUES_FOR_END;
      halfYearArr = HALF_YEAR_VALUES_FOR_END;
      yearPreDate = YEAR_VALUE_FOR_END;
    }

    console.log(dateObj)

    switch(period){
      case DAY :
      case WEEK: {        
        if(dateValidation(dateObj.value)){
          newDate = dateCreater(dateObj.value)
          changeIsCorrect = true;

        }
        break;
      }
      case MONTH :{
        if(months.includes(dateObj.value)){       
          newDate = new Date( new Date(dateObj.year, months.indexOf(dateObj.value)+monthModificator, 1) - monthDateModificator)
          changeIsCorrect = true;
        }       

        if(monthsFull.includes(dateObj.value)){  
          newDate = new Date( new Date(dateObj.year, monthsFull.indexOf(dateObj.value)+monthModificator, 1) - monthDateModificator)    
          changeIsCorrect = true;
        }
        
        break;
      }
      case QUARTER :{
        if(quarters.includes(dateObj.value)){          
          const qurtIndex = quarters.indexOf(dateObj.value)
          const blank = qurtArr[qurtIndex] + dateObj.year;
          newDate = dateCreater(blank);
          changeIsCorrect = true;
        }            
        break;
      }

      case HALFYEAR :{
        if(halfYear.includes(dateObj.value)){
          const halfYearIndex = halfYear.indexOf(dateObj.value)
          const blank = halfYearArr[halfYearIndex] + dateObj.year;
          newDate = dateCreater(blank)
          changeIsCorrect = true;

        }             
        break;
      }

      case YEAR:{
        if(dateValidation(yearPreDate + dateObj.value)){
          newDate = dateCreater(yearPreDate + dateObj.value)
          changeIsCorrect = true;
        }
      }
    }
    
    
    return {verdict: changeIsCorrect, newDate: newDate}
      
  }

  useEffect(()=>{
    //валидация значения input startDate
    let {verdict, newDate} = inputValueValidation(START_DATE, startDate, period);    
    dispatch({type: SET_RESULT_START_DATE, resultStartDate: newDate })

  },[startDate])


  useEffect(()=>{
    //валидация значения input endDate
    let {verdict, newDate} = inputValueValidation(END_DATE, endDate, period)
    dispatch({type: SET_RESULT_END_DATE, resultEndDate: newDate })


  },[ endDate]) 

  useEffect(()=>{
    //валидация всей формы
    console.log('useEffect VALID_FORM')
    
    if(resultStartDate&&resultEndDate){
      dispatch({type:VALID_FORM, validFormData: resultStartDate<resultEndDate})
      return
    } 
    
    dispatch({type:VALID_FORM, validFormData: false})
    
  },[resultStartDate, resultEndDate])

  const onChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    //console.log('changing')
    //изменение значения input
    switch (name){
      case START_DATE:
        console.log(value)

        dispatch({type: CHANGE_START_DATE, startDate: {value:value, year: year}})         
        break;
      case END_DATE:
        dispatch({type: CHANGE_END_DATE, endDate: {value:value, year: year}}) 
        break;
    }
  
  }
  


  const myOnFocus = (e) =>{
    //console.log(e.target.name)
    let value = e.target.id;
    dispatch({type: SET_INPUT_FOCUS, inputFocus: value})

    if(value == START_DATE) {
      dispatch({type: VALID_START_DATE, invalidStartDate: false})
    }
    if(value == END_DATE) {
      dispatch({type: VALID_END_DATE, invalidEndDate: false})
    }
    
  }

  const myOnBlur = (e) =>{
    let value = e.target.id;

    console.log('e.relatedTarget',e.relatedTarget)

  }



  const clsx = classnames('input-field', { active: id === inputFocus })

  //установка фокуса
  const inputEl = useRef(null)
  useEffect(() => {
    console.log('useeffect inputfocus')
    if(inputEl.current){
      console.log('inputEl.current==true')
      



    }



    if (inputEl.current.id === inputFocus) {
      inputEl.current.focus()
      console.log('focus')
    }
  }, [inputFocus])

  // function needFocusOnThisElem(){
  //   let needFocusElemId = START_DATE
  //   if(startDate.value){
  //     needFocusElemId = END_DATE
  //   }
  //   if(startDate.value&&endDate.value){
  //     needFocusElemId = SUBMIT
  //   }
  //   return needFocusElemId===id
  // }
  // useEffect(() => {
  //   if(!focused && needFocusOnThisElem()){
  //     onFocus()
  //   }
  // }, [focused])


  function handleKeyPress(e){
    if(e.key==="Enter"){
      
      console.log('enter')
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
        value={value}
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