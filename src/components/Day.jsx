import dayjs from "dayjs";
import React, { useState } from "react";
import { useGlobalContext } from "../context/context";

const Day = ({ pDay, rowIdx }) => {
	const [dayEvents, setDayEvents] = useState([]);
	const { setShowEventModal, setChosenDay } = useGlobalContext();

	function getAccentOnToday() {
		console.table();
		if (dayjs(pDay).format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
			return "bg-blue-600 text-white rounded-lg";
		} else {
			return "";
		}
	}

	return (
		<div className='border border-gray-200 flex flex-col h-full rounded-lg'>
			<header className='flex flex-col items-center h-10'>
				{rowIdx === 0 && <p className='text-sm mt-1'>{dayjs(pDay).format("ddd").toUpperCase()}</p>}
				<p className={`text-sm mt-1 w-7 h-7 text-center p-1 ${getAccentOnToday()}`}>
					{dayjs(pDay).date()}
				</p>
			</header>
			<div
				className='flex-1 cursor-pointer'
				onClick={() => {
					setChosenDay(pDay);
					setShowEventModal(true);
				}}
			></div>
		</div>
	);
};

export default Day;
