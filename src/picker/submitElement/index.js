import React from 'react'
import { usePickerState } from '../dates-picker-context'


export default function SubmitElement(){

  const { validFormData } = usePickerState();

  

  return(
    <div>

      {!validFormData && (<div>Некорректные данные</div>)}

      <input type="submit" value="Отправить" disabled={!validFormData}></input>


    </div>
  )
   
}