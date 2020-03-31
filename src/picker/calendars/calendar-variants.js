import React from 'react'
import classnames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import { steps, dayStatus, CHANGE_CALENDAR_TYPE, } from '../../utils/consts'


export const DaysWeeksRows = ({ data }) => {
  const { calendarType } = usePickerState()

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
    
    console.log('x');

  }
  return data.map((item) => (
    <tr key={uuidv4()} className={trClsx}>
      {item.map((x) => (
        <td key={uuidv4()} className={tdClsx(x.status)} onClick={()=>handleClick(x)}>
          {x.date}
        </td>
      ))}
    </tr>
  ))
}


export const MonthsYearsRows = ({ data }) => {
  const { period, calendarType, year } = usePickerState()
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
      console.log('dispatch')

    } else {
      alert('The choice is made!')
      console.log(year)
      console.log(x)


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
