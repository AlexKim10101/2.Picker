import { 
    steps, 
    days,
    months,
    monthsFull,
    quarters,
    halfYear,
    CHANGE_CALENDAR_TYPE,
    SET_INPUT_FOCUS,
    START_DATE,
    END_DATE,
    CHANGE_START_DATE,
    CHANGE_END_DATE, 
    VALID_START_DATE,
    VALID_END_DATE,  
    VALID_FORM,
    SET_RESULT_START_DATE,
    SET_RESULT_END_DATE,
    SET_FOCUS_TRANSFER,
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
	let arrD = value.split(".");
  arrD[1] -= 1;
  let d = new Date(arrD[2], arrD[1], arrD[0]);
  if ((value.length == 10) && (d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0])) {
    return true;
  } else {    
    return false;
  }
}

export function inputValueValidation(fieldName, dateObj, period){
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
        if(dateValidation(dateObj.value)){
          newDate = dateCreater(dateObj.value)
          changeIsCorrect = true;

        }
        break;
      }
      case MONTH :{
        if(months.includes(dateObj.value)){       
          newDate = new Date( new Date(dateObj.year, months.indexOf(dateObj.value)+monthModificator, 1) - monthDateModificator)
          changeIsCorrect = true;
            

        }       

        if(monthsFull.includes(dateObj.value)){  
          newDate = new Date( new Date(dateObj.year, monthsFull.indexOf(dateObj.value)+monthModificator, 1) - monthDateModificator)    
          changeIsCorrect = true;
        }
        
        break;
      }
      case QUARTER :{
        if(quarters.includes(dateObj.value)){          
          const qurtIndex = quarters.indexOf(dateObj.value)
          const blank = qurtArr[qurtIndex] + dateObj.year;
          newDate = dateCreater(blank);
          changeIsCorrect = true;
        }            
        break;
      }

      case HALFYEAR :{
        if(halfYear.includes(dateObj.value)){
          const halfYearIndex = halfYear.indexOf(dateObj.value)
          const blank = halfYearArr[halfYearIndex] + dateObj.year;
          newDate = dateCreater(blank)
          changeIsCorrect = true;

        }             
        break;
      }

      case YEAR:{
        if(dateValidation(yearPreDate + dateObj.value)){
          newDate = dateCreater(yearPreDate + dateObj.value)
          changeIsCorrect = true;
        }
      }
    }
    //console.log('newDate',newDate)
    
    return {verdict: changeIsCorrect, newDate: newDate}
      
}


export function inputValueCreater(dates, input, newValues){
  const datesCopy = Object.assign({}, dates)
  const newInputValues = Object.assign({}, datesCopy[input], newValues)
  return Object.assign({}, datesCopy, {[input]:newInputValues})
}