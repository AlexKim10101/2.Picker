import React, {useState, useEffect, useRef} from 'react'
import InputMask from 'react-input-mask';
import classnames from 'classnames'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import {  
  SET_INPUT_FOCUS,  
  SET_INPUT_VALIDATION,
  UPDATE_DATES,
  steps
} from '../../utils/consts'
import { inputValueCreater, inputValueValidation, maskQualifier } from '../../utils/converters'

import './input.css'

export default function Input({ id, placeholder }){
  const {    
    year,
    inputFocus,    
    dates,
    period
  } = usePickerState()
  const dispatch = usePickerDispatch()
  const [
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    HALFYEAR,
    YEAR
  ] = steps
  
  const myOnBlur = (e) =>{
    //console.log('событие ONBLUR target:', e.target)
    //console.log('событие ONBLUR relatedTarget', e.relatedTarget)
    //console.log('событие ONBLUR', e.relatedTarget.value)

    let value = e.target.id;
    let name = value
    //console.log('test',e.relatedTarget)
    const clickOnDatePicker = ({relatedTarget})=>{
      if (relatedTarget === undefined) return false
      if (relatedTarget === null) return false;
      let node = relatedTarget.parentNode;
      while (node !== null) {
        if (node.id === 'datepicker') return true;
        node = node.parentNode;
      }
      return false
    }
    if (clickOnDatePicker(e)){    
      console.log('клик по календарю')  
      return
    }
    if(e.target.value == '') return

    dispatch({type: SET_INPUT_VALIDATION, needInputValidation: true})
    
  }

  
  const onChange = ({ target }) => {
    console.log('onChange')
    console.log('value', dates[id].inputValue)

    const value = target.value;
    const newDates = inputValueCreater(dates, inputFocus, {inputValue: value, year: year})
    dispatch({type:UPDATE_DATES, dates: newDates})
  
  }
  



  const myOnFocus = ({ target }) =>{
    console.log('фокус на Input', target.id)
    dispatch({type: SET_INPUT_FOCUS, inputFocus: target.id})  
    //console.log("SETFOCUS",target.id)  
  }

  const rejected = !dates[id].isCorrect && id !== inputFocus && dates[id].inputValue!=='' ;
  const clsx = classnames('input-field', { active: id === inputFocus }, {rejected: rejected})


  const inputEl = useRef(null)

  //ставит фокус при изменении значения inputFocus
  useEffect(() => {
    if(!inputEl)return
    if (inputEl.current.id === inputFocus) {
      inputEl.current.focus()
      //console.log(period)
      const newDates = inputValueCreater(dates, inputFocus, {period: period})
      dispatch({type:UPDATE_DATES, dates: newDates})

    }
  }, [inputFocus])

  function handleKeyPress(e){

    if(e.key==="Enter"){      
      console.log(inputEl)
      inputEl.current.blur()
    }
  }
  
  // console.log('------------------------------')
  // console.log('dates[id].inputValue',dates[id].inputValue)
  // console.log('------------------------------')


  //исправляет баг при смене периода и пустом значении input
  useEffect(()=>{
    if(dates[id].inputValue==='__.__.____'){
      const newDates = inputValueCreater(dates, id, {inputValue: ''})
      dispatch({type:UPDATE_DATES, dates: newDates})
    }
  },[period])
  

  const mask = maskQualifier(dates, id, inputFocus)

  useEffect(()=>{
    console.log(`новое значение ${id}: ${dates[id].inputValue} `)
    const needOnBlur = inputValueValidation(id, {value:dates[id].inputValue, year:dates[id].year}, dates[id].period).verdict
    console.log(inputValueValidation(id, {value:dates[id].inputValue, year:dates[id].year}, dates[id].period))
    if(needOnBlur){
      inputEl.current.blur()
    }
  },[dates[id].inputValue])


  return (
    <div className="input-wrapper">      
      
      <InputMask  
        inputRef={(node)=>inputEl.current=node}
        value={dates[id].inputValue} 
        mask={mask}			  
        alwaysShowMask={true}	
		    onChange={(e)=>onChange(e)}
	      onKeyPress={handleKeyPress}		  
        placeholder={placeholder}
        onFocus={myOnFocus}
        onBlur={myOnBlur}
        autoComplete="off"        
        id={id}
        name={id}
        className={clsx}
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