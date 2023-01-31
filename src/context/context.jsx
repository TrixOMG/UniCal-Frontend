import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth, getProperSelectedDays } from "../util/util";

const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month() + 1);
	const [showSidebar, setShowSidebar] = useState(true);
	const [showEventModal, setShowEventModal] = useState(false);
	const [chosenDay, setChosenDay] = useState(dayjs());

	const [selectedDaysArray, setSelectedDaysArray] = useState(getProperSelectedDays([dayjs()]));

	// const [isMouseDown, setIsMouseDown] = useState(false);

	const value = {
		monthIndex,
		setMonthIndex,
		showSidebar,
		setShowSidebar,
		showEventModal,
		setShowEventModal,
		selectedDaysArray,
		setSelectedDaysArray,
		chosenDay,
		setChosenDay,
		// isMouseDown,
		// setIsMouseDown,
	};

	// useEffect(() => {
	// if (!showEventModal) {
	// setSelectedEvent(null);
	// }
	// }, [showEventModal]);

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};

export { GlobalContext, GlobalContextProvider };
