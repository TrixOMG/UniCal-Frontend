import React, { useContext, useEffect, useState } from "react";

import EventModal from "./components/EventModal";
import MainDaysComponent from "./components/MainDaysComponent";
// import MainFiveDays from "./components/MainFiveDays";
// import MainMonth from "./components/MainMonth";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { GlobalContext, useGlobalContext } from "./context/context";
import "./index.css";
import "./util/util";

// import GlobalContext from "./context/GlobalContext";
// import { getFiveDays, getMonth } from "./util/util";

function App() {
	// let showMainMonth = true;
	// let showFiveDays = false;

	const { showSidebar, showEventModal, monthIndex, selectedDaysArray } = useGlobalContext();

	// const [currentMonth, setCurrentMonth] = useState(getMonth());
	// const [currentFiveDays, setCurrentFiveDays] = useState(getFiveDays(new Date()));

	// useEffect(() => {
	// setCurrentMonth(getMonth(monthIndex));
	// }, [monthIndex]);

	return (
		<>
			{showEventModal && <EventModal />}

			<div className='App h-screen flex flex-col'>
				<Navbar />
				<div className='flex flex-1 p-1'>
					{showSidebar && <Sidebar />}
					<MainDaysComponent timeSpan={selectedDaysArray} />
					{/* {showFiveDays && <MainFiveDays pFiveDays={currentFiveDays} />} */}
					{/* {showMainMonth && <MainMonth month={currentMonth} />} */}
				</div>
			</div>
		</>
	);
}

export default App;
