import React, { createContext, useContext, useReducer } from 'react'
import {
  CHANGE_YEAR,
  CHANGE_MONTH,
  CHANGE_STEP,
  CHANGE_PERIOD,
  CHANGE_CALENDAR_TYPE,
  CHANGE_LEFT_DATE,
  CHANGE_RIGHT_DATE
} from '../utils/consts'

const PickerStateContext = createContext()
const PickerDispatchContext = createContext()

function pickerReducer(state, action) {
  switch (action.type) {
    case CHANGE_YEAR:
      return { ...state, year: action.year  }
    case CHANGE_MONTH:
      return { ...state, month: action.month }
    case CHANGE_STEP:
      return { ...state, step: action.step }
    case CHANGE_PERIOD:
      return { ...state, period: action.period }
    case CHANGE_CALENDAR_TYPE:
      return { ...state, calendarType: action.calendarType }
    case CHANGE_LEFT_DATE:
      return { ...state, leftDate: action.leftDate}
      case CHANGE_RIGHT_DATE:
      return { ...state, rightDate: action.rightDate}
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function PickerProvider({ initialData, children }) {
  const [state, dispatch] = useReducer(pickerReducer, initialData)
  return (
    <PickerStateContext.Provider value={state}>
      <PickerDispatchContext.Provider value={dispatch}>
        {children}
      </PickerDispatchContext.Provider>
    </PickerStateContext.Provider>
  )
}

function usePickerState() {
  const context = useContext(PickerStateContext)
  if (context === undefined) {
    throw new Error('usePickerState must be used within a PickerProvider')
  }
  return context
}

function usePickerDispatch() {
  const context = useContext(PickerDispatchContext)
  if (context === undefined) {
    throw new Error('usePickerDispatch must be used within a PickerProvider')
  }
  return context
}

export { PickerProvider, usePickerState, usePickerDispatch }