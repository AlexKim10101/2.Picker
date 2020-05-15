import {
  months,
  quarters,
  halfYear,
  dayStatus,
} from './consts'

const { curr, out } = dayStatus





export const generateDays = (firstDay, weeksAmount, daysInMonth, forepart) => {
  //console.log(firstDay, weeksAmount, daysInMonth, forepart)
  let date = 1
  const data = []
  for (let i = 0; i < weeksAmount; i += 1) {
    const week = []
    for (let j = 0; j < 7; j += 1) {
      if (i === 0 && j < firstDay) {
        week.push({ date: forepart[j], status: out })
      }
      else if (date > daysInMonth) {
        week.push({ date: date - daysInMonth, status: out })
        date += 1
      }
      else {
        week.push({ date, status: curr })
        date += 1
      }
    }
    data.push(week)
  }
  return data
}


const splitted = (dataToSplit, splittedColumns) => {
  const data = []
  for (let i = 0; i < 3; i += 1) {
    const chunk = dataToSplit.slice(i * splittedColumns, i * splittedColumns + splittedColumns);
    data.push(chunk)
  }
  return data
}


export const generateMonths = splitted(months, 4)
export const generateQuarters = splitted(quarters, 2)
export const generateHalfYears = splitted(halfYear, 1)
export const generateYears = (yearStack) => splitted(yearStack, 4)
