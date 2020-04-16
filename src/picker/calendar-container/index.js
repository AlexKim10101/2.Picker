import React from 'react'
import Calendar from '../calendars/calendar'
import PeriodSideBar from '../period-side-bar/period-side-bar'
import { usePickerState } from '../dates-picker-context'

import {
    START_DATE,
    END_DATE,
    SUBMIT,
} from '../../utils/consts'

export default function CalendarContainer(){
	const {inputFocus} = usePickerState()
	if((inputFocus===START_DATE)||(inputFocus===END_DATE)){
    return(
			<div aria-roledescription="datepicker" id="datepicker">
						<Calendar />					
							
						<PeriodSideBar />
			</div>
		)
	}
	return null
}
