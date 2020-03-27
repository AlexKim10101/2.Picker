import React from 'react'
import classnames from 'classnames'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import {
  steps,
  stepsLabels,
  CHANGE_STEP,
  CHANGE_PERIOD,
  CHANGE_CALENDAR_TYPE,
  CHANGE_LEFT_DATE,
  CHANGE_RIGHT_DATE
} from '../../utils/consts'
import './input.css'


function dateCreater(string){
	let arrD = string.split(".");
  arrD[1] -= 1;
  return new Date(arrD[2], arrD[1], arrD[0]);
}

function dateValidation(value){
	let arrD = value.split(".");
  arrD[1] -= 1;
  let d = new Date(arrD[2], arrD[1], arrD[0]);
  if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
    return true;
  } else {    
    return false;
  }
}

function validateDates(firstData, secondData){
	if(!dateValidation(firstData)){
		console.log('incorrect start date')
	}
	if(!dateValidation(secondData)){
		console.log('incorrect end date')
	}

	if(dateCreater(firstData)<dateCreater(secondData)){
		console.log('all dates are correct')
	}else{
		console.log('error: start date > end date')

	}

}

export default function Input({
  id,
  placeholder,
  focused,
  onFocus,
}) {
	const { leftDate, rightDate } = usePickerState()
  const dispatch = usePickerDispatch()
  const value = id === 'startDate' ? leftDate : rightDate

  const onChange = ({ target }) => {

  	if(id === 'startDate'){
  		dispatch({ type: CHANGE_LEFT_DATE, leftDate: target.value })
  		
  	} 
  	if(id === 'endDate'){
  		dispatch({ type: CHANGE_RIGHT_DATE, rightDate: target.value })
  		
  	} 
  	
  }
  const onBlur = e => {
  	console.log('leftDate', leftDate)
  	console.log('rightDate', rightDate)
  	validateDates(leftDate, rightDate) 
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