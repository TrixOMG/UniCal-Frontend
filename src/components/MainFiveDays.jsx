import React from "react";
import Day from "./Day";

const MainFiveDays = ({ pFiveDays }) => {
	return (
		<div className='grid grid-cols-5 w-full grid-rows-1 h-full'>
			{pFiveDays.map((day, idx) => {
				return <Day pDay={day} key={idx} />;
			})}
		</div>
	);
};

export default MainFiveDays;
