import React from "react";
import Calendar from "./Calendar";
import CreateTaskButton from "./CreateTaskButton";
import Groups from "./Groups";

const Sidebar = () => {
	return (
		<aside className='border p-5 w-64'>
			<CreateTaskButton />
			<Calendar />
			<Groups />
		</aside>
	);
};
export default Sidebar;
