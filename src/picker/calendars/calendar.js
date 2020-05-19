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
  months,
  quarters,
  halfYear,
  DATE_MONTH_MODIFICATOR_FOR_END,
  QUART_VALUES_FOR_START,
  QUART_VALUES_FOR_END,
  HALF_YEAR_VALUES_FOR_START,
  HALF_YEAR_VALUES_FOR_END,
  YEAR_VALUE_FOR_START,
  YEAR_VALUE_FOR_END
} from '../../utils/consts'
import './calendar.css'
import { dateCreater } from '../../utils/converters'

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
  let months = generateMonths
  let quarters = generateQuarters
  let halfyears = generateHalfYears
  let years = generateYears(yearStack)

  const withDaysAWeek = (calendarType === WEEK || calendarType === DAY)
  
  const height = withDaysAWeek ? weeks.length * 37 + 82 : (calendarType === MONTH || calendarType === YEAR) ? 256 : 194
  

  function generateDate(item){
    let date

    switch(calendarType){
      case DAY:        
      case WEEK:{
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
        break
      }
      case MONTH:{
        let startDate
        let endDate        
        
        let monthIndex = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'].indexOf(item)
        //console.log(months)

        console.log(monthIndex)
        if(monthIndex === 11){
          endDate = new Date(year, monthIndex, 31)
        }else{
          endDate = new Date(new Date(year, monthIndex+1, 1)-DATE_MONTH_MODIFICATOR_FOR_END)
        }
        startDate = new Date(year, monthIndex, 1)
        date = {
          date: item,
          startDate: startDate,
          endDate: endDate,
          color: null
        }

        break
      }
      case QUARTER:{
        //console.log(quarters)
        let quarterIndex = ['I кв.', 'II кв.', 'III кв.', 'IV кв.'].indexOf(item)
        console.log(quarterIndex)

        date = {
          date: item,
          startDate: dateCreater(QUART_VALUES_FOR_START[quarterIndex]+year),
          endDate: dateCreater(QUART_VALUES_FOR_END[quarterIndex]+year),
          color: null
        }
        break
      }
      case HALFYEAR:{
      
        let halfYearIndex = ['1-ое полугодие', '2-ое полугодие'].indexOf(item)
        date = {
          date: item,
          startDate: dateCreater(HALF_YEAR_VALUES_FOR_START[halfYearIndex]+year),
          endDate: dateCreater(HALF_YEAR_VALUES_FOR_END[halfYearIndex]+year),
          color: null
        }
        break
      }
      case YEAR:{
        console.log('ghbdtn')
        date = {
          date: item,
          startDate: dateCreater(YEAR_VALUE_FOR_START+item),
          endDate: dateCreater(YEAR_VALUE_FOR_END+item),
          color: null
        }
        break
      }
      default:{
        console.log('что-то пошло не так')
        break
      }
    }    
    return date
  }

  function colorMaker(date){
    //console.log('colorMaker ',date)
    switch(calendarType){
      case DAY:
      case WEEK:{
        //console.log('test')
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
      case MONTH:
      case QUARTER:
      case HALFYEAR:
      case YEAR:{
        if((leftBorder&&date.startDate.toString()===leftBorder.toString())||(rightBorder&&date.endDate.toString()===rightBorder.toString())){
          return 'blue'
        }
        if(date.startDate<leftBorder||date.endDate>rightBorder){
          return null
        }
        if(leftBorder===null||rightBorder==null){
          return null
        }
        return 'light-blue'
      }
      default:{
        console.log('что-то пошло не так')
        break
      }
    }
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
    case MONTH:{
      let newMonths=[]
      let newMonthSlice=[]
      months.forEach(function(month_slice){
        month_slice.forEach(function(month){
          month = generateDate(month)    
          month.color = colorMaker(month)  
          newMonthSlice.push(month)
          return month
        })
        newMonths.push(newMonthSlice)
        newMonthSlice = []
        return month_slice
      })
      months = newMonths
      break     

    }
    
    case QUARTER:{
      let newQuqrters=[]
      let newQuqrterSlice=[]
      quarters.forEach(function(quarter_slice){
        quarter_slice.forEach(function(quarter){
          quarter = generateDate(quarter)    
          quarter.color = colorMaker(quarter)  
          newQuqrterSlice.push(quarter)
          return quarter
        })
        newQuqrters.push(newQuqrterSlice)
        newQuqrterSlice = []
        return quarter_slice
      })
      quarters = newQuqrters
      break
    }
    case HALFYEAR:{
      let newHalfYear=[]
      let newHalfYearSlice=[]
      halfyears.forEach(function(halfyear_slice){
        halfyear_slice.forEach(function(halfyear){
          halfyear = generateDate(halfyear)    
          halfyear.color = colorMaker(halfyear)  
          newHalfYearSlice.push(halfyear)
          return halfyear
        })
        newHalfYear.push(newHalfYearSlice)
        newHalfYearSlice = []
        return halfyear_slice
      })
      halfyears = newHalfYear
      break    
    }
    case YEAR:{
      let newYears=[]
      let newYearSlice=[]
      years.forEach(function(year_slice){
        year_slice.forEach(function(year){
          year = generateDate(year)    
          year.color = colorMaker(year)  
          newYearSlice.push(year)
          return year
        })
        newYears.push(newYearSlice)
        newYearSlice = []
        return year_slice
      })
      years = newYears
      break    
    }
    default:{
      break
    }

  }
  

  const renderCalendar = (type) => {
    switch (type) {
      case DAY:
      case WEEK:
        return <DaysWeeksRows data={weeks} onClick={(x)=>setRealInputValue(x, 'calendar')} calendarType={calendarType} handleHover={setVisibleValue}/>
      case MONTH:
        return <MonthsYearsRows data={months} onClick={(x)=>setRealInputValue(x, 'calendar')} calendarType={calendarType} handleHover={setVisibleValue}/>
      case QUARTER:
        return <MonthsYearsRows data={quarters} onClick={(x)=>setRealInputValue(x, 'calendar')} calendarType={calendarType} handleHover={setVisibleValue}/>
      case HALFYEAR:
        return <MonthsYearsRows data={halfyears} onClick={(x)=>setRealInputValue(x, 'calendar')} calendarType={calendarType} handleHover={setVisibleValue}/>
      case YEAR:
        return <MonthsYearsRows data={years} onClick={(x)=>setRealInputValue(x, 'calendar')} calendarType={calendarType} handleHover={setVisibleValue}/>
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
