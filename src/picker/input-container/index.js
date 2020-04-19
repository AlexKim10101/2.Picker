import React, {useEffect, useRef} from 'react'
import Input, { ArrowIcon } from '../input/input'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'

import {
  steps,  
  VALID_FORM,
  SET_INPUT_FOCUS,
  START_DATE,
  END_DATE,
  SUBMIT,
  SET_FOCUS_TRANSFER,
  SET_INPUT_VALIDATION,
  SET_FORM_VALIDATION,
  UPDATE_DATES
} from '../../utils/consts'
import {inputValueValidation} from  '../../utils/converters'


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
    if(!needInputValidation) return
    if(inputFocus==='submit') return
    let result = {}
    console.log('Валидация даты', inputFocus)
    
    let datesUpdateFieldCopy = {value: dates[inputFocus].inputValue, year: dates[inputFocus].year}

    const {verdict, newDate} = inputValueValidation(inputFocus, datesUpdateFieldCopy, period)

    const newDatesField = Object.assign({}, dates[inputFocus], {result: newDate, isCorrect:verdict})
    result = Object.assign({}, dates, {[inputFocus]:newDatesField})
		//console.log(result)

		dispatch({type: UPDATE_DATES, dates: result})
    dispatch({type: SET_INPUT_VALIDATION, needInputValidation: false})
    dispatch({type: SET_FORM_VALIDATION, needFormValidation: true})
    console.log('Валидация значения INPUT', inputFocus)
    //console.log(dates)
  },[needInputValidation])

	useEffect(()=>{
    //валидация всей формы
    if(!needFormValidation){return}

    let formIsValid = false;

    if(dates.startDate.result && dates.endDate.result && dates.startDate.result<dates.endDate.result){
      formIsValid = true
    }

    if(dates.startDate.result && dates.endDate.result){
      dispatch({type:VALID_FORM, validFormData: dates.startDate.result<dates.endDate.result})
    } else{
      dispatch({type: VALID_FORM, validFormData: false})
    }    
    dispatch({type: SET_FOCUS_TRANSFER, needChangeFocus:true})
    dispatch({type: SET_FORM_VALIDATION, needFormValidation: false})

    console.log('Валидация формы. Вердикт', formIsValid)
    console.log('Валидация формы. Подробнее', dates)

  },[needFormValidation])

	useEffect(()=>{
    if(!needChangeFocus){return}
    const{startDate, endDate} = dates
    //console.log(startDate)
    const nextFocus = nextFocusSetter(startDate.inputValue,
      startDate.isCorrect,
      endDate.inputValue,
      endDate.isCorrect)
    //console.log('nextFocus',nextFocus)
    dispatch({type: SET_INPUT_FOCUS, inputFocus: nextFocus})
    dispatch({type: SET_FOCUS_TRANSFER, needChangeFocus: false})
    console.log('Установка фокуса', nextFocus)
	},[needChangeFocus, validFormData])
	
	function nextFocusSetter(startDateInputValue, startDateStatus, endDateInputValue, endDateStatus){    
    console.log('NextFocusArgs', arguments)
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
