import React, { useEffect } from 'react'
import classnames from 'classnames'
import {
  steps,
  stepsLabels,
} from '../../utils/consts'

import './period-side-bar.css'


export default function PeriodSideBar({period, step, changePeriod}) {
  
  const allowedPeriodTypes = steps.slice(0, steps.indexOf(step) + 1)
  const clsx = (p) => classnames('period-Btn', { 'active-period': p === period })

  useEffect(() => {
    if (!allowedPeriodTypes.includes(period)) {
      changePeriod(allowedPeriodTypes[allowedPeriodTypes.length - 1])
    }
  }, [allowedPeriodTypes, period])

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
