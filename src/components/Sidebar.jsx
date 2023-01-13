import React from "react";
import Calendar from "./Calendar";
import Groups from "./Groups";

const Sidebar = () => {
	return (
		<aside className='border p-5 w-64'>
			<Calendar />
			<Groups />
		</aside>
	);
};
export default Sidebar;
