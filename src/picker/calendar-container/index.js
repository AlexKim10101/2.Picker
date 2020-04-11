import React from 'react'
import Calendar from '../calendars/calendar'
import PeriodSideBar from '../period-side-bar/period-side-bar'

import {
    START_DATE,
    END_DATE,
    SUBMIT,
} from '../../utils/consts'

export default function CalendarContainer(){
    return(
			<div aria-roledescription="datepicker" >
						<Calendar />
							
							
						<PeriodSideBar />
			</div>


    )
}
