
import {
    CHANGE_YEAR,
    CHANGE_MONTH,
    CHANGE_STEP,
    CHANGE_PERIOD,
    CHANGE_CALENDAR_TYPE,
    CHANGE_START_DATE,
    CHANGE_END_DATE,
    VALID_START_DATE,
    VALID_END_DATE,
    VALID_FORM,
    SET_RESULT_START_DATE,
    SET_RESULT_END_DATE,
    SET_INPUT_FOCUS,
    SET_FOCUS_TRANSFER,
    SET_INPUT_VALIDATION,
    SET_FORM_VALIDATION,
    UPDATE_DATES
} from '../utils/consts'

export function pickerReducer(state, action) {
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
        case CHANGE_START_DATE:
            return { ...state, startDate: action.startDate}
        case CHANGE_END_DATE:
            return { ...state, endDate: action.endDate} 
        case VALID_START_DATE:
            return { ...state, invalidStartDate: action.invalidStartDate}
        case VALID_END_DATE:
            return { ...state, invalidEndDate: action.invalidEndDate}     
        case VALID_FORM:
            return { ...state, validFormData: action.validFormData}
        case SET_RESULT_START_DATE:
            return { ...state, resultStartDate: action.resultStartDate}
        case SET_RESULT_END_DATE:
            return { ...state, resultEndDate: action.resultEndDate}
        case SET_INPUT_FOCUS:
            return { ...state, focusLocation: action.focusLocation}
        case SET_FOCUS_TRANSFER:
            return { ...state, needChangeFocus: action.needChangeFocus}    
        case SET_INPUT_VALIDATION:
            return { ...state, needInputValidation: action.needInputValidation}    
        case SET_FORM_VALIDATION:
            return { ...state, needFormValidation: action.needFormValidation}    
        case UPDATE_DATES:
            return {...state, [action.id]: action.value}      
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}