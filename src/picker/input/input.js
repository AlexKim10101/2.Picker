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
    console.log('событие ONBLUR target:', e.target)
    console.log('событие ONBLUR relatedTarget', e.relatedTarget)
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
      return
    }
    if(e.target.value == '') return

    dispatch({type: SET_INPUT_VALIDATION, needInputValidation: true})
    
  }

  
  const onChange = ({ target }) => {
    console.log('onChange')
    const name = target.name;
    const value = target.value;
    const newValue = Object.assign({}, dates[name], {inputValue: value, year: year})
    const result = Object.assign({}, dates, {[name]:newValue})
    dispatch({type:UPDATE_DATES, dates: result})
  
  }
  


  const myOnFocus = ({ target }) =>{
    dispatch({type: SET_INPUT_FOCUS, inputFocus: target.id})  
    console.log("SETFOCUS",target.id)  
  }

  const rejected = !dates[id].isCorrect && id !== inputFocus && dates[id].inputValue!=='' ;
  const clsx = classnames('input-field', { active: id === inputFocus }, {rejected: rejected})


/////////////////////////////

  const myRef = useRef(null);


  //установка фокуса
  useEffect(() => {
    console.log(myRef)
    if(!myRef)return
    if (myRef.current.id === inputFocus) {
      console.log('asdasda')
      myRef.current.focus()
    }
  }, [inputFocus])

  function handleKeyPress(e){

    if(e.key==="Enter"){      
      //console.log('enter')
      
        myRef.current.blur()
      
    }
  }
////////////////

  

  let mask = ((period===DAY) || (period ===WEEK))? "99.99.9999":''

  return (
    <div className="input-wrapper">      
      
      <InputMask  
        value={dates[id].inputValue}      
        mask={mask}			  	
		    onChange={(e)=>onChange(e)}
	      onKeyPress={handleKeyPress}		  
        placeholder={placeholder}
        onFocus={myOnFocus}
        onBlur={myOnBlur}
        autoComplete="off"        
        id={id}
        name={id}
        className={clsx}
	    >
        {inputProps => <input ref={myRef}  {...inputProps}/>}
      
      </InputMask>

      {/* <input
        ref={inputEl}
        id={id}
        name={id}
        className={clsx}
        autoComplete="off"
        placeholder={placeholder}
        onFocus={myOnFocus}
        onBlur={myOnBlur}
        value={dates[id].inputValue}
        onChange={onChange}
        onKeyPress={handleKeyPress}
      /> */}

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