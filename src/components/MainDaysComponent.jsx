import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { getMonth, getProperTimespanInMain } from "../util/util";
import Day from "./Day";

const MainDaysComponent = ({ timeSpan }) => {
	const [properTimespan, setProperTimespan] = useState(getMonth(dayjs().month()));
	const { selectedDaysArray } = useGlobalContext();

	useEffect(() => {
		if (timeSpan.length > 0) setProperTimespan(getProperTimespanInMain(timeSpan));
	}, [timeSpan]);

	// fix bug with view
	function getDaysGridClasses() {
		let rowsClass = "grid-rows-";
		let colsClass = "grid-cols-";

		if (selectedDaysArray.length <= 7) {
			rowsClass += 1;
			colsClass += selectedDaysArray.length;
		} else if (selectedDaysArray.length > 7) {
			rowsClass += selectedDaysArray.length / 7;
		}

		return rowsClass + " " + colsClass;
	}

	return (
		<div
			className={`mx-1 flex-1 grid gap-1 ${
				timeSpan.length > 0 ? getDaysGridClasses() : "grid-cols-7 grid-rows-5"
			}`}
		>
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
