import React from "react";
import Day from "./Day";

const MainMonth = ({ month }) => {
	return (
		<div className='mx-1 flex-1 grid grid-cols-7 grid-rows-5 gap-1'>
			{month.map((row, i) => (
				<React.Fragment key={i}>
					{row.map((day, idx) => (
						<Day pDay={day} key={idx} rowIdx={i} />
					))}
				</React.Fragment>
			))}
		</div>
	);
};

export default MainMonth;
