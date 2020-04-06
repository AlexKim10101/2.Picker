import React, { useState } from 'react'
import { PickerProvider } from './dates-picker-context'
import Select from './select/select'
import Input, { ArrowIcon } from './input/input'
import Calendar from './calendars/calendar'
import PeriodSideBar from './period-side-bar/period-side-bar'
import './dates-picker.css'
import SubmitElement from './submitElement';

export default function DatesPicker(props) {
  const [focused, setFocused] = useState(undefined) 

  // console.log(focused)

  const onBlur = e => {
    const focusInCurrentTarget = ({ relatedTarget, currentTarget }) => {
      if (relatedTarget === null) return false;
      let node = relatedTarget.parentNode;
      while (node !== null) {
        if (node === currentTarget) return true;
        node = node.parentNode;
      }
      return false;
    }

    !focusInCurrentTarget(e) && setFocused(undefined)

  }
  let newProps = {
    startDate : {value:'', year:null},
    endDate : {value:'', year:null},
    resultStartDate : null,
    resultEndDate : null,  
    validFormData : false,
    inputFocus : null,
  }

  let expProps = Object.assign({},props,newProps)
  return (
    <PickerProvider initialData={expProps}>
      <div className="dates-picker-wrapper" onBlur={onBlur}>
        <Select />
        
        <div>
          <Input 
            id="startDate" 
            placeholder="Начало" 
            onFocus={() => setFocused("startDate")} 
            focused={focused}             
          />
          <ArrowIcon />
          <Input 
            id="endDate" 
            placeholder="Конец" 
            onFocus={() => setFocused("endDate")} 
            focused={focused}             
          />

          {focused !== undefined && (
            <div aria-roledescription="datepicker">
              <Calendar />
              <PeriodSideBar />
            </div>
          )}
        </div>

      </div>
      <SubmitElement/>
      


  
    </PickerProvider>
  )
}
