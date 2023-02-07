import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { getMonth, getProperSelectedDays } from "../util/util";

const Calendar = () => {
	// глобальный индекс месяца
	const { monthIndex } = useGlobalContext();
	const { selectedDaysArray, setSelectedDaysArray } = useGlobalContext();

	// индекс текущего месяца
	const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
	// месяц для отображения
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	// единичный выбранный день для сброса длины массива выделенных дней
	const { chosenDay, setChosenDay } = useGlobalContext();
	// трекинг зажатой клавиши мыши для определения дней
	const [isMouseDown, setIsMouseDown] = useState(false);

	useEffect(() => {
		setCurrentMonthIdx(monthIndex);
	}, [monthIndex]);

	useEffect(() => {
		setCurrentMonth(getMonth(currentMonthIdx));
	}, [currentMonthIdx]);

	function handleMonthIndexChangeOnSelectedDays() {
		let pCurrentMonth = getMonth(currentMonthIdx);
		const oneLevelCurrentMonthArray = [];

		pCurrentMonth.map((week) => {
			return week.map((day) => {
				return oneLevelCurrentMonthArray.push(day.format("DD-MM-YY"));
			});
		});

		console.log(oneLevelCurrentMonthArray);
		let pSelDaysArray = [];
		pSelDaysArray = selectedDaysArray;
		// middle day of the selectedDays array
		let middleDayIndex = 0;

		if (pSelDaysArray.length % 2 === 0) middleDayIndex = pSelDaysArray.length / 2 - 1;
		else middleDayIndex = Math.floor(pSelDaysArray.length / 2);
		console.log(pSelDaysArray[middleDayIndex].format("DD-MM-YY"));

		console.log(
			!oneLevelCurrentMonthArray.includes(pSelDaysArray[middleDayIndex].format("DD-MM-YY"))
		);

		if (
			!oneLevelCurrentMonthArray.includes(pSelDaysArray[middleDayIndex].format("DD-MM-YY")) ||
			!oneLevelCurrentMonthArray.includes(pSelDaysArray[0].format("DD-MM-YY"))
		) {
			setCurrentMonthIdx(currentMonthIdx + 1);
		}
		console.log(currentMonthIdx);
	}

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
			return "bg-blue-500 rounded-lg text-white p-1";
		} else {
			return "";
		}
	}

	function getChosenDayClass(day) {
		const sFormat = "DD-MM-YY";
		if (day.format(sFormat) === chosenDay.format(sFormat)) {
			if (day.format(sFormat) === selectedDaysArray[0].format(sFormat)) {
				if (selectedDaysArray.length === 1) return " bg-blue-400 rounded-lg";
				else return " bg-blue-400 rounded-l-lg ";
			} else if (
				day.format(sFormat) === selectedDaysArray[selectedDaysArray.length - 1].format(sFormat)
			) {
				return " bg-blue-400 rounded-r-lg ";
			} else {
				return " bg-blue-400 rounded-lg ";
			}
		} else {
			return "";
		}
	}

	function getSelectedDaysClass(pDay) {
		const sFormat = "DD-MM-YY";
		const pSelDaysArray =
			selectedDaysArray &&
			selectedDaysArray.map((a) => {
				return a.format(sFormat);
			});

		if (pSelDaysArray.length === 1 && pSelDaysArray.includes(pDay.format(sFormat)))
			return "bg-blue-300 rounded-lg";
		else if (pSelDaysArray.includes(pDay.format(sFormat))) {
			// style for the first day in the selected days
			if (
				pSelDaysArray &&
				pDay.format(sFormat) === pSelDaysArray[0] &&
				selectedDaysArray[0].isBefore(selectedDaysArray[selectedDaysArray.length - 1])
			)
				return "bg-blue-200 rounded-l-lg";
			else if (pSelDaysArray && pDay.format(sFormat) === pSelDaysArray[0]) {
				return "bg-blue-200 rounded-r-lg";
			}
			// style for the last day in the selected days
			else if (
				pSelDaysArray &&
				pDay.format(sFormat) === pSelDaysArray[pSelDaysArray.length - 1] &&
				selectedDaysArray[0].isBefore(selectedDaysArray[selectedDaysArray.length - 1])
			)
				return "bg-blue-200 rounded-r-lg";
			else if (pSelDaysArray && pDay.format(sFormat) === pSelDaysArray[pSelDaysArray.length - 1]) {
				return "bg-blue-200 rounded-l-lg";
			}
			// style for every other day in the selected days
			else return "bg-blue-200 rounded-none";
		}
	}

	function handleChangeSelectedDays(pDay) {
		if (isMouseDown) {
			const convertedSelDArr =
				selectedDaysArray &&
				selectedDaysArray.map((day) => {
					return day.format("DD-MM-YY");
				});

			let res = [];

			if (convertedSelDArr.includes(pDay.format("DD-MM-YY"))) {
				res = selectedDaysArray.slice(0, selectedDaysArray.indexOf(pDay));
			} else {
				res = selectedDaysArray.concat(pDay);
			}

			setSelectedDaysArray(getProperSelectedDays(res));
		}
	}

	// TODO: работает нормально, но нужен рефакторинг
	function handleChangeFirstDay(pDay, DaysArrayLength) {
		if (DaysArrayLength <= 1) {
			setSelectedDaysArray([].concat(pDay));
			setChosenDay(pDay);
			// console.log("<=1");
		} else if (DaysArrayLength > 7) {
			if (pDay.format("DD-MM-YY") === chosenDay.format("DD-MM-YY")) {
				setSelectedDaysArray([].concat(chosenDay));
				// console.log(">7");
			} else {
				setChosenDay(pDay);
				setSelectedDaysArray(getProperSelectedDays(pDay, DaysArrayLength));
			}
		} else if (DaysArrayLength <= 7) {
			if (pDay.format("DD-MM-YY") === chosenDay.format("DD-MM-YY")) {
				setSelectedDaysArray([].concat(pDay));
				setChosenDay(pDay);
			} else {
				setChosenDay(pDay);
				// console.log("<=7");
				setSelectedDaysArray(getProperSelectedDays(pDay, DaysArrayLength));
			}
		}
	}

	function handleChronologicalSelectedDays() {
		const chronologicalSelectedDays = selectedDaysArray.sort((a, b) => {
			return a.isAfter(b) ? 1 : -1;
		});

		setSelectedDaysArray(chronologicalSelectedDays);
	}

	return (
		<div className='mt-9'>
			<header className='flex justify-between'>
				<p className='text-gray-500 font-bold'>
					{dayjs(new Date(dayjs().year(), currentMonthIdx - 1)).format("MMMM YYYY")}
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
			<div
				className='grid grid-cols-7 grid-rows-6 px-1 w-full gap-y-[0.25rem]'
				onMouseLeave={() => setIsMouseDown(false)}
			>
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
								className={`w-full ${getSelectedDaysClass(day)}  `}
								onMouseDown={() => {
									setIsMouseDown(true);
									handleChangeFirstDay(day, selectedDaysArray.length);
								}}
								onMouseEnter={() => handleChangeSelectedDays(day)}
								onMouseUp={() => {
									setIsMouseDown(false);
									handleChronologicalSelectedDays();
									handleMonthIndexChangeOnSelectedDays();
								}}
							>
								<div
									className={`text-sm ${getTodayClass(day)} ${getChosenDayClass(
										day
									)} hover:bg-blue-300 hover:rounded-lg p-1`}
								>
									{day.format("D")}
								</div>
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
