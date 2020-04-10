import React, {useEffect, useRef} from 'react'
import { usePickerState } from '../dates-picker-context'
import './submitElement.css'

export default function SubmitElement({id, focused, onFocus}){

  const { validFormData,resultStartDate,resultEndDate,startDate,endDate } = usePickerState();
  function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear() ;

    return dd + '.' + mm + '.' + yy;
  }
  //console.log('resultStartDate', resultStartDate)
  const firstDate = resultStartDate ? formatDate(resultStartDate) : null
  const secondDate = resultEndDate ? formatDate(resultEndDate) : null
  
  //установка фокуса
  const submitEl = useRef(null)
  useEffect(() => {
    if (submitEl.current.id === focused) {
      console.log('sda')
      submitEl.current.focus()
    }
  }, [focused, validFormData])

  function needFocusOnThisElem(){
    let needFocusElemId = 'startDate'
    if(startDate.value){
      needFocusElemId = 'endDate'
    }
    if(startDate.value&&endDate.value){
      needFocusElemId = 'submit'
    }
    return needFocusElemId===id
  }
  useEffect(() => {
    if(!focused && needFocusOnThisElem()){
      console.log('ghbt')
      onFocus()
    }
  }, [focused])

  return(
    <div className="submitElement">
      
      {!validFormData && (<div>Некорректные данные</div>)}
  
      {validFormData && (<div>Выбран период с {firstDate} по {secondDate}</div>)}
      

      <input ref={submitEl} id={id} onFocus={onFocus} type="submit" value="Отправить" disabled={!validFormData}></input>


    </div>
  )
   
}