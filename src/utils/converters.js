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
    console.log(arguments)
    let monthModificator, 
      monthDateModificator,   
      qurtArr,    
      halfYearArr,   
      yearPreDate;

    let newDate = null;
    let changeIsCorrect = false;
    // let value = dateObj.value;
    // let year = dateObj.year

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
    //console.log('newDate',newDate)
    
    return {verdict: changeIsCorrect, newDate: newDate}
      
}


export function inputValueCreater(dates, input, newValues){
  const datesCopy = Object.assign({}, dates)
  const newInputValues = Object.assign({}, datesCopy[input], newValues)
  return Object.assign({}, datesCopy, {[input]:newInputValues})
}


export function maskQualifier(dates, id, inputFocus){
  switch (dates[id].period) {
    case DAY:
    case WEEK: {
      if((dates[id].inputValue === '')&&(id !== inputFocus)){
        return ''
      }
      return "99.99.9999"
    }
    case HALFYEAR:{
      if((dates[id].inputValue === '')&&(id !== inputFocus)){
        return ''
      }
      return "9-ое полугодие"
    }
    default: return ''
  }

}

// DAY,
//     WEEK,
//     MONTH,
//     QUARTER,
//     HALFYEAR,
//     YEAR
// function preChecking(value, period){
//   switch(period){
//     case YEAR:{
//       if(value < 1000) return false;
//       console.log('preChecking YEAR', '01.01.'+value)
//       return dateValidation('01.01.'+value)
//     }

//     default: return false
//   }
// }