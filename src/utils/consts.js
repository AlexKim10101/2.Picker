export const steps = ['day', 'week', 'month', 'quarter', 'halfyear', 'year']
export const stepsLabels = ['День', 'Неделя', 'Месяц', 'Квартал', 'Полугодие', 'Год']
const [
  DAY,
  WEEK,
  MONTH,
  QUARTER,
  HALFYEAR,
  YEAR
] = steps


export const calendarTypes = ['day', 'month', 'quarter', 'halfyear', 'year']

export const CHANGE_YEAR = 'CHANGE_YEAR'
export const CHANGE_MONTH = 'CHANGE_MONTH'
export const CHANGE_STEP = 'CHANGE_STEP'
export const CHANGE_PERIOD = 'CHANGE_PERIOD'
export const CHANGE_CALENDAR_TYPE = 'CHANGE_CALENDAR_TYPE'
export const CHANGE_START_DATE = 'CHANGE_START_DATE'
export const CHANGE_END_DATE = 'CHANGE_END_DATE'
export const VALID_START_DATE = 'VALID_START_DATE'
export const VALID_END_DATE = 'VALID_END_DATE'
export const VALID_FORM = 'VALID_FORM'
export const SET_RESULT_START_DATE = 'SET_RESULT_START_DATE'
export const SET_RESULT_END_DATE = 'SET_RESULT_END_DATE'
export const SET_INPUT_FOCUS = 'SET_INPUT_FOCUS'
export const SET_FOCUS_TRANSFER = 'SET_FOCUS_TRANSFER'
export const UPDATE_DATES = 'UPDATE_DATES'
export const SET_INPUT_VALIDATION = 'SET_INPUT_VALIDATION'
export const SET_FORM_VALIDATION = 'SET_FORM_VALIDATION'
export const NEED_INPUTS_REVERSE = 'NEED_INPUTS_REVERSE'

export const START_DATE = 'startDate'
export const END_DATE = 'endDate'
export const SUBMIT = 'submit'

export const MASKS = {
  [DAY]:"99.99.9999",
  [WEEK]:"99.99.9999",
  [MONTH]:"",
  [QUARTER]:"",
  [HALFYEAR]:"9-ое полугодие",
  [YEAR]: "9999"
}

export const INPUTS_PLACEHOLDERS = {
  [DAY]:"дд.мм.гггг",
  [WEEK]:"дд.мм.гггг",
  [MONTH]:"мес",
  [QUARTER]:"№кв.",
  [HALFYEAR]:"№полугодия",
  [YEAR]: "год"
}

export const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export const months = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек']
export const monthsFull = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
export const quarters = ['I кв.', 'II кв.', 'III кв.', 'IV кв.']
export const halfYear = ['1-ое полугодие', '2-ое полугодие']

export const dayStatus = {
  curr: 'curr',
  out: 'out',
}

export const MONTH_MODIFICATOR_FOR_START = 0;
export const MONTH_MODIFICATOR_FOR_END = 1;
export const DATE_MONTH_MODIFICATOR_FOR_START = 0;
export const DATE_MONTH_MODIFICATOR_FOR_END = 3600 * 24 * 1000;
export const QUART_VALUES_FOR_START = ['01.01.', '01.04.', '01.07.','01.10.'];
export const QUART_VALUES_FOR_END = ['31.03.', '30.06.', '30.09.','31.12.'];
export const HALF_YEAR_VALUES_FOR_START = ['01.01.', '01.07.'];
export const HALF_YEAR_VALUES_FOR_END = ['30.06.','31.12.'];
export const YEAR_VALUE_FOR_START = '01.01.';
export const YEAR_VALUE_FOR_END = '31.12.';

class PureDate{
  constructor(name) {
    this.name = name;
    this.selectedValuesStr = {startDate: '', endDate: ''};
    this.visibleValuesStr = {startDate: '', endDate: ''};
    this.selectedValuesDateFormat = {startDate: null, endDate: null};
    this.visibleValuesDateFormat = {startDate: null, endDate: null};
  }
  
}

export const PURE_END_DATE = new PureDate(END_DATE)
export const PURE_START_DATE = new PureDate(START_DATE)