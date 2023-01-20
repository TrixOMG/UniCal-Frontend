import React from "react";

const CreateTaskButton = () => {
	return (
		<button className='border p-2 rounded-full flex items-center shadow-md hover:shadow'>
			<div className='w-7 h-7'>IC</div>
			<span className='pl-3 pr-7'>Create</span>
		</button>
	);
};

export default CreateTaskButton;
