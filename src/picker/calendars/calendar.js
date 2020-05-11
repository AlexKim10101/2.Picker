import React from 'react'
//import { usePickerState, usePickerDispatch} from '../dates-picker-context'
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
  START_DATE,
  END_DATE,  
  UPDATE_DATES,
  SET_INPUT_VALIDATION,  
} from '../../utils/consts'
import { createInputValue } from '../../utils/converters'

import './calendar.css'

const Calendar = ({ 
  calendarType, 
  year, 
  month, 
  focusLocation, 
  step, 
  changeInputValue,
  setInputResult,
  changeClendarType,
  changeMonth,
  changeYear
} ) => {
  const [
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    HALFYEAR,
    YEAR
  ] = steps

  const d = (...args) => new Date(...args)
  const firstDay = d(year, month).getUTCDay()
  
  const daysInMonth = (x) => 32 - d(year, month + x, 32).getDate()
  const daysInCurrMonth = daysInMonth(0)
  const daysInPrevMonth = daysInMonth(-1)
  
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
  

  function handleClick(x){
   
    const value = createInputValue(x, focusLocation, calendarType, year, month)
    setInputResult(focusLocation, value)
  }


  function handleHover(x){
    const value = createInputValue(x, focusLocation, calendarType, year, month)
    changeInputValue(focusLocation, value)
  }

  const renderCalendar = (type) => {
    switch (type) {
      case DAY:
      case WEEK:
        return <DaysWeeksRows data={weeks} onClick={handleClick} calendarType={calendarType} handleHover={handleHover}/>
      case MONTH:
        return <MonthsYearsRows data={months} onClick={handleClick} calendarType={calendarType} handleHover={handleHover}/>
      case QUARTER:
        return <MonthsYearsRows data={quarters} onClick={handleClick} calendarType={calendarType} handleHover={handleHover}/>
      case HALFYEAR:
        return <MonthsYearsRows data={halfyears} onClick={handleClick} calendarType={calendarType} handleHover={handleHover}/>
      case YEAR:
        return <MonthsYearsRows data={years} onClick={handleClick} calendarType={calendarType} handleHover={handleHover}/>
      default:
        break
    }
  }
   
  return (
    <div className="calendar" id="calendar">
      <div style={{
        height,
        width: '312px',
        position: 'relative',
        borderRight: '1px solid rgb(228, 231, 231)',
        transition: 'all 0.2s ease-in-out',
      }}>
        <HeadingMarkers
          year={year}
          month={month}
          step={step}
          calendarType={calendarType}
          withDaysAWeek={withDaysAWeek} 
          changeClendarType={changeClendarType}
          changeMonth={changeMonth}
          changeYear={changeYear}
        />

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
