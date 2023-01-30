import dayjs from "dayjs";
import React from "react";
import { useGlobalContext } from "../context/context";
import { getProperSelectedDays } from "../util/util";

const Navbar = () => {
	const {
		showSidebar,
		setShowSidebar,
		selectedDaysArray,
		setSelectedDaysArray,
		monthIndex,
		setMonthIndex,
	} = useGlobalContext();

	function handleNextTimespanChange() {
		let lastDayOfTheArray = null;
		let newFirstDay = null;

		newFirstDay = dayjs();
		setSelectedDaysArray(getProperSelectedDays(newFirstDay, selectedDaysArray.length));
		lastDayOfTheArray = selectedDaysArray[selectedDaysArray.length - 1];
		newFirstDay = dayjs(
			new Date(lastDayOfTheArray.year(), lastDayOfTheArray.month(), lastDayOfTheArray.date() + 1)
		);
		// console.log(newFirstDay);

		setSelectedDaysArray(getProperSelectedDays(newFirstDay, selectedDaysArray.length));
	}

	function handlePrevTimespanChange() {
		let firstDayOfTheArray = selectedDaysArray[0];
		let newFirstDay = dayjs(
			new Date(
				firstDayOfTheArray.year(),
				firstDayOfTheArray.month(),
				firstDayOfTheArray.date() - selectedDaysArray.length
			)
		);
		// console.log(newFirstDay);
		setSelectedDaysArray(getProperSelectedDays(newFirstDay, selectedDaysArray.length));
	}

	function handleResetToday() {
		// setMonthIndex(monthIndex === dayjs().month() ? monthIndex + Math.random() : dayjs().month());
	}

	return (
		<header className='px-4 py-2 flex items-center align-middle border rounded-lg rounded-t-none mx-1'>
			<div
				className='material-symbols-outlined px-1 py-1 cursor-pointer w-8 h-8 block'
				onClick={() => setShowSidebar(!showSidebar)}
			>
				menu
			</div>
			<div className='UniCal_Logo mr-1 w-12 h-12'></div>
			<h1 className='mr-10 text-xl text-gray-500 font-bold'>UniCal</h1>
			<button className='border rounded py-2 px-4 mr-5' onClick={handleResetToday}>
				Today
			</button>
			<button className='px-1 py-1 cursor-pointer w-8 h-8 block' onClick={handlePrevTimespanChange}>
				<span className='material-icons'>chevron_left</span>
			</button>
			<button className='px-1 py-1 cursor-pointer w-8 h-8 block' onClick={handleNextTimespanChange}>
				<span className='material-icons'>chevron_right</span>
			</button>
			<h2 className=' ml-4 text-xl text-gray-500 font-bold'>
				{/* TODO: переделать под отображение нескольких месяцев в зависимости от выбранных дней */}
				{/* {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")} */}
			</h2>
		</header>
	);
};

export default Navbar;
