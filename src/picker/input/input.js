import React, {useState, useEffect, useRef} from 'react'
import InputMask from 'react-input-mask';
import classnames from 'classnames'
import {  
  SET_INPUT_FOCUS,  
  SET_INPUT_VALIDATION,
  UPDATE_DATES,
  steps
} from '../../utils/consts'
import { inputValueCreater, inputValueValidation, maskQualifier } from '../../utils/converters'

import './input.css'

export default function Input(props){
  
  const {
    data, 
    focusLocation, 
    period, 
    placeholder, 
    changeFocusLocation, 
    changeInputValue,
  } = props

  const myOnBlur = (e) =>{
    //console.log('событие ONBLUR target:', e.target)
    //console.log('событие ONBLUR relatedTarget', e.relatedTarget)
    //console.log('событие ONBLUR', e.relatedTarget.value)
    console.log('onBlur')

    let value = e.target.id;
    //let name = value
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
    //if(e.target.value == '') return
    console.log('клик не по календарю')
    console.log('e.relatedTarget', e.relatedTarget.id)

  }

  const onChange = ({ target }) => {
    //console.log('onChange')
    changeInputValue(target.id, target.value)
    //что происходит при onChange
  
  }
  
  const myOnFocus = ({ target }) =>{
    console.log('фокус на Input', target.id)
    changeFocusLocation(target.id)
  }

  //const rejected = !dates[id].isCorrect && id !== inputFocus && dates[id].inputValue!=='' ;
  const rejected = false;
  const clsx = classnames('input-field', { active: data.name === focusLocation })


  const inputEl = useRef(null)

  //ставит фокус при изменении значения inputFocus
  useEffect(() => {
    if(!inputEl)return
    if (inputEl.current.id === focusLocation) {
      inputEl.current.focus()
    }
  }, [focusLocation])

  function handleKeyPress(e){

    if(e.key==="Enter"){      
      console.log('enter')
      //inputEl.current.blur()
      //inputsValidation()
    }
  }
  


  const mask = maskQualifier(data.name, data.inputValue, focusLocation, period)

  useEffect(()=>{
    
  },[data.inputValue])


  return (
    <div className="input-wrapper">      
      
      <InputMask  
        inputRef={(node)=>inputEl.current=node}
        value={data.inputValue} 
        mask={mask}			  
        alwaysShowMask={true}	
		    onChange={(e)=>onChange(e)}
	      onKeyPress={handleKeyPress}		  
        placeholder={placeholder}
        onFocus={myOnFocus}
        onBlur={myOnBlur}
        autoComplete="off"        
        id={data.name}
        name={data.name}
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