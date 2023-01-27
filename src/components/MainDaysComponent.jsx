import React, { useEffect, useReducer, useState } from "react";
import { useGlobalContext } from "../context/context";
import { getMonth, getProperTimespanInMain } from "../util/util";
import Day from "./Day";

const MainDaysComponent = ({ timeSpan }) => {
	const { isMouseDown } = useGlobalContext();
	const [properTimespan, setProperTimespan] = useReducer(,getMonth());

	// понадобится useReducer???
	useReducer(() => {
		setProperTimespan(getProperTimespanInMain(timeSpan));
	}, [isMouseDown]);

	return (
		<div className='mx-1 flex-1 grid grid-cols-7 grid-rows-5 gap-1'>
			{properTimespan.map((row, i) => (
				<React.Fragment key={i}>
					{row.map((day, idx) => (
						<Day pDay={day} key={idx} rowIdx={i} />
					))}
				</React.Fragment>
			))}
		</div>
	);
};

export default MainDaysComponent;
