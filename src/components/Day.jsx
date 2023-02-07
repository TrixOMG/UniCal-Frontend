import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";

const Day = ({ pDay, rowIdx }) => {
	const [dayEvents, setDayEvents] = useState([]);
	const { setShowEventModal, setChosenDayForTask, savedEvents } = useGlobalContext();

	useEffect(() => {
		const events = savedEvents.filter(
			(evt) => dayjs(evt.day).format("DD-MM-YY") === pDay.format("DD-MM-YY")
		);
		setDayEvents(events);
	}, [savedEvents, pDay]);

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
				className='flex-1 cursor-pointer pt-5'
				onClick={() => {
					setChosenDayForTask(pDay);
					setShowEventModal(true);
				}}
			>
				{dayEvents.map((evt, idx) => (
					<div
						key={idx}
						className={`bg-${evt.label}-300 p-1 mr-3 text-gray-600 text-sm rounded-lg mb-1 truncate`}
					>
						{evt.title}
					</div>
				))}
			</div>
		</div>
	);
};

export default Day;
