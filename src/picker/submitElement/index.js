import React, {useEffect, useRef} from 'react'
import { usePickerState } from '../dates-picker-context'
import './submitElement.css'
import { START_DATE, END_DATE } from '../../utils/consts';

export default function SubmitElement({id}){

  const { 
    validFormData, 
    inputFocus,
    needChangeFocus,
    needInputValidation,
    needFormValidation, 
    dates 
  } = usePickerState();

  function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear() ;

    return dd + '.' + mm + '.' + yy;
  }
  const firstDate = dates.startDate.result ? formatDate(dates.startDate.result) : null
  const secondDate = dates.endDate.result ? formatDate(dates.endDate.result) : null
  
  const submitEl = useRef(null)

  useEffect(() => {
    if (submitEl.current.id === inputFocus) {
      submitEl.current.focus()
    }
  }, [inputFocus,validFormData])
  // console.log('inputFocus',inputFocus)
  // console.log('needChangeFocus', needChangeFocus)
  // console.log('needInputValidation',needInputValidation)
  // console.log('needFormValidation', needFormValidation)
  console.log(dates)
  console.log('----------------------------')

  console.log('dates.endDate.inputValue', dates.endDate.inputValue==='')
  console.log('----------------------------')
  
  const showErrorMessageStartDate = ((dates.startDate.inputValue==='')||(dates.startDate.isCorrect))? false : true;
  const showErrorMessageEndDate = ((dates.endDate.inputValue==='')||(dates.endDate.isCorrect))? false : true;
  // console.log('dates.startDate.inputValue',dates.startDate.inputValue==='')
  // console.log('showErrorMessageStartDate',showErrorMessageStartDate)
  // console.log('showErrorMessageStartDate',showErrorMessageStartDate)
  // console.log('showErrorMessageStartDate',showErrorMessageStartDate)
  
  console.log('showErrorMessageStartDate',showErrorMessageStartDate)
  console.log('showErrorMessageEndDate',showErrorMessageEndDate)

  return(
    <div className="submitElement">
      
      {/* {!validFormData && (<div>Некорректные данные</div>)} */}
      {showErrorMessageStartDate && (<div>{dates.startDate.errorMessage}</div>)}
      {showErrorMessageEndDate && (<div>{dates.endDate.errorMessage}</div>)}

      {validFormData && (<div>Выбран период с {firstDate} по {secondDate}</div>)}
      

      <input ref={submitEl} id={id} type="submit" value="Отправить" disabled={!validFormData}></input>


    </div>
  )
   
}