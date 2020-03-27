import React from 'react'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import {
  steps,
  stepsLabels,
  CHANGE_STEP,
  CHANGE_PERIOD,
  CHANGE_CALENDAR_TYPE,
} from '../../utils/consts'


export default function Select() {
  const { step } = usePickerState()
  const dispatch = usePickerDispatch()

  const onChange = ({ target }) => {
    dispatch({ type: CHANGE_STEP, step: target.value })
    dispatch({ type: CHANGE_PERIOD, period: target.value })
    dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: target.value })
  }

  return (
    <div>
      {/* // temporary */}
      Шаг
      &nbsp;
      {/* temporary */}
      <select name="steps" id="step-select" value={step} onChange={onChange}>
        {stepsLabels.map((step, idx) => (
          <option key={step} value={steps[idx]}>
            {step}
          </option>
        ))}
      </select>
    </div>
  )
}

