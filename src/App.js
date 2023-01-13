import React, {
	useContext,
	useEffect,
	useState,
} from "react";

import MainFiveDays from "./components/MainFiveDays";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import "./index.css";
import "./util/util";

import GlobalContext from "./context/GlobalContext";
import { getFiveDays, getMonth } from "./util/util";

function App() {
	const { monthIndex } = useContext(GlobalContext);
	const [currentMonth, setCurrentMonth] = useState(
		getMonth()
	);
	const [currentFiveDays, setCurrentFiveDays] = useState(
		getFiveDays(new Date())
	);

	useEffect(() => {
		setCurrentMonth(monthIndex);
	}, [monthIndex]);

	return (
		<div className='App h-screen flex flex-col'>
			<Navbar />
			<div className='flex flex-1'>
				<Sidebar />
				<MainFiveDays pFiveDays={currentFiveDays} />
				<MainMonth />
			</div>
		</div>
	);
}

export default App;
