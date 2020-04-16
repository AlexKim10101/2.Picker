import React, {useEffect, useRef} from 'react'
import { usePickerState } from '../dates-picker-context'
import './submitElement.css'

export default function SubmitElement({id}){

  const { 
    validFormData, 
    resultStartDate, 
    resultEndDate, 
    inputFocus, 
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

  return(
    <div className="submitElement">
      
      {!validFormData && (<div>Некорректные данные</div>)}
  
      {validFormData && (<div>Выбран период с {firstDate} по {secondDate}</div>)}
      

      <input ref={submitEl} id={id} type="submit" value="Отправить" disabled={!validFormData}></input>


    </div>
  )
   
}