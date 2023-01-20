import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { getMonth } from "../util/util";

const Calendar = () => {
	const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
	const [currentMonth, setCurrentMonth] = useState(getMonth());

	useEffect(() => {
		setCurrentMonth(getMonth(currentMonthIdx));
	}, [currentMonthIdx]);

	return (
		<div className='mt-9'>
			<header className='flex justify-between'>
				<p className='text-gray-500 font-bold'>
					{dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
				</p>
				<button>
					<span className='material-icons cursor-pointer text-gray-600 mx-2'>chevron_left</span>
				</button>
				<button>
					<span className='material-icons cursor-pointer text-gray-600 mx-2'>chevron_right</span>
				</button>
			</header>
		</div>
	);
};

export default Calendar;
