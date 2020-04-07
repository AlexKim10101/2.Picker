import React from 'react'
import classnames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import { steps, dayStatus, CHANGE_CALENDAR_TYPE, CHANGE_START_DATE, CHANGE_END_DATE } from '../../utils/consts'


export const DaysWeeksRows = ({ data }) => {
  const { period, calendarType, year, month, inputFocus } = usePickerState()
  const dispatch = usePickerDispatch()
  const [DAY, WEEK] = steps
  const { curr, out } = dayStatus

  const trClsx = classnames('calendar__table_tr', {
    'tr-days': calendarType === DAY,
    'tr-weeks': calendarType === WEEK,
  })

  const tdClsx = (status) => classnames('calendar__table_td', 'td-30', {
    'td-curr': status === curr,
    'td-out': status === out,
  })



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
        return; 
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
        return; 
      }
    }
  }
  return data.map((item, index) => (
    <tr key={uuidv4()} className={trClsx}>
      {item.map((x) => {
        const arg = calendarType === WEEK ? item : x;
        return(
          <td key={uuidv4()} tabIndex={0} className={tdClsx(x.status)} onClick={()=>handleClick(arg)}>
            {x.date}
          </td>
        )}
      )}
    </tr>
  ))
}


export const MonthsYearsRows = ({ data }) => {
  const { period, calendarType, year, month, inputFocus } = usePickerState()
  const dispatch = usePickerDispatch()

  const [
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    HALFYEAR,
    YEAR
  ] = steps

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
      console.log('true onDrill')
      dispatch({
        type: CHANGE_CALENDAR_TYPE,
        calendarType: drillDirection(),
      })

    } else {          
      (inputFocus == 'startDate') && dispatch({type: CHANGE_START_DATE, startDate: {value: x, year: year}});
      (inputFocus == 'endDate') && dispatch({type: CHANGE_END_DATE, endDate: {value: x, year: year}});   
    }
  }

  const tdClsx = classnames('calendar__table_td', {
    'td-30': (calendarType === WEEK || calendarType === DAY),
    'td-12': (calendarType === MONTH || calendarType === YEAR),
    'td-4': calendarType === QUARTER,
    'td-2': calendarType === HALFYEAR,
  })
  
  return data.map((item) => (
    <tr key={uuidv4()}>
      {item.map((x) => (
        <td key={uuidv4()} tabIndex={0} className={tdClsx} onClick={()=>onDrill(x)}>
          {x}
        </td>
      ))}
    </tr>
  ))
}
