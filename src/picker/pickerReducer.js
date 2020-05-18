
import {
    CHANGE_YEAR,
    CHANGE_MONTH,
    CHANGE_STEP,
    CHANGE_PERIOD,
    CHANGE_CALENDAR_TYPE,
    VALID_FORM,
    SET_INPUT_FOCUS,
    UPDATE_DATES,
    START_DATE,
    END_DATE,
    PURE_START_DATE,
    PURE_END_DATE,
} from '../utils/consts'

export function pickerReducer(state, action) {
    switch (action.type) {
        case CHANGE_YEAR:
            return { ...state, year: action.year  }
        case CHANGE_MONTH:
            return { ...state, month: action.month }
        case CHANGE_STEP:
            return { ...state, step: action.step, focusLocation: START_DATE}
        case CHANGE_PERIOD:
            return { 
                ...state, 
                period: action.period, 
                [START_DATE]: PURE_START_DATE, 
                [END_DATE]: PURE_END_DATE,
                calendarType: action.period
            }
        case CHANGE_CALENDAR_TYPE:
            return { ...state, calendarType: action.calendarType }            
        case VALID_FORM:
            return { ...state, validFormData: action.validFormData }       
        case SET_INPUT_FOCUS:
            return { ...state, focusLocation: action.focusLocation}         
        case UPDATE_DATES:
            return {...state, [action.id]: action.value}  
          
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}