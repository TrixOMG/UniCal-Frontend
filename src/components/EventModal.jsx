import React, { useState } from "react";
import { useGlobalContext } from "../context/context";

const EventModal = () => {
	const { setShowEventModal, chosenDay } = useGlobalContext();
	const [title, setTitle] = useState("");

	return (
		<div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center'>
			<form className='bg-white rounded-lg shadow-2xl w-1/4'>
				<header className='bg-gray-100 px-4 py-2 flex justify-between items-center'>
					<span className='material-icons text-gray-400 cursor-move'>drag_handle</span>
					<button type='button'>
						<span className='material-icons text-gray-400' onClick={() => setShowEventModal(false)}>
							close
						</span>
					</button>
				</header>
				<div className='p-3'>
					<div className='gird- grid-cols-1 grid-rows-5 items-end gap-y-7'>
						<div></div>
						<input
							type='text'
							name='title'
							placeholder='Add Title'
							required
							className='pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<span className='material-icons text-gray-400'>schedule</span>
						<p>{chosenDay.format("dddd, MMMM DD")}</p>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EventModal;
