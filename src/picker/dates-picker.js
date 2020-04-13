import React from 'react'
import { PickerProvider } from './dates-picker-context'
import Select from './select/select'
import Input, { ArrowIcon } from './input/input'
import './dates-picker.css'
import SubmitElement from './submitElement';
import CalendarContainer from './calendar-container'
import {
  START_DATE,
  END_DATE,
  SUBMIT,
} from '../utils/consts'
export default function DatesPicker(props) {
  //const [focused, setFocused] = useState(undefined) 

  // console.log(focused)

  // const onBlur = e => {
  //   //console.log('onBlur!!')
  //   const focusInCurrentTarget = ({ relatedTarget, currentTarget }) => {
  //     if (relatedTarget === null) return false;
  //     let node = relatedTarget.parentNode;
  //     while (node !== null) {
  //       if (node === currentTarget) return true;
  //       node = node.parentNode;
  //     }
  //     return false;
  //   }

  //   !focusInCurrentTarget(e) && setFocused(undefined)

  // }
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
        invalidValue: false,
      },
      [END_DATE]:{
        name: END_DATE,
        inputValue: '',
        year: null,
        result: null,
        invalidValue: false,
      }
    }
  }

  let expProps = Object.assign({},props,newProps)

  

  return (
    <PickerProvider initialData={expProps}>
      {/* <div className="dates-picker-wrapper" onBlur={onBlur}> */}
      <div className="dates-picker-wrapper">
        <Select />
        
        <div>
          <Input 
            id={START_DATE}
            placeholder="Начало" 
            // onFocus={() => setFocused(START_DATE)} 
            //focused={focused} 
            //keyPress= {() => setFocused(undefined)}      
          />
          <ArrowIcon />

          {/* {focused == START_DATE && (
            <div aria-roledescription="datepicker" >
              <Calendar 
                
                focused={focused}
                setFocus={setFocused}/>
              <PeriodSideBar />
            </div>
          )} */}

          <Input 
            id={END_DATE} янв
            placeholder="Конец" 
            // onFocus={() => setFocused(END_DATE)} 
            // focused={focused}  
            // keyPress= {() => setFocused(undefined)}           
          />



          {/* {focused == END_DATE   && (
            <div aria-roledescription="datepicker" >
              <Calendar 
                
                focused={focused}
                setFocus={setFocused}/>
              <PeriodSideBar />
            </div>
          )} */}
          
          <CalendarContainer/>

        </div>

      </div>
      <SubmitElement
        id={SUBMIT}
        // focused={focused}
        // onFocus={() => setFocused(SUBMIT)}
      />
      


  
    </PickerProvider>
  )
}
