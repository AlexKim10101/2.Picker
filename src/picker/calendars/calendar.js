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
  dayStatus,
} from '../../utils/consts'
import './calendar.css'

const Calendar = ({ 
  calendarType, 
  year, 
  month,  
  step, 
  leftBorder,
  rightBorder,
  setRealInputValue,
  setVisibleValue,
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
  const { curr, out } = dayStatus
  const d = (...args) => new Date(...args)
  const firstDay = d(year, month).getUTCDay()
  //console.log('firstDay', firstDay)
  const daysInMonth = (x) => 32 - d(year, month + x, 32).getDate()
  const daysInCurrMonth = daysInMonth(0)
  const daysInPrevMonth = daysInMonth(-1)
  
  const weeksAmount = Math.ceil((firstDay + daysInCurrMonth) / 7)
  const forepart = createSequence(daysInPrevMonth - firstDay + 1, daysInPrevMonth, 1)
  const yearStack = createSequence(year - 11, year, 1)

  let weeks = generateDays(firstDay, weeksAmount, daysInCurrMonth, forepart)
  const months = generateMonths
  const quarters = generateQuarters
  const halfyears = generateHalfYears
  const years = generateYears(yearStack)

  const withDaysAWeek = (calendarType === WEEK || calendarType === DAY)
  
  const height = withDaysAWeek ? weeks.length * 37 + 82 : (calendarType === MONTH || calendarType === YEAR) ? 256 : 194
  

  function generateDate(item){
    let date
    if(item.status === curr){
      date = new Date(year, month, item.date)
    }
    if(item.status === out){
      if(item.date<20){
        if(month == 11){
          date = new Date(year+1, 0, item.date)
        }else{
          date = new Date(year, month+1, item.date)
        }
      }else{
        if(month == 0){
          date = new Date(year-1, 11, item.date)          
        }else{
          date = new Date(year, month-1, item.date)
        }
      }
    }
    return date
  }

  function colorMaker(date){
    console.log('colorMaker ',date)
    if((leftBorder&&date.toString()===leftBorder.toString())||(rightBorder&&date.toString()===rightBorder.toString())){
      return 'blue'
    }
    if(date<leftBorder||date>rightBorder){
      return null
    }
    if(leftBorder===null||rightBorder==null){
      return null
    }
    return 'light-blue'
  }
  //добавим поле к каждому элементу в календаре
  switch(calendarType){
    case DAY:
    case WEEK:{
      weeks.forEach(function(week){
        week.forEach(function(item){
          
          let date = generateDate(item)
          item.color = colorMaker(date)
          return item
        })
        return week
      })
      break
    }
    default:{
      break
    }

  }

  // console.log(weeks)

  function handleClick(x){
   
    setRealInputValue(x, 'calendar')
  }

/// переписать
  function handleHover(x){
    const value = x ? x : null
    setVisibleValue(value)
  }

  // function myMouseOut(){
  //   changeInputValue(focusLocation, '')
  // }

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
