import React from 'react'
import DatesPicker from './picker/dates-picker'


export default function App() {
  const d = new Date()
  
  const fakeMonth = d.getMonth()
  const fakeYear = d.getFullYear()
  const fakeStep = 'month'
  const fakePeriod = 'month'
  const fakeCalendarType = 'month'

  const startDate = ''
  const endDate = ''
  const resultStartDate = null;
  const resultEndDate = null;
  const startDateIsCorrect = false
  const endDateIsCorrect = false
  const validFormData = false
  const inputFocus = null;

  // function dateFormater(date){
  //   return date.getUTCDate() + 
  //   '.' + ((date.getUTCMonth()+1) > 9 ? (date.getUTCMonth()+1): '0' + (date.getUTCMonth()+1)) + 
  //   '.' + date.getUTCFullYear();
  // }
  return (
    <DatesPicker
      year={fakeYear}
      month={fakeMonth}
      step={fakeStep}
      period={fakePeriod}
      calendarType={fakeCalendarType}
      startDate={startDate}
      endDate={endDate}
      resultStartDate={resultStartDate}
      resultEndDate={resultEndDate}
      startDateIsCorrect={startDateIsCorrect}
      endDateIsCorrect={endDateIsCorrect}
      validFormData={validFormData}
      inputFocus={inputFocus}
    />
  )
}
