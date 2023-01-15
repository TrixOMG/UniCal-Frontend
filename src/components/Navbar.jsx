import React, { useState } from "react";
import { useGlobalContext } from "../context/context";

const Navbar = () => {
	const { showSidebar, toggleShowSidebar } = useGlobalContext();

	return (
		<header className='px-4 py-2 flex items-center align-middle'>
			<div
				className='material-symbols-outlined px-1 py-1 cursor-pointer w-8 h-8 block'
				onClick={() => toggleShowSidebar(showSidebar)}
			>
				menu
			</div>
			<div className='UniCal_Logo mr-1 w-12 h-12'></div>
			<h1 className='mr-10 text-xl text-gray-500 font-bold'>UniCal</h1>
			<button className='border rounded py-2 px-4 mr-5'>Today</button>
			<button className='px-1 py-1 cursor-pointer w-8 h-8 block'>
				<span className='material-icons'>chevron_left</span>
			</button>
			<button className='px-1 py-1 cursor-pointer w-8 h-8 block'>
				<span className='material-icons'>chevron_right</span>
			</button>
		</header>
	);
};

export default Navbar;
