import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

const Navbar = () => {
	const { monthIndex, setMonthIndex } =
		useContext(GlobalContext);

	return (
		<header className='px-4 py-2 flex items-center'>
			<div className='UniCal_Logo mr-2 w-12 h-12'></div>
			<h1 className='mr-10 text-xl text-gray-500 font-bold'>
				UniCal
			</h1>
			<button className='border rounded py-2 px-4 mr-5'>
				Today
			</button>
			<button>chevron_left</button>
			<button>chevron_right</button>
		</header>
	);
};

export default Navbar;
