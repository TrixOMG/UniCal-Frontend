import React from "react";
import Day from "./Day";

const MainFiveDays = ({ pFiveDays }) => {
	return (
		<div className='grid grid-cols-5 w-full grid-rows-1 h-full gap-1 mx-1'>
			{pFiveDays.map((day, idx) => {
				return (
					<Day
						pDay={day}
						key={idx}
						rowIdx={0}
						className='grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-6'
					/>
				);
			})}
		</div>
	);
};

export default MainFiveDays;
