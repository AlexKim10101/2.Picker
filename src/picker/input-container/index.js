import React, { useEffect } from 'react'
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
import {inputValueValidation, inputValueCreater} from  '../../utils/converters'


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
  
  
  function updaterField(fieldName, ){

  }


	useEffect(()=>{
    if(!needInputValidation) return
    console.log('useeffect Валидация даты', inputFocus)
    if(inputFocus==='submit') {
      dispatch({type: SET_INPUT_VALIDATION, needInputValidation: false})
      return
    }

    //let newDates = Object.assign({}, dates)

    let newObj={
      [START_DATE]:{},
      [END_DATE]:{}
    }
    newObj[START_DATE] = Object.assign({}, dates[START_DATE])
    newObj[END_DATE] = Object.assign({}, dates[END_DATE])

    console.log('Начальнле состояние', newObj)

    for (let inputFocus of [START_DATE, END_DATE] ){
      let errorMessage = null;
      let potencialTrueValue = false;
      let result
      let arrayApprovedPeriods = []
      let resultInputValidation = null
      //let newObj ={}

      const {verdict, newDate} = inputValueValidation(inputFocus, 
        dates[inputFocus].inputValue, 
        dates[inputFocus].year, 
        period);

      if (verdict){
        resultInputValidation = 'Check passed'

      }else{
        resultInputValidation = 'Wrong period'

      }
      
      //неверная дата для всех периодов
      for (let per of steps){
        result = inputValueValidation(inputFocus, 
          dates[inputFocus].inputValue, 
          dates[inputFocus].year, 
          per).verdict;
        if(result){
          arrayApprovedPeriods.push(per)
          potencialTrueValue = true
        }
      }
      if(!potencialTrueValue){
        resultInputValidation = 'Wrong Value'
      }
      //
      
      console.log('inputValidation', inputFocus)
      console.log('resultInputValidation', resultInputValidation)
      //let copyDates = Object.assign({}, newDates)



      //newObj[]


      switch(resultInputValidation){
        case 'Wrong Value':{
          newObj[inputFocus] = Object.assign({}, dates[inputFocus], {
            result: null, 
            dateIsCorrect: false,
            periodIsCorrect: true,
            isCorrect: false, 
            errorMessage:`Значение ${inputFocus} некорректно`
          })
          console.log('промежуточное состояние',newObj)
          // newDates = inputValueCreater(
          //   copyDates, 
          //   inputFocus, 
          //   {
          //     result: null, 
          //     dateIsCorrect: false,
          //     periodIsCorrect: true,
          //     isCorrect: false, 
          //     errorMessage:`Значение ${inputFocus} некорректно`
          //   }
          // )
          break;
        }
        case 'Wrong period':{
          newObj[inputFocus] = Object.assign({}, dates[inputFocus], {
            result: null, 
            dateIsCorrect: false,
            periodIsCorrect: false,
            isCorrect: false, 
            errorMessage:`Значение ${inputFocus} не соответствует выбранному периоду`            
          })
          console.log('промежуточное состояние',newObj)

          break;
          // newDates = inputValueCreater(
          //   copyDates, 
          //   inputFocus, 
          //   {
          //     result: null, 
          //     dateIsCorrect: false,
          //     periodIsCorrect: false,
          //     isCorrect: false, 
          //     errorMessage:`Значение ${inputFocus} не соответствует выбранному периоду`
          //   }
          // )
        }
        case 'Check passed':{
          newObj[inputFocus] = Object.assign({}, dates[inputFocus], {
            result: newDate, 
            dateIsCorrect: true,
            periodIsCorrect: true,
            isCorrect: true, 
            errorMessage: null
          })
          console.log('промежуточное состояние',newObj)
          
          break;
          // newDates = inputValueCreater(
          //   copyDates, 
          //   inputFocus, 
          //   {
          //     result: newDate, 
          //     dateIsCorrect: true,
          //     periodIsCorrect: true,
          //     isCorrect: true, 
          //     errorMessage: null
          //   }
          // )
        }
      }
      //console.log('новое значение', newDates)

    }

    console.log('конечное состояние ',newObj);

    const newDates = Object.assign({}, dates, newObj)

  
		dispatch({type: UPDATE_DATES, dates: newDates})
    dispatch({type: SET_INPUT_VALIDATION, needInputValidation: false})
    dispatch({type: SET_FORM_VALIDATION, needFormValidation: true})

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

  },[needFormValidation])

	useEffect(()=>{
    if(!needChangeFocus){return}
    const{startDate, endDate} = dates
    const nextFocus = nextFocusSetter(startDate.inputValue,
      startDate.isCorrect,
      endDate.inputValue,
      endDate.isCorrect)
    dispatch({type: SET_INPUT_FOCUS, inputFocus: nextFocus})
    dispatch({type: SET_FOCUS_TRANSFER, needChangeFocus: false})
	},[needChangeFocus, validFormData])
	
	function nextFocusSetter(startDateInputValue, startDateStatus, endDateInputValue, endDateStatus){    
    //console.log('NextFocusArgs', arguments)
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
