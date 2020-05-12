import { 
    steps, 
    months,
    monthsFull,
    quarters,
    halfYear,    
    START_DATE,
    END_DATE,
    MONTH_MODIFICATOR_FOR_START,
    MONTH_MODIFICATOR_FOR_END,
    DATE_MONTH_MODIFICATOR_FOR_START,
    DATE_MONTH_MODIFICATOR_FOR_END,
    QUART_VALUES_FOR_START,
    QUART_VALUES_FOR_END,
    HALF_YEAR_VALUES_FOR_START,
    HALF_YEAR_VALUES_FOR_END,
    YEAR_VALUE_FOR_START,
    YEAR_VALUE_FOR_END,
  } from './consts'

  const [
    DAY,
    WEEK,
    MONTH,
    QUARTER,
    HALFYEAR,
    YEAR
  ] = steps
export function dateCreater(string){
	let arrD = string.split(".");
  arrD[1] -= 1;
  return new Date(arrD[2], arrD[1], arrD[0]);
}

export function dateValidation(value){
  if(typeof(value)!=='string') return false
	let arrD = value.split(".");
  arrD[1] -= 1;
  let d = new Date(arrD[2], arrD[1], arrD[0]);
  if ((value.length == 10) && (d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
    return true;
  } else {    
    return false;
  }
}

export function inputValueValidation(fieldName, value, year, period){
    //console.log(arguments)
    let monthModificator, 
      monthDateModificator,   
      qurtArr,    
      halfYearArr,   
      yearPreDate;

    let newDate = null;
    let changeIsCorrect = false;
    

    if(fieldName == START_DATE){
      monthModificator = MONTH_MODIFICATOR_FOR_START
      monthDateModificator = DATE_MONTH_MODIFICATOR_FOR_START
      qurtArr = QUART_VALUES_FOR_START;
      halfYearArr = HALF_YEAR_VALUES_FOR_START;      
      yearPreDate = YEAR_VALUE_FOR_START;

    }

    if(fieldName == END_DATE){
      monthModificator = MONTH_MODIFICATOR_FOR_END;
      monthDateModificator = DATE_MONTH_MODIFICATOR_FOR_END;
      qurtArr = QUART_VALUES_FOR_END;
      halfYearArr = HALF_YEAR_VALUES_FOR_END;
      yearPreDate = YEAR_VALUE_FOR_END;
    }

    

    switch(period){
      case DAY :
      case WEEK: {        
        if(dateValidation(value)){
          newDate = dateCreater(value)
          changeIsCorrect = true;

        }
        break;
      }
      case MONTH :{
        if(months.includes(value)){       
          newDate = new Date( new Date(year, months.indexOf(value)+monthModificator, 1) - monthDateModificator)
          changeIsCorrect = true;
            

        }       

        if(monthsFull.includes(value)){  
          newDate = new Date( new Date(year, monthsFull.indexOf(value)+monthModificator, 1) - monthDateModificator)    
          changeIsCorrect = true;
        }
        
        break;
      }
      case QUARTER :{
        if(quarters.includes(value)){          
          const qurtIndex = quarters.indexOf(value)
          const blank = qurtArr[qurtIndex] + year;
          newDate = dateCreater(blank);
          changeIsCorrect = true;
        }            
        break;
      }

      case HALFYEAR :{
        if(halfYear.includes(value)){
          const halfYearIndex = halfYear.indexOf(value)
          const blank = halfYearArr[halfYearIndex] + year;
          newDate = dateCreater(blank)
          changeIsCorrect = true;

        }             
        break;
      }

      case YEAR:{
        if(dateValidation(yearPreDate + value)){
          newDate = dateCreater(yearPreDate + value)
          changeIsCorrect = true;
        }
      }
    }
    
    return {verdict: changeIsCorrect, newDate: newDate}
      
}


export function inputValueCreater(dates, input, newValues){
  const datesCopy = Object.assign({}, dates)
  const newInputValues = Object.assign({}, datesCopy[input], newValues)
  return Object.assign({}, datesCopy, {[input]:newInputValues})
}


export function maskQualifier(id, inputValue, focusLocation, period){
  switch (period) {
    case DAY:
    case WEEK: {
      if((inputValue === '')&&(id !== focusLocation)){
        return ''
      }
      return "99.99.9999"
    }
    case HALFYEAR:{
      if((inputValue === '')&&(id !== focusLocation)){
        return ''
      }
      return "9-ое полугодие"
    }
    default: return ''
  }

}

export function formatDate(date) {

  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;

  let mm = date.getMonth() + 1;
  if (mm < 10) mm = '0' + mm;

  let yy = date.getFullYear() ;

  return dd + '.' + mm + '.' + yy;
}


export function createInputValue(x, location, calendarType, year, month){
  let indexDayOfWeek = location===START_DATE? 0 : 6
  let value
  // if(focusLocation == START_DATE){      
  //   indexDayOfWeek = 0;
  // }
  // if(focusLocation == END_DATE){      
  //   indexDayOfWeek = 6;
  // }  

  switch (calendarType){
    case DAY:{
      let correctMonth = month;
      if(x.status === 'out'){
        correctMonth = x.date > 7 ? correctMonth-1 : correctMonth+1;
      }
      const monthString = correctMonth > 8 ? String(correctMonth + 1) : ('0' + String(correctMonth+1))
      const dayString = x.date > 9 ? String(x.date) : ('0' + String(x.date))
      value = dayString + '.' + monthString + '.' + year        
      break; 
    }

    case WEEK:{
      const correctDay = x[indexDayOfWeek];
      let correctMonth = month;
      if(correctDay.status === 'out'){
        correctMonth = correctDay.date > 7 ? correctMonth-1 : correctMonth+1;
      }
      const monthString = correctMonth > 8 ? String(correctMonth + 1) : ('0' + String(correctMonth+1))
      const dayString = correctDay.date > 9 ? String(correctDay.date) : ('0' + String(correctDay.date))
      value = dayString + '.' + monthString + '.' + year        
      break; 
    }

    case MONTH:
    case QUARTER:
    case HALFYEAR:
    case YEAR: {
      value = x
      break; 
    }
  }

  return value
}

