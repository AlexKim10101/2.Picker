import React, {useEffect, useRef} from 'react'
import './submitElement.css'
import { START_DATE, END_DATE } from '../../utils/consts';

export default function SubmitElement({id, focusLocation, validFormData, startDate, endDate}){

  

  function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear() ;

    return dd + '.' + mm + '.' + yy;
  }
  const firstDate = startDate ? formatDate(startDate) : null
  const secondDate = endDate ? formatDate(endDate) : null
  
  const submitEl = useRef(null)

  useEffect(() => {
    if (submitEl.current.id === focusLocation) {
      submitEl.current.focus()
    }
  }, [focusLocation,validFormData])
  
  // console.log(dates)
  // console.log('----------------------------')

  // console.log('dates.endDate.inputValue', dates.endDate.inputValue==='')
  // console.log('----------------------------')
  
  //const showErrorMessageStartDate = ((dates.startDate.inputValue==='')||(inputFocus===START_DATE)||(dates.startDate.isCorrect))? false : true;
  //const showErrorMessageEndDate = ((dates.endDate.inputValue==='')||(inputFocus===END_DATE)||(dates.endDate.isCorrect))? false : true;
 
  //const showErrorMessageEndLessStart = dates.startDate.isCorrect&&dates.endDate.isCorrect&&!validFormData
  // console.log('showErrorMessageStartDate',showErrorMessageStartDate)
  // console.log('showErrorMessageEndDate',showErrorMessageEndDate)
  
  return(
    <div className="submitElement">
      
      {/* {!validFormData && (<div>Некорректные данные</div>)} */}
      {/* {showErrorMessageStartDate && (<div>{dates.startDate.errorMessage}</div>)}
      {showErrorMessageEndDate && (<div>{dates.endDate.errorMessage}</div>)}
      {showErrorMessageEndLessStart && (<div>Ошибка: первая дата больше второй</div>)} */}
      {validFormData && (<div>Данные корректны</div>)}
      {(!validFormData&&(startDate||endDate)) && (<div>Данные некорректны</div>)}
      {(startDate&&endDate) && (<div>Выбран период с {firstDate} по {secondDate}</div>)}
      
      

      <input ref={submitEl} id={id} type="submit" value="Отправить" disabled={!validFormData}></input>


    </div>
  )
   
}