import React from "react";
import MainFiveDays from "./components/MainFiveDays";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
	return (
		<div className='App'>
			<Navbar />
			<MainFiveDays />
			{/* <h1 className='underline font-bold`'>Hello World!</h1> */}
		</div>
	);
}

export default App;
