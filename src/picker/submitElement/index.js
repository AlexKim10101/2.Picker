import React, {useEffect, useRef} from 'react'
import { usePickerState } from '../dates-picker-context'
import './submitElement.css'
import { START_DATE, END_DATE } from '../../utils/consts';

export default function SubmitElement({id}){

  const { 
    validFormData, 
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
  
  // console.log(dates)
  // console.log('----------------------------')

  // console.log('dates.endDate.inputValue', dates.endDate.inputValue==='')
  // console.log('----------------------------')
  
  const showErrorMessageStartDate = ((dates.startDate.inputValue==='')||(inputFocus===START_DATE)||(dates.startDate.isCorrect))? false : true;
  const showErrorMessageEndDate = ((dates.endDate.inputValue==='')||(inputFocus===END_DATE)||(dates.endDate.isCorrect))? false : true;
 
  const showErrorMessageEndLessStart = dates.startDate.isCorrect&&dates.endDate.isCorrect&&!validFormData
  // console.log('showErrorMessageStartDate',showErrorMessageStartDate)
  // console.log('showErrorMessageEndDate',showErrorMessageEndDate)

  return(
    <div className="submitElement">
      
      {/* {!validFormData && (<div>Некорректные данные</div>)} */}
      {showErrorMessageStartDate && (<div>{dates.startDate.errorMessage}</div>)}
      {showErrorMessageEndDate && (<div>{dates.endDate.errorMessage}</div>)}
      {showErrorMessageEndLessStart && (<div>Ошибка: первая дата больше второй</div>)}
      {validFormData && (<div>Данные корректны</div>)}
      {(dates.startDate.isCorrect&&dates.endDate.isCorrect) && (<div>Выбран период с {firstDate} по {secondDate}</div>)}
      
      

      <input ref={submitEl} id={id} type="submit" value="Отправить" disabled={!validFormData}></input>


    </div>
  )
   
}