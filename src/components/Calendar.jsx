import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { getMonth } from "../util/util";

const Calendar = () => {
	const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
	const [currentMonth, setCurrentMonth] = useState(getMonth());

	const { monthIndex } = useGlobalContext();

	useEffect(() => {
		setCurrentMonthIdx(monthIndex);
	}, [monthIndex]);

	useEffect(() => {
		setCurrentMonth(getMonth(currentMonthIdx));
	}, [currentMonthIdx]);

	function handlePrevMonth() {
		setCurrentMonthIdx(currentMonthIdx - 1);
	}

	function handleNextMonth() {
		setCurrentMonthIdx(currentMonthIdx + 1);
	}

	function getTodayClass(day) {
		const sFormat = "DD-MM-YY";
		const today = dayjs().format(sFormat);
		const currDay = day.format(sFormat);
		if (today === currDay) {
			return "bg-blue-500 rounded-lg text-white";
		} else {
			return "";
		}
	}

	let selectedDayClass = {};

	// function changeSelectedDayClass(day) {
	// const sFormat = "DD-MM-YY";
	//
	// if (selectedDaysArray.includes(day.format(sFormat))) {
	// return "bg-blue-200 text-white";
	// } else {
	// return "";
	// }
	// }

	// const [isMouseDown, setIsMouseDown] = useState(false);
	const { selectedDaysArray, setSelectedDaysArray } = useGlobalContext();

	function handleChangeSelectedDays(pDay) {
		if (selectedDaysArray.length < 2) {
			let res = selectedDaysArray;
			setSelectedDaysArray(res.concat(pDay.format("DD-MM-YY")));
		} else {
			setSelectedDaysArray([].concat(pDay.format("DD-MM-YY")));
		}
	}

	// function getSelectedDayClass(pDay, pSelectedDaysArray) {
	// if (pSelectedDaysArray === []) return "";
	//
	// if (pDay.format("DD-MM-YY") === pSelectedDaysArray[0].format("DD-MM-YY"))
	// return "rounded-full bg-blue-200";
	// else return "";
	// }

	// useEffect(() => {
	// getSelectedDayClass(selectedDaysArray);
	// }, [selectedDaysArray]);

	return (
		<div className='mt-9'>
			<header className='flex justify-between'>
				<p className='text-gray-500 font-bold'>
					{dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
				</p>
				<div>
					<button onClick={handlePrevMonth}>
						<span className='material-icons cursor-pointer text-gray-600 mx-2'>chevron_left</span>
					</button>
					<button onClick={handleNextMonth}>
						<span className='material-icons cursor-pointer text-gray-600 mx-2'>chevron_right</span>
					</button>
				</div>
			</header>
			<div className='grid grid-cols-7 grid-rows-6 px-1 w-full'>
				{currentMonth[0].map((day, i) => (
					<span key={i} className='text-sm py-0.5 text-center'>
						{day.format("dd").charAt(0)}
					</span>
				))}
				{currentMonth.map((row, i) => (
					<React.Fragment key={i}>
						{row.map((day, idx) => (
							<button
								key={idx}
								className={`py-[0.1em] w-full ${getTodayClass(day)} `}
								onMouseDown={() => handleChangeSelectedDays(day)}
								onMouseUp={() => handleChangeSelectedDays(day)}
								style={{ selectedDayClass }}
							>
								<span className='text-sm'>{day.format("D")}</span>
							</button>
						))}
					</React.Fragment>
				))}
			</div>
		</div>
	);
};

export default Calendar;

// import dayjs from "dayjs";
// import React, { useEffect, useState } from "react";
// import { useGlobalContext } from "../context/context";
// import { getMonth } from "../util/util";

// const Calendar = () => {
// 	const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
// 	const [currentMonth, setCurrentMonth] = useState(getMonth());

// 	const { monthIndex } = useGlobalContext();

// 	useEffect(() => {
// 		setCurrentMonthIdx(monthIndex);
// 	}, [monthIndex]);

// 	useEffect(() => {
// 		setCurrentMonth(getMonth(currentMonthIdx));
// 	}, [currentMonthIdx]);

// 	function handlePrevMonth() {
// 		setCurrentMonthIdx(currentMonthIdx - 1);
// 	}

// 	function handleNextMonth() {
// 		setCurrentMonthIdx(currentMonthIdx + 1);
// 	}

// 	function getTodayClass(day) {
// 		const sFormat = "DD-MM-YY";
// 		const today = dayjs().format(sFormat);
// 		const currDay = day.format(sFormat);
// 		if (today === currDay) {
// 			return "bg-blue-500 rounded-lg text-white";
// 		} else {
// 			return "";
// 		}
// 	}

// 	let selectedDayClass = {};

// 	function changeSelectedDayClass(day) {
// 		const sFormat = "DD-MM-YY";

// 		if (selectedDaysArray.includes(day.format(sFormat))) {
// 			return "bg-blue-200 text-white";
// 		} else {
// 			return "";
// 		}
// 	}

// 	const [isMouseDown, setIsMouseDown] = useState(false);
// 	const [selectedDaysArray, setSelectedDaysArray] = useState([]);

// 	function handleChangeSelectedDays(pDay) {
// 		if (isMouseDown) {
// 			// console.log(pDay);
// 			// setSelectedDaysArray(new Set([...selectedDaysArray, pDay.format("DD-MM-YY")]));
// 			let res = selectedDaysArray;
// 			res.push(pDay.format("DD-MM-YY"));
// 			setSelectedDaysArray(new Set(res));
// 		}
// 	}

// 	function handleChangeSelDaysOnSingleClick(pDay) {
// 		// setSelectedDaysArray([]);
// 		let res = new Array(pDay.format("DD-MM-YY"));
// 		setSelectedDaysArray(res);
// 	}

// 	return (
// 		<div className='mt-9'>
// 			<header className='flex justify-between'>
// 				<p className='text-gray-500 font-bold'>
// 					{dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
// 				</p>
// 				<div>
// 					<button onClick={handlePrevMonth}>
// 						<span className='material-icons cursor-pointer text-gray-600 mx-2'>chevron_left</span>
// 					</button>
// 					<button onClick={handleNextMonth}>
// 						<span className='material-icons cursor-pointer text-gray-600 mx-2'>chevron_right</span>
// 					</button>
// 				</div>
// 			</header>
// 			<div className='grid grid-cols-7 grid-rows-6 px-1 w-full'>
// 				{currentMonth[0].map((day, i) => (
// 					<span key={i} className='text-sm py-0.5 text-center'>
// 						{day.format("dd").charAt(0)}
// 					</span>
// 				))}
// 				{currentMonth.map((row, i) => (
// 					<React.Fragment key={i}>
// 						{row.map((day, idx) => (
// 							<button
// 								key={idx}
// 								className={`py-[0.1em] w-full ${getTodayClass(day)} }`}
// 								onMouseDown={() => {
// 									setIsMouseDown(true);
// 									handleChangeSelDaysOnSingleClick(day);
// 								}}
// 								onMouseUp={() => setIsMouseDown(false)}
// 								onMouseEnter={() => handleChangeSelectedDays(day)}
// 								style={selectedDayClass}
// 							>
// 								<span className='text-sm'>{day.format("D")}</span>
// 							</button>
// 						))}
// 					</React.Fragment>
// 				))}
// 			</div>
// 		</div>
// 	);
// };

// export default Calendar;
