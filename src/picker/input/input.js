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
    validFormData, 
    period,
    year,
    resultStartDate,
    resultEndDate
  } = usePickerState()
  const dispatch = usePickerDispatch()
  const value = id === 'startDate' ? startDate.value : endDate.value

  function inputValueValidation(fieldName, dateObj, period){
    let typeName, 
      monthModificator, 
      monthDateModificator,   
      qurtArr,    
      halfYearArr,   
      yearPreDate,
      newDate;

    if(fieldName=='resultStartDate'){
      typeName = SET_RESULT_START_DATE;
      monthModificator = MONTH_MODIFICATOR_FOR_START
      monthDateModificator = DATE_MONTH_MODIFICATOR_FOR_START
      qurtArr = QUART_VALUES_FOR_START;
      halfYearArr = HALF_YEAR_VALUES_FOR_START;      
      yearPreDate = YEAR_VALUE_FOR_START;

    }

    if(fieldName=='resultEndDate'){
      typeName = SET_RESULT_END_DATE;
      monthModificator = MONTH_MODIFICATOR_FOR_END;
      monthDateModificator = DATE_MONTH_MODIFICATOR_FOR_END;
      qurtArr = QUART_VALUES_FOR_END;
      halfYearArr = HALF_YEAR_VALUES_FOR_END;
      yearPreDate = YEAR_VALUE_FOR_END;
    }



    switch(period){
      case DAY :
      case WEEK: {        
        if(dateValidation(dateObj.value)){
          newDate = dateObj.value;
          dispatch({type: typeName, [fieldName]: dateCreater(newDate)})          
        }
       
        break;
      }
      case MONTH :{
        if(months.includes(dateObj.value)){       
          newDate = new Date( new Date(dateObj.year, months.indexOf(dateObj.value)+monthModificator, 1) - monthDateModificator)
          dispatch({type: typeName, [fieldName]:newDate})
        }       

        if(monthsFull.includes(dateObj.value)){  
          newDate = new Date( new Date(dateObj.year, monthsFull.indexOf(dateObj.value)+monthModificator, 1) - monthDateModificator)    
          dispatch({type: typeName, [fieldName]: newDate})
        }
        
        break;
      }
      case QUARTER :{
        if(quarters.includes(dateObj.value)){
          
          const qurtIndex = quarters.indexOf(dateObj.value)
          const blank = qurtArr[qurtIndex] + dateObj.year;
          newDate = dateCreater(blank);
          dispatch({type: typeName, [fieldName]: newDate})
        }
            
        break;
      }

      case HALFYEAR :{
        if(halfYear.includes(dateObj.value)){
          const halfYearIndex = halfYear.indexOf(dateObj.value)
          const blank = halfYearArr[halfYearIndex] + dateObj.year;
          newDate = dateCreater(blank)
          dispatch({type: typeName, [fieldName]: newDate})
        }             
        break;
      }

      case YEAR:{
        if(dateValidation(yearPreDate + dateObj.value)){
          newDate = dateCreater(yearPreDate + dateObj.value)
          dispatch({type: typeName, [fieldName]: newDate })
        }
      }
    }
    
  }

  useEffect(()=>{
    //валидация значения input startDate
    inputValueValidation('resultStartDate', startDate, period)
    
  },[startDate])


  useEffect(()=>{
    //валидация значения input endDate
    inputValueValidation('resultEndDate', endDate, period)

  },[ endDate])

  useEffect(()=>{
    //валидация всей формы
    
    if(resultStartDate&&resultEndDate){
      dispatch({type:VALID_FORM, validFormData: resultStartDate<resultEndDate})
      return
    } 
    
    dispatch({type:VALID_FORM, validFormData: false})
    
  },[resultStartDate, resultEndDate])

  const onChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    
    //изменение значения input
    switch (name){
      case 'startDate':        
        dispatch({type: CHANGE_START_DATE, startDate: {value:value, year: year}})         
        break;
      case 'endDate':
        dispatch({type: CHANGE_END_DATE, endDate: {value:value, year: year}}) 
        break;
    }
  
  }
  const onBlur = e => {
  
  }


  const myOnFocus = (e) =>{
    console.log(e.target.name)
    dispatch({type: SET_INPUT_FOCUS, inputFocus: e.target.name})
    return onFocus();
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