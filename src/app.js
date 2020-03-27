import React from 'react'
import DatesPicker from './picker/dates-picker'


export default function App() {
  const d = new Date()
  
  const fakeMonth = d.getMonth()
  const fakeYear = d.getFullYear()
  const fakeStep = 'month'
  const fakePeriod = 'month'
  const fakeCalendarType = 'month'

  return (
    <DatesPicker
      year={fakeYear}
      month={fakeMonth}
      step={fakeStep}
      period={fakePeriod}
      calendarType={fakeCalendarType}
    />
  )
}
