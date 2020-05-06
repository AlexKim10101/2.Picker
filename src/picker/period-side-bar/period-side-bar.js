import React, { useEffect } from 'react'
import classnames from 'classnames'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import {
  steps,
  stepsLabels,
  CHANGE_PERIOD,
  CHANGE_CALENDAR_TYPE,
  UPDATE_DATES,
} from '../../utils/consts'
import {inputValueCreater} from  '../../utils/converters'

import './period-side-bar.css'


export default function PeriodSideBar({period, step, changePeriod}) {
  
  const allowedPeriodTypes = steps.slice(0, steps.indexOf(step) + 1)
  const clsx = (p) => classnames('period-Btn', { 'active-period': p === period })


  //нужно перенести в dates-picker

  // useEffect(() => {
  //   if (!allowedPeriodTypes.includes(period)) {
  //     dispatch({
  //       type: CHANGE_PERIOD,
  //       period: allowedPeriodTypes[allowedPeriodTypes.length - 1],
  //     })
  //   }
  // }, [allowedPeriodTypes, period, dispatch])

  
  
  return (
    <div className="period-side-bar">
      <div className="period-side-bar__title">
        <strong>Период:</strong>
      </div>
      {allowedPeriodTypes.map((period, idx) => (
        <button
          key={period}
          className={clsx(period)}
          onClick={() => changePeriod(period)}
        >
          {stepsLabels[idx]}
        </button>
      ))}
    </div>  
  )
}
