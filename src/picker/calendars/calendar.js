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
  months,
  monthsFull,
  quarters,
  halfYear,
  CHANGE_CALENDAR_TYPE,
  SET_INPUT_FOCUS,
  START_DATE,
  END_DATE,
  CHANGE_START_DATE,
  CHANGE_END_DATE, 
  VALID_START_DATE,
  VALID_END_DATE,  
  VALID_FORM,
  SET_RESULT_START_DATE,
  SET_RESULT_END_DATE,
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
const [
  DAY,
  WEEK,
  MONTH,
  QUARTER,
  HALFYEAR,
  YEAR
] = steps

function dateCreater(string){
	let arrD = string.split(".");
  arrD[1] -= 1;
  return new Date(arrD[2], arrD[1], arrD[0]);
}

function dateValidation(value){
	let arrD = value.split(".");
  arrD[1] -= 1;
  let d = new Date(arrD[2], arrD[1], arrD[0]);
  if ((value.length == 10) && (d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
    return true;
  } else {    
    return false;
  }
}


function inputValueValidation(fieldName, dateObj, period){
  let monthModificator, 
    monthDateModificator,   
    qurtArr,    
    halfYearArr,   
    yearPreDate;

  console.log(fieldName)
  console.log(dateObj)
  console.log(period)
  let newDate = null;
  let changeIsCorrect = false;

  if(fieldName == START_DATE){
    
    monthModificator = MONTH_MODIFICATOR_FOR_START
    monthDateModificator = DATE_MONTH_MODIFICATOR_FOR_START
    qurtArr = QUART_VALUES_FOR_START;
    halfYearArr = HALF_YEAR_VALUES_FOR_START;      
    yearPreDate = YEAR_VALUE_FOR_START;

  }

  if(fieldName == END_DATE){
    monthModificator = MONTH_MODIFICATOR_FOR_END;
    monthDateModificator = DATE_MONTH_MODIFICATOR_FOR_END;
    qurtArr = QUART_VALUES_FOR_END;
    halfYearArr = HALF_YEAR_VALUES_FOR_END;
    yearPreDate = YEAR_VALUE_FOR_END;
  }

  console.log(dateObj)

  switch(period){
    case DAY :
    case WEEK: {        
      if(dateValidation(dateObj.value)){
        newDate = dateCreater(dateObj.value)
        changeIsCorrect = true;

      }
      break;
    }
    case MONTH :{
      console.log(months)

      if(months.includes(dateObj.value)){   
        console.log('asdasdasdasdasd')

        newDate = new Date( new Date(dateObj.year, months.indexOf(dateObj.value)+monthModificator, 1) - monthDateModificator)
        changeIsCorrect = true;
       
      }       

      if(monthsFull.includes(dateObj.value)){  
        newDate = new Date( new Date(dateObj.year, monthsFull.indexOf(dateObj.value)+monthModificator, 1) - monthDateModificator)    
        changeIsCorrect = true;
      }
      
      break;
    }
    case QUARTER :{
      if(quarters.includes(dateObj.value)){          
        const qurtIndex = quarters.indexOf(dateObj.value)
        const blank = qurtArr[qurtIndex] + dateObj.year;
        newDate = dateCreater(blank);
        changeIsCorrect = true;
      }            
      break;
    }

    case HALFYEAR :{
      if(halfYear.includes(dateObj.value)){
        const halfYearIndex = halfYear.indexOf(dateObj.value)
        const blank = halfYearArr[halfYearIndex] + dateObj.year;
        newDate = dateCreater(blank)
        changeIsCorrect = true;

      }             
      break;
    }

    case YEAR:{
      if(dateValidation(yearPreDate + dateObj.value)){
        newDate = dateCreater(yearPreDate + dateObj.value)
        changeIsCorrect = true;
      }
    }
  }
  
  
  return {verdict: changeIsCorrect, newDate: newDate}
    
}

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

  // function updateFocusLocation(){

    
  //   dispatch({type: SET_INPUT_FOCUS, inputFocus: END_DATE})

  // }

  //
  

  //
  function handleClick(x){
    // console.log(inputFocus)
    let changeDate
    let fieldChangeDate = inputFocus

    let validDate
    let fieldValidDate
    let setResultDate
    let fieldResultDate
    let indexDayOfWeek
    let value
    if(inputFocus == START_DATE){
      changeDate = CHANGE_START_DATE;
      validDate = VALID_START_DATE
      fieldValidDate = 'invalidStartDate'
      setResultDate = SET_RESULT_START_DATE
      fieldResultDate = 'resultStartDate'
      indexDayOfWeek = 0;
    }
    if(inputFocus == END_DATE){
      changeDate = CHANGE_END_DATE;
      validDate = VALID_END_DATE
      fieldValidDate = 'invalidEndDate'
      setResultDate = SET_RESULT_END_DATE
      fieldResultDate = 'resultEndDate'
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

    dispatch({ type: changeDate, [fieldChangeDate]: {value: value, year: year} })
    //dispatch({type: SET_RESULT_START_DATE, resultStartDate: newDate })      
    

    dispatch({type: validDate, [fieldValidDate]: false})
    let resullt = inputValueValidation(fieldChangeDate,{value: value, year: year}, period)
    console.log('click', resullt)
    dispatch({type: setResultDate, [fieldResultDate]: inputValueValidation(fieldChangeDate,{value: value, year: year}, period).newDate })

    dispatch({type: SET_FOCUS_TRANSFER, needChangeFocus: true})
    // updateFocusLocation()
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
