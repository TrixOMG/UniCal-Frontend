import dayjs from "dayjs";
import React, { useContext, useState } from "react";

const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
	const [monthIndex, setMonthIndex] = useState(dayjs().month());
	const [showSidebar, setShowSidebar] = useState(false);

	function toggleShowSidebar(parameter) {
		setShowSidebar(!parameter);
	}

	const value = { monthIndex, setMonthIndex, showSidebar, toggleShowSidebar };

	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => {
	return useContext(GlobalContext);
};

export { GlobalContext, GlobalContextProvider };
