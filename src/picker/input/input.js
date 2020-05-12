import React, { useState, useEffect, useRef} from 'react'
import InputMask from 'react-input-mask';
import classnames from 'classnames'
import {  
  START_DATE,
  END_DATE,
  steps
} from '../../utils/consts'
import { maskQualifier } from '../../utils/converters'

import './input.css'

export default function Input({
  data, 
  focusLocation, 
  period, 
  placeholder, 
  changeFocusLocation, 
  setInputResult
}){

  const [
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    HALFYEAR,
    YEAR
  ] = steps
  
  //const [value, setValue] = useState(data.inputValue)


  const rejected = (focusLocation !== data.name && !data.result && data.inputValue)  
  const clsx = classnames('input-field', { active: data.name === focusLocation, rejected: rejected})
  const inputEl = useRef(null)
  const mask = maskQualifier(data.name, data.inputValue, focusLocation, period)

  const myOnBlur = (e) =>{
    //console.log('onBlur')
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
      //console.log('клик по календарю')  
      return
    }
    //console.log('клик не по календарю')    
    //сделать красиво
    if((!e.relatedTarget)||(e.relatedTarget.id===START_DATE)||(e.relatedTarget.id===END_DATE)){
      changeFocusLocation('Not on input')
      return
    }
  }

  function handleKeyPress(e){
    if(e.key==="Enter"){      
      console.log('enter')
      if(focusLocation===START_DATE){changeFocusLocation(END_DATE)}
      if(focusLocation===END_DATE){changeFocusLocation(START_DATE)}
    }
  }

  useEffect(() => {
    if(!inputEl)return
    if (inputEl.current.id === focusLocation) {
      inputEl.current.focus()
    }
  }, [focusLocation])

  placeholder = (period === DAY||period === WEEK) ? 'дд.мм.гггг' : placeholder

  return (
    <div className="input-wrapper">      
      
      <InputMask  
        inputRef={(node)=>inputEl.current=node}
        value={data.inputHoverValue} 
        mask={mask}			  
        alwaysShowMask={true}	
		    onChange={({target})=>setInputResult(target.id, target.value)  }
	      onKeyPress={handleKeyPress}		  
        placeholder={placeholder}
        onFocus={({target})=>changeFocusLocation(target.id)}
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