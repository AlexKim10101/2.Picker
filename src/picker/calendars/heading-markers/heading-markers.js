import React from 'react'
import classnames from 'classnames'
import { usePickerState, usePickerDispatch } from '../../dates-picker-context'
import {
  steps,
  calendarTypes,
  monthsFull,
  CHANGE_YEAR,
  CHANGE_MONTH,
  CHANGE_CALENDAR_TYPE,
  CHANGE_START_DATE,
  CHANGE_END_DATE
} from '../../../utils/consts'
import './heading-markers.css'


export default function HeadingMarkers({ withDaysAWeek }) {
  const {
    year,
    month,
    step,
    calendarType,
    inputFocus,
  } = usePickerState()

  const [
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    HALFYEAR,
    YEAR
  ] = steps
  
  const monthFullName = monthsFull[month]
  const allowedCalendarTypes = calendarTypes.slice(0, calendarTypes.indexOf(step) + 1)
  
  const dispatch = usePickerDispatch()

  const intervalChanges = (onNext, onPrev) => ({ onNext, onPrev })

  const calendarTypeChanges = (type) => {
    const isLast = calendarType === allowedCalendarTypes[allowedCalendarTypes.length - 1]
    if (!isLast) dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: type })
  }

  const onMonthChanges = intervalChanges(
    () => {
      if (month === 11) {
        dispatch({ type: CHANGE_YEAR, year: year + 1 })
        dispatch({ type: CHANGE_MONTH, month: 0 })
      } else {
        dispatch({ type: CHANGE_MONTH, month: month + 1 })
      }
    },
    () => {
      if (month === 0) {
        dispatch({ type: CHANGE_YEAR, year: year - 1 })
        dispatch({ type: CHANGE_MONTH, month: 11 })
      } else {
        dispatch({ type: CHANGE_MONTH, month: month - 1 })
      }
    }
  )

  const onYearChanges = intervalChanges(
    () => {
      dispatch({ type: CHANGE_YEAR, year: year + 1 })
    },
    () => {
      dispatch({ type: CHANGE_YEAR, year: year - 1 })
    }  
  )

  const onDecadeChanges = intervalChanges(
    () => {
      dispatch({ type: CHANGE_YEAR, year: year + 11 })
    },
    () => {
      dispatch({ type: CHANGE_YEAR, year: year - 11 })
    }
  )

  const headingSet = (type) => {
    switch (type) {
      case DAY:
      case WEEK:
        return {
          text: `${monthFullName} ${year}`,
          onBtns: onMonthChanges,
          onText: () => calendarTypeChanges(MONTH),
        }
      case MONTH:
      case QUARTER:
      case HALFYEAR:
        return {
          text: year,
          onBtns: onYearChanges,
          onText: () => calendarTypeChanges(YEAR),
        }
      case YEAR:
        return {
          text: `${year - 11} - ${year}`,
          onBtns: onDecadeChanges,
          onText: null
        }
      default:
        break
    }
  }



  const { text, onBtns, onText } = headingSet(calendarType)
  const clsx = classnames('interval', { 'with-days-a-week': withDaysAWeek })

  return (
    <div>
      <button className="prev-Btn" onClick={onBtns.onPrev}>Prev</button>
      <button className="next-Btn" onClick={onBtns.onNext}>Next</button> 
      <div className={clsx}>
        <button onClick={onText}>
          <strong>{text}</strong>
        </button>
      </div>
    </div>
  )
}
