import React, { useContext, useEffect, useState } from "react";

import MainFiveDays from "./components/MainFiveDays";
import MainMonth from "./components/MainMonth";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { GlobalContext, useGlobalContext } from "./context/context";
import "./index.css";
import "./util/util";

// import GlobalContext from "./context/GlobalContext";
import { getFiveDays, getMonth } from "./util/util";

function App() {
	let showMainMonth = false;
	let showFiveDays = true;

	const { showSidebar } = useGlobalContext();
	const [currentMonth, setCurrentMonth] = useState(getMonth());
	const [currentFiveDays, setCurrentFiveDays] = useState(getFiveDays(new Date()));

	// useEffect(() => {
	// setCurrentMonth(getMonth(monthIndex));
	// }, [monthIndex]);

	return (
		<div className='App h-screen flex flex-col'>
			<Navbar />
			<div className='flex flex-1'>
				{showSidebar && <Sidebar />}
				{showFiveDays && <MainFiveDays pFiveDays={currentFiveDays} />}
				{showMainMonth && <MainMonth month={currentMonth} />}
			</div>
		</div>
	);
}

export default App;
