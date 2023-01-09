import React, {
	//useContext,
	//useEffect,
	useState,
} from "react";

import MainFiveDays from "./components/MainFiveDays";
import Navbar from "./components/Navbar";
import "./index.css";
import "./util/util";

import { getFiveDays } from "./util/util";

function App() {
	const [currentFiveDays, setCurrentFiveDays] = useState(
		getFiveDays(new Date())
	);
	return (
		<div className='App h-screen flex flex-col'>
			<Navbar />
			<div className='flex-1'>
				<MainFiveDays pFiveDays={currentFiveDays} />
			</div>
		</div>
	);
}

export default App;
