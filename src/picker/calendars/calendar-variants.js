import React from 'react'
import classnames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import { steps, dayStatus, CHANGE_CALENDAR_TYPE, CHANGE_START_DATE, CHANGE_END_DATE, months, halfYear, } from '../../utils/consts'


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
    console.log(x);
    if(inputFocus == 'startDate'){
      switch (calendarType){
        case DAY:{
          let correctMonth = month;
          if(x.status === 'out'){
            correctMonth = x.date > 7 ? correctMonth-1 : correctMonth+1;
          }
          const monthString = correctMonth > 8 ? String(correctMonth + 1) : ('0' + String(correctMonth+1))
          const dayString = x.date > 9 ? String(x.date) : ('0' + String(x.date))
          const value = dayString + '.' +monthString+'.'+year
          dispatch({type: CHANGE_START_DATE, startDate: value})
          return; 
        }

        case WEEK:{
          const correctDay = x[0];
          let correctMonth = month;
          if(correctDay.status === 'out'){
            correctMonth = correctDay.date > 7 ? correctMonth-1 : correctMonth+1;
          }
          const monthString = correctMonth > 8 ? String(correctMonth + 1) : ('0' + String(correctMonth+1))
          const dayString = correctDay.date > 9 ? String(correctDay.date) : ('0' + String(correctDay.date))
          const value = dayString + '.' +monthString+'.'+year
          dispatch({type: CHANGE_START_DATE, startDate: value})
          return; 
        }
      }
    }

    if(inputFocus == 'endDate'){
      switch (calendarType){
        case DAY:{
          let correctMonth = month;
          if(x.status === 'out'){
            correctMonth = x.date > 7 ? correctMonth-1 : correctMonth+1;
          }
          const monthString = correctMonth > 8 ? String(correctMonth + 1) : ('0' + String(correctMonth+1))
          const dayString = x.date > 9 ? String(x.date) : ('0' + String(x.date))
          const value = dayString + '.' +monthString+'.'+year
          dispatch({type: CHANGE_END_DATE, endDate: value})
          return; 
        }

        case WEEK:{
          const correctDay = x[x.length-1];
          let correctMonth = month;
          if(correctDay.status === 'out'){
            correctMonth = correctDay.date > 7 ? correctMonth-1 : correctMonth+1;
          }
          const monthString = correctMonth > 8 ? String(correctMonth + 1) : ('0' + String(correctMonth+1))
          const dayString = correctDay.date > 9 ? String(correctDay.date) : ('0' + String(correctDay.date))
          const value = dayString + '.' +monthString+'.'+year
          dispatch({type: CHANGE_END_DATE, endDate: value})
          return; 
        }
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
      dispatch({
        type: CHANGE_CALENDAR_TYPE,
        calendarType: drillDirection(),
      })

    } else {
      //alert('The choice is made!')
      console.log(year)
      console.log('x',x)
      if(inputFocus == 'startDate'){
        dispatch({type: CHANGE_START_DATE, startDate: x})

        // switch (calendarType){
        //   case YEAR:{
        //     const value = '01.01.' + x;
        //     dispatch({type: CHANGE_START_DATE, startDate: value}) 
        //     return
        //   }
        //   case HALFYEAR:{
        //     const value = x===halfYear[0] ? ('01.01.'+year) : ('01.07.'+year);
        //     dispatch({type: CHANGE_START_DATE, startDate: value}) 
        //     return
        //   }
        // }
      }
      


      if(inputFocus == 'endDate'){
        dispatch({type: CHANGE_END_DATE, endDate: x})
        // switch (calendarType){
        //   case YEAR:{
        //     const value = '31.12.' + x;
        //     dispatch({type: CHANGE_END_DATE, endDate: value}) 
        //   }
        //   case HALFYEAR:{
        //     const value = x===halfYear[0] ? ('30.06.'+year) : ('31.12.'+year);
        //     dispatch({type: CHANGE_END_DATE, endDate: value}) 
        //     return
        //   }
        // }
      }

    }
  }

  const tdClsx = classnames('calendar__table_td', {
    'td-30': (calendarType === WEEK || calendarType === DAY),
    'td-12': (calendarType === MONTH || calendarType === YEAR),
    'td-4': calendarType === QUARTER,
    'td-2': calendarType === HALFYEAR,
  })
  function handleClick(x){
    console.log(x);
  }
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
