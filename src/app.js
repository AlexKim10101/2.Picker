import React from 'react'
import DatesPicker from './picker/dates-picker'


export default function App() {
  const d = new Date()
  
  const fakeMonth = d.getMonth()
  const fakeYear = d.getFullYear()
  const fakeStep = 'month'
  const fakePeriod = 'month'
  const fakeCalendarType = 'month'

  const leftDate = ''
  const rightDate = ''
  const leftDateIsCorrect = false
  const rightDateIsCorrect = false
  const validFormData = false

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
      leftDate={leftDate}
      rightDate={rightDate}
      leftDateIsCorrect={leftDateIsCorrect}
      rightDateIsCorrect={rightDateIsCorrect}
      validFormData={validFormData}
    />
  )
}
