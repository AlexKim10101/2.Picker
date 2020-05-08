import React from 'react'
import {
  steps,
  stepsLabels,
} from '../../utils/consts'


export default function Select(props) {
  return (
    <div>
      {/* // temporary */}
      Шаг
      &nbsp;
      {/* temporary */}
      <select 
        name="steps" 
        id="step-select" 
        value={props.step} 
        onChange={({target})=>props.changePeriod(target.value)}
      >
        {stepsLabels.map((step, idx) => (
          <option key={step} value={steps[idx]}>
            {step}
          </option>
        ))}
      </select>
    </div>
  )
}

