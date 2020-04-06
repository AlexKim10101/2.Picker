import React from 'react'
import { usePickerState } from '../dates-picker-context'
import './submitElement.css'

export default function SubmitElement(){

  const { validFormData,resultStartDate,resultEndDate } = usePickerState();
  function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear() ;

    return dd + '.' + mm + '.' + yy;
  }
  const firstDate = resultStartDate ? formatDate(resultStartDate) : null
  const secondDate = resultEndDate ? formatDate(resultEndDate) : null

  return(
    <div className="submitElement">
      
      {!validFormData && (<div>Некорректные данные</div>)}
  
      {validFormData && (<div>Выбран период с {firstDate} по {secondDate}</div>)}
      

      <input type="submit" value="Отправить" disabled={!validFormData}></input>


    </div>
  )
   
}