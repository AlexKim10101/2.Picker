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
  START_DATE,
  END_DATE,
  CHANGE_START_DATE,
  CHANGE_END_DATE, 
  VALID_START_DATE,
  VALID_END_DATE,  
  VALID_FORM,
  SET_RESULT_START_DATE,
  SET_RESULT_END_DATE,
  UPDATE_DATES,
  SET_INPUT_VALIDATION,
  SET_FOCUS_TRANSFER,
  MONTH_MODIFICATOR_FOR_START,
  MONTH_MODIFICATOR_FOR_END,
  DATE_MONTH_MODIFICATOR_FOR_START,
  DATE_MONTH_MODIFICATOR_FOR_END,
  QUART_VALUES_FOR_START,
  QUART_VALUES_FOR_END,
  HALF_YEAR_VALUES_FOR_START,
  HALF_YEAR_VALUES_FOR_END,
  YEAR_VALUE_FOR_START,
  YEAR_VALUE_FOR_END,
} from '../../utils/consts'
import './calendar.css'

import {inputValueValidation} from  '../../utils/converters'

const [
  DAY,
  WEEK,
  MONTH,
  QUARTER,
  HALFYEAR,
  YEAR
] = steps



const Calendar = ({ focused, setFocus }) => {
  const [
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    HALFYEAR,
    YEAR
  ] = steps

  const { calendarType, year, month, inputFocus, dates } = usePickerState()

  const d = (...args) => new Date(...args)
  const firstDay = d(year, month).getUTCDay()
  // const y = d().getFullYear()~
  
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

  function handleClick(x){
    // console.log(inputFocus)
   
    let indexDayOfWeek
    let value
    if(inputFocus == START_DATE){      
      indexDayOfWeek = 0;
    }
    if(inputFocus == END_DATE){      
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
        value = dayString + '.' + monthString + '.' + year        
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
        value = dayString + '.' + monthString + '.' + year        
        break; 
      }

      case MONTH:
      case QUARTER:
      case HALFYEAR:
      case YEAR: {
        value = x
        break; 
      }
    }


    //
    //const datesCopy = JSON.parse(JSON.stringify(dates));
    const newValue = Object.assign({}, dates[inputFocus], {inputValue: value, year: year})
    const result = Object.assign({}, dates, {[inputFocus]:newValue})
    dispatch({type: UPDATE_DATES, dates: result})
    dispatch({type: SET_INPUT_VALIDATION, needInputValidation: true})
  }

  

  const renderCalendar = (type) => {
    switch (type) {
      case DAY:
      case WEEK:
        return <DaysWeeksRows data={weeks} onClick={handleClick}/>
      case MONTH:
        return <MonthsYearsRows data={months} onClick={handleClick}/>
      case QUARTER:
        return <MonthsYearsRows data={quarters} onClick={handleClick}/>
      case HALFYEAR:
        return <MonthsYearsRows data={halfyears} onClick={handleClick}/>
      case YEAR:
        return <MonthsYearsRows data={years} onClick={handleClick}/>
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
