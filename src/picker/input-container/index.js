import React, {useEffect, useRef} from 'react'
import Input, { ArrowIcon } from '../input/input'
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
import {inputValueValidation} from  '../../utils/converters'
const [
  DAY,
  WEEK,
  MONTH,
  QUARTER,
  HALFYEAR,
  YEAR
] = steps

export default function InputContainer(){
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
	
	useEffect(()=>{
		if(!needInputValidation){return}
		let result = {}
    
    let datesUpdateFieldCopy = {value: dates[inputFocus].inputValue, year: dates[inputFocus].year}

    const {verdict, newDate} = inputValueValidation(inputFocus, datesUpdateFieldCopy, period)

    const newDatesField = Object.assign({}, dates[inputFocus], {result: newDate, isCorrect:verdict})
    result = Object.assign({}, dates, {[inputFocus]:newDatesField})
		//console.log(result)

		dispatch({type: UPDATE_DATES, dates: result})
    dispatch({type: SET_INPUT_VALIDATION, needInputValidation: false})
    dispatch({type: SET_FORM_VALIDATION, needFormValidation: true})

    //console.log(dates)
  },[needInputValidation])

	useEffect(()=>{
    //валидация всей формы
    if(!needFormValidation){return}

    if(dates.startDate.result && dates.endDate.result){
      dispatch({type:VALID_FORM, validFormData: dates.startDate.result<dates.endDate.result})
    } else{
      dispatch({type: VALID_FORM, validFormData: false})
    }    
    dispatch({type: SET_FOCUS_TRANSFER, needChangeFocus:true})
    dispatch({type: SET_FORM_VALIDATION, needFormValidation: false})

    //console.log('DISPATCH needFormValidation')
  },[needFormValidation])

	useEffect(()=>{
    if(!needChangeFocus){return}
    const{startDate, endDate} = dates
    //console.log(startDate)
    const nextFocus = nextFocusSetter(startDate.inputValue,
      startDate.invalidValue,
      endDate.inputValue,
      endDate.invalidValue)
    //console.log('nextFocus',nextFocus)
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

	return(
		<>
			<Input id={START_DATE} placeholder="Начало" />
			<ArrowIcon />
			<Input id={END_DATE} placeholder="Конец" />
		</>
	)
}
