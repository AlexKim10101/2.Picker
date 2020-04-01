import React, {useEffect} from 'react'
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
  SET_INPUT_FOCUS
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
    year,
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
       
        break;
      }
      case MONTH :{
        if(months.includes(startDate)){          
          dispatch({type: SET_RESULT_START_DATE, resultStartDate: new Date(year, months.indexOf(startDate), 1)})
        }       

        if(monthsFull.includes(startDate)){          
          dispatch({type: SET_RESULT_START_DATE, resultStartDate: new Date(year, monthsFull.indexOf(startDate), 1)})
        }
        
        break;
      }
      case QUARTER :{
        if(quarters.includes(startDate)){
          const startQurtArr = ['01.01.', '01.04.', '01.07.','01.10.'];
          const startIndex = quarters.indexOf(startDate)
          const startBlank = startQurtArr[startIndex] + year;
          dispatch({type: SET_RESULT_START_DATE, resultStartDate: dateCreater(startBlank)})
        }
            
        break;
      }

      case HALFYEAR :{
        if(halfYear.includes(startDate)){
          const startHalfYearArr = ['01.01.', '01.07.'];
          const startIndex = halfYear.indexOf(startDate)
          const startBlank = startHalfYearArr[startIndex] + year;
          dispatch({type: SET_RESULT_START_DATE, resultStartDate: dateCreater(startBlank)})
        }             
        break;
      }

      case YEAR:{
        if(dateValidation('01.01.'+startDate)){
          dispatch({type: SET_RESULT_START_DATE, resultStartDate: dateCreater('01.01.'+startDate)})
        }
      }
    }  
  },[startDate])



  useEffect(()=>{
    //валидация значения input

    switch(period){
      case DAY :{       
        if(dateValidation(endDate)){
          dispatch({type: SET_RESULT_END_DATE, resultEndDate: dateCreater(endDate)})
        }
        break;
      }
      case MONTH :{
        if(months.includes(endDate)){          
          dispatch({type: SET_RESULT_END_DATE, resultEndDate:new Date( new Date(year, months.indexOf(endDate)+1, 1)-(3600 * 24 * 1000))})
        }        
        if(monthsFull.includes(endDate)){          
          dispatch({type: SET_RESULT_END_DATE, resultEndDate:new Date( new Date(year, monthsFull.indexOf(endDate)+1, 1)-(3600 * 24 * 1000))})
        }
        break;
      }
      case QUARTER :{      
        if(quarters.includes(endDate)){
          const endQurtArr = ['31.03.', '30.06.', '30.09.','31.12.'];
          const endIndex = quarters.indexOf(endDate)
          const endBlank = endQurtArr[endIndex] + year;
          dispatch({type: SET_RESULT_END_DATE, resultEndDate: dateCreater(endBlank)})
        }       
        break;
      }
      case HALFYEAR :{             
        if(halfYear.includes(endDate)){
          const endHalfYearArr = ['30.06.','31.12.'];
          const endIndex = halfYear.indexOf(endDate)
          const endBlank = endHalfYearArr[endIndex] + year;
          dispatch({type: SET_RESULT_END_DATE, resultEndDate: dateCreater(endBlank)})
        }       
        break;
      }

      case YEAR:{  
        if(dateValidation('31.12.'+endDate)){
          dispatch({type: SET_RESULT_END_DATE, resultEndDate: dateCreater('31.12.'+endDate)})
        }
      }
    }

    
  },[ endDate])

  useEffect(()=>{
    console.log(resultStartDate)
    console.log(resultEndDate)


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


  const myOnFocus = (e) =>{
    console.log(e.target.name)

    dispatch({type: SET_INPUT_FOCUS, inputFocus: e.target.name})
    onFocus();

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
        onFocus={myOnFocus}
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