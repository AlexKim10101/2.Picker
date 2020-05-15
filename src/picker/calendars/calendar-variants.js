import React from 'react'
import classnames from 'classnames'
import { v4 as uuidv4 } from 'uuid'
//import { usePickerState } from '../dates-picker-context'
import { steps, dayStatus} from '../../utils/consts'


export const DaysWeeksRows = ({ data, onClick, calendarType, handleHover }) => {
  //const { calendarType } = usePickerState()
 
  const [DAY, WEEK] = steps
  const { curr, out } = dayStatus

  const trClsx = classnames('calendar__table_tr', {
    'tr-days': calendarType === DAY,
    'tr-weeks': calendarType === WEEK,
  })

  const tdClsx = (status, color) => classnames('calendar__table_td', 'td-30', {
    'td-curr': status === curr,
    'td-out': status === out,
    'selected': color === 'light-blue'
  })


  return data.map((item, index) => (
    <tr key={uuidv4()} className={trClsx}>
      {item.map((x) => {
        const arg = calendarType === WEEK ? item : x;
        return(
          <td 
            key={uuidv4()} 
            tabIndex={0} 
            className={tdClsx(x.status, x.color)} 
            onClick={()=>onClick(arg) } 
            onMouseEnter={()=>handleHover(arg) } 
            onMouseLeave={()=>handleHover()}
          >
            {x.date}
          </td>
        )}
      )}
    </tr>
  ))
}


export const MonthsYearsRows = ({ data, onClick, calendarType, handleHover}) => {
  
  const [
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    HALFYEAR,
    YEAR
  ] = steps


  const tdClsx = classnames('calendar__table_td', {
    'td-30': (calendarType === WEEK || calendarType === DAY),
    'td-12': (calendarType === MONTH || calendarType === YEAR),
    'td-4': calendarType === QUARTER,
    'td-2': calendarType === HALFYEAR,
  })
  
  return data.map((item) => (
    <tr key={uuidv4()}>
      {item.map((x) => (
        <td 
          key={uuidv4()} 
          tabIndex={0} 
          className={tdClsx} 
          onClick={()=>onClick(x)} 
          onMouseEnter={()=>handleHover(x)} 
          onMouseLeave={()=>handleHover()}
        >
          {x}
        </td>
      ))}
    </tr>
  ))
}
