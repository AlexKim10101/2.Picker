import React, {useEffect} from 'react'
import classnames from 'classnames'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import {
  steps,
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
  SET_RESULT_END_DATE
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
}) {

  
  const { 
    startDate, 
    endDate, 
    startDateIsCorrect, 
    endDateIsCorrect, 
    validFormData, 
    period,
    resultStartDate,
    resultEndDate
  } = usePickerState()
  const dispatch = usePickerDispatch()
  const value = id === 'startDate' ? startDate : endDate



  useEffect(()=>{
    //валидация значения input

    switch(period){
      case DAY :{        
        if(dateValidation(startDate)){
          dispatch({type: SET_RESULT_START_DATE, resultStartDate: dateCreater(startDate)})
        }
        if(dateValidation(endDate)){
          dispatch({type: SET_RESULT_END_DATE, resultEndDate: dateCreater(endDate)})
        }

        // dispatch({type: VALID_START_DATE, startDateIsCorrect: dateValidation(startDate)})      
        // dispatch({type: VALID_END_DATE, endDateIsCorrect: dateValidation(endDate)}) 
        break;
      }
    }

    
  },[startDate, endDate])

  useEffect(()=>{
    console.log(resultStartDate)


  },[resultStartDate, resultEndDate])

  const onChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    let type;
    
    //изменение значения input
    switch (name){
      case 'startDate':
        dispatch({type: CHANGE_START_DATE, startDate: value})         
        break;
      case 'endDate':
        dispatch({type: CHANGE_END_DATE, endDate: value}) 
        break;
    }
  
  }
  const onBlur = e => {
  
  }

  const clsx = classnames('input-field', { active: id === focused })
  return (
    <div className="input-wrapper">
      <input
        id={id}
        name={id}
        className={clsx}
        autoComplete="off"
        placeholder={placeholder}
        onFocus={onFocus}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
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