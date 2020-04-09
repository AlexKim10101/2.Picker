import React from 'react'
import { usePickerState, usePickerDispatch} from '../dates-picker-context'
import HeadingMarkers from './heading-markers/heading-markers'
import { DaysWeeksRows, MonthsYearsRows } from './calendar-variants'
import {
  generateDays,
  generateMonths,
  generateQuarters,
  generateHalfYears,
  generateYears,
} from '../../utils/generate-intervals'
import { createSequence } from '../../utils/create-sequence'
import { 
  steps, 
  days,
  CHANGE_CALENDAR_TYPE,
  CHANGE_START_DATE,
  CHANGE_END_DATE, 
} from '../../utils/consts'
import './calendar.css'


const Calendar = ({ focused, setFocus }) => {
  const [
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    HALFYEAR,
    YEAR
  ] = steps

  const { period, calendarType, year, month, inputFocus } = usePickerState()

  const d = (...args) => new Date(...args)
  const firstDay = d(year, month).getUTCDay()
  // const y = d().getFullYear()
  
  const daysInMonth = (x) => 32 - d(year, month + x, 32).getDate()
  const daysInCurrMonth = daysInMonth(0)
  const daysInPrevMonth = daysInMonth(-1)
  // const daysInNextMonth = daysInMonth(1)
  
  const weeksAmount = Math.ceil((firstDay + daysInCurrMonth) / 7)
  const forepart = createSequence(daysInPrevMonth - firstDay + 1, daysInPrevMonth, 1)
  const yearStack = createSequence(year - 11, year, 1)

  const weeks = generateDays(firstDay, weeksAmount, daysInCurrMonth, forepart)
  const months = generateMonths
  const quarters = generateQuarters
  const halfyears = generateHalfYears
  const years = generateYears(yearStack)

  const withDaysAWeek = (calendarType === WEEK || calendarType === DAY)
  
  const height = withDaysAWeek ? weeks.length * 37 + 82 : (calendarType === MONTH || calendarType === YEAR) ? 256 : 194
  
  const dispatch = usePickerDispatch()

  const onDrill = (x) => {
    const idxInSteps = (x) => steps.indexOf(x)
    const drillDirection = () => {
      switch (calendarType) {
        case MONTH:
          return steps[idxInSteps(period)]
        case YEAR:
          return (period === HALFYEAR || period === QUARTER) ? period : MONTH
        default:
          return steps[idxInSteps(calendarType) - 1]
      }
    }

    if (period !== calendarType) {
      console.log('тот самый случай')
      dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: drillDirection() })

    } else {          
      if (focused === 'startDate') {
        dispatch({ type: CHANGE_START_DATE, startDate: {value: x, year: year} })
        setFocus('endDate')
      }
      if (focused === 'endDate') {
        dispatch({ type: CHANGE_END_DATE, endDate: {value: x, year: year} })
        setFocus(undefined)
      }  
    }
  }


  function handleClick(x){
    let typeValue
    let indexDayOfWeek
    let fieldName = inputFocus
    if(inputFocus == 'startDate'){
      typeValue = CHANGE_START_DATE;
      indexDayOfWeek = 0;
    }
    if(inputFocus == 'endDate'){
      typeValue = CHANGE_END_DATE;
      indexDayOfWeek = 6;
    }  

    switch (calendarType){
      case DAY:{
        let correctMonth = month;
        if(x.status === 'out'){
          correctMonth = x.date > 7 ? correctMonth-1 : correctMonth+1;
        }
        const monthString = correctMonth > 8 ? String(correctMonth + 1) : ('0' + String(correctMonth+1))
        const dayString = x.date > 9 ? String(x.date) : ('0' + String(x.date))
        const value = dayString + '.' + monthString + '.' + year
        
        dispatch({type: typeValue, [fieldName]: {value: value, year: year}})
        break; 
      }

      case WEEK:{
        const correctDay = x[indexDayOfWeek];
        let correctMonth = month;
        if(correctDay.status === 'out'){
          correctMonth = correctDay.date > 7 ? correctMonth-1 : correctMonth+1;
        }
        const monthString = correctMonth > 8 ? String(correctMonth + 1) : ('0' + String(correctMonth+1))
        const dayString = correctDay.date > 9 ? String(correctDay.date) : ('0' + String(correctDay.date))
        const value = dayString + '.' +monthString+'.'+year
        
        dispatch({type: typeValue, [fieldName]: {value: value, year: year}})
        break; 
      }
    }
    if (focused === 'startDate') {
      setFocus('endDate')
    }
    if (focused === 'endDate') {
      setFocus(undefined)
    }  
  }

  const renderCalendar = (type) => {
    switch (type) {
      case DAY:
      case WEEK:
        return <DaysWeeksRows data={weeks} onClick={handleClick}/>
      case MONTH:
        return <MonthsYearsRows data={months} onClick={onDrill}/>
      case QUARTER:
        return <MonthsYearsRows data={quarters} onClick={onDrill}/>
      case HALFYEAR:
        return <MonthsYearsRows data={halfyears} onClick={onDrill}/>
      case YEAR:
        return <MonthsYearsRows data={years} onClick={onDrill}/>
      default:
        break
    }
  }

  console.log('render calendar')
  const onBlur = e => {
    console.log('календарная потеря фокуса')
  }

  
  return (
    <div className="calendar" onBlur={onBlur}>
      <div style={{
        height,
        width: '312px',
        position: 'relative',
        borderRight: '1px solid rgb(228, 231, 231)',
        transition: 'all 0.2s ease-in-out',
      }}>
        <HeadingMarkers withDaysAWeek={withDaysAWeek} />


        <div>
          {withDaysAWeek && (
            <div className="calendar__days-a-week" >
              <ul>
                {days.map((day) => (
                  <li key={day}>
                    <small>{day}</small>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <table className="calendar__table" >
            <tbody>
              {renderCalendar(calendarType)}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Calendar
