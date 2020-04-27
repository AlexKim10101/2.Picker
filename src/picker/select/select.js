import React from 'react'
import { usePickerState, usePickerDispatch } from '../dates-picker-context'
import {
  steps,
  stepsLabels,
  CHANGE_STEP,
  CHANGE_PERIOD,
  CHANGE_CALENDAR_TYPE,
  UPDATE_DATES,
  SET_INPUT_VALIDATION
} from '../../utils/consts'
import {inputValueCreater} from  '../../utils/converters'


export default function Select() {
  const { step, inputFocus, dates } = usePickerState()
  const dispatch = usePickerDispatch()

  const onChange = ({ target }) => {
    const newDates = inputValueCreater(dates, inputFocus, {period: target.value})
    dispatch({type: UPDATE_DATES, dates: newDates})
    dispatch({ type: CHANGE_STEP, step: target.value })
    dispatch({ type: CHANGE_PERIOD, period: target.value })
    dispatch({ type: CHANGE_CALENDAR_TYPE, calendarType: target.value })
    dispatch({type: SET_INPUT_VALIDATION, needInputValidation: true})

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

