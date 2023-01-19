import dayjs from "dayjs";
import React, { useState } from "react";
import { getMonth } from "../util/util";

const Calendar = () => {
	// const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
	// const [currentMonth, setCurrentMonth] = useState(getMonth());

	return (
		<div className='mt-9'>
			<header className='flex justify-between'>
				<p className='text-gray-500 font-bold'>
				{/* {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")} */}
				</p>
			</header>
		</div>
	);
};

export default Calendar;
