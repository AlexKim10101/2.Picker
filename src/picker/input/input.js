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
    validFormData, 
    period,
    year,
    resultStartDate,
    resultEndDate
  } = usePickerState()
  const dispatch = usePickerDispatch()
  const value = id === 'startDate' ? startDate : endDate

  function inputValueValidation(fieldName, value, year, period){
    let typeName;
    const monthStartModificator = 0;
    const monthEndModificator = 1;
    let monthModificator

    const monthStartDateModificator = 0;
    const monthEndDateModificator = 3600 * 24 * 1000;

    let monthDateModificator
    const startQurtArr = ['01.01.', '01.04.', '01.07.','01.10.'];
    const endQurtArr = ['31.03.', '30.06.', '30.09.','31.12.'];
    let qurtArr
    const halfYearStartArr = ['01.01.', '01.07.'];
    const halfYearEndArr = ['30.06.','31.12.'];
    let halfYearArr
    const yearStartPreDate = '01.01.';
    const yearEndPreDate = '31.12.'
    let yearPreDate;

    let result

    if(fieldName=='resultStartDate'){
      typeName = SET_RESULT_START_DATE;
      monthModificator = monthStartModificator
      monthDateModificator = monthStartDateModificator
      qurtArr = startQurtArr;
      halfYearArr = halfYearStartArr;      
      yearPreDate = yearStartPreDate;

    }

    if(fieldName=='resultEndDate'){
      typeName = SET_RESULT_END_DATE;
      monthModificator = monthEndModificator;
      monthDateModificator = monthEndDateModificator;
      qurtArr = endQurtArr;
      halfYearArr = halfYearEndArr;
      yearPreDate = yearEndPreDate;
    }



    switch(period){
      case DAY :{        
        if(dateValidation(value)){
          dispatch({type: typeName, [fieldName]: dateCreater(value)})
        }
       
        break;
      }
      case MONTH :{
        if(months.includes(value)){          
          dispatch({type: typeName, [fieldName]:new Date( new Date(year, months.indexOf(value)+monthModificator, 1) - monthDateModificator)})
        }       

        if(monthsFull.includes(value)){          
          dispatch({type: typeName, [fieldName]: new Date( new Date(year, monthsFull.indexOf(value)+monthModificator, 1) - monthDateModificator)})
        }
        
        break;
      }
      case QUARTER :{
        if(quarters.includes(value)){
          
          const qurtIndex = quarters.indexOf(value)
          const blank = qurtArr[qurtIndex] + year;
          dispatch({type: typeName, [fieldName]: dateCreater(blank)})
        }
            
        break;
      }

      case HALFYEAR :{
        if(halfYear.includes(value)){
          const halfYearIndex = halfYear.indexOf(value)
          const blank = halfYearArr[halfYearIndex] + year;
          dispatch({type: typeName, [fieldName]: dateCreater(blank)})
        }             
        break;
      }

      case YEAR:{
        if(dateValidation(yearPreDate + value)){
          dispatch({type: typeName, [fieldName]: dateCreater(yearPreDate + value)})
        }
      }
    }
    
  }

  useEffect(()=>{
    //валидация значения input startDate
    inputValueValidation('resultStartDate', startDate, year, period)
    
  },[startDate])


  useEffect(()=>{
    //валидация значения input endDate
    inputValueValidation('resultEndDate', endDate, year, period)

  },[ endDate])

  useEffect(()=>{
    //валидация всей формы
    //console.log(resultStartDate)
    //console.log(resultEndDate)
    if(resultStartDate&&resultEndDate){
      dispatch({type:VALID_FORM, validFormData: resultStartDate<resultEndDate})
    } else{
      dispatch({type:VALID_FORM, validFormData: false})
    }
  },[resultStartDate, resultEndDate])

  const onChange = ({ target }) => {
    const name = target.name;
    const value = target.value;
    
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