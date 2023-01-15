import dayjs from "dayjs";
import React from "react";

const Day = ({ pDay, rowIdx }) => {
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
		</div>
	);
};

export default Day;
