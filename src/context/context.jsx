import dayjs from "dayjs";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { getMonth, getProperSelectedDays } from "../util/util";

function savedEventsReducer(state, { type, payload }) {
	switch (type) {
		case "push":
			return [...state, payload];
		case "update":
			return state.map((evt) => (evt.id === payload.id ? payload : evt));
		case "delete":
			return state.filter((evt) => evt.id !== payload.id);
		default:
			throw new Error("reducerError");
	}
}

function initEvents() {
	const storageEvents = localStorage.getItem("savedEvents");
	let parsedEvents = [];

	if (storageEvents !== null) parsedEvents = JSON.parse(storageEvents);
	else parsedEvents = [];
	return parsedEvents;
}

const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month() + 1);
	const [showSidebar, setShowSidebar] = useState(true);
	const [showEventModal, setShowEventModal] = useState(false);
	const [chosenDayForTask, setChosenDayForTask] = useState(dayjs());

	const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents);

	useEffect(() => {
		localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
	}, [savedEvents]);

	const [selectedDaysArray, setSelectedDaysArray] = useState(getProperSelectedDays([dayjs()]));
	const [chosenDay, setChosenDay] = useState(dayjs());

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
		chosenDayForTask,
		setChosenDayForTask,
		chosenDay,
		setChosenDay,
		dispatchCalEvent,
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
