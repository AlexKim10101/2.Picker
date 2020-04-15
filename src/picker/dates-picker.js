import React from 'react'
import { PickerProvider } from './dates-picker-context'
import Select from './select/select'
import './dates-picker.css'
import SubmitElement from './submitElement';
import CalendarContainer from './calendar-container'
import InputContainer from './input-container'
import {
  START_DATE,
  END_DATE,
  SUBMIT,
} from '../utils/consts'
export default function DatesPicker(props) {
  
  let newProps = {
    startDate : {value: '', year: null},
    endDate : {value: '', year: null},
    invalidStartDate: false,
    invalidEndDate: false,
    resultStartDate: null,
    resultEndDate: null,  
    validFormData: false,
    inputFocus: START_DATE,
    needChangeFocus: false,
    needInputValidation: false,
    needFormValidation: false,
    dates:{
      [START_DATE]:{
        name: START_DATE,
        inputValue: '',
        year: null,
        result: null,
        isCorrect: false,
      },
      [END_DATE]:{
        name: END_DATE,
        inputValue: '',
        year: null,
        result: null,
        isCorrect: false,
      }
    }
  }

  let expProps = Object.assign({}, props, newProps)

  return (
    <PickerProvider initialData={expProps}>
      <div className="dates-picker-wrapper">
        <Select />
        
        <div>
          <InputContainer/>
          <CalendarContainer/>
        </div>

      </div>
      <SubmitElement
        id={SUBMIT}
        
      />
      


  
    </PickerProvider>
  )
}
