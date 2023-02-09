import React from "react";
// import { useGlobalContext } from "../context/context";

const Event = ({ pEvent }) => {
	// const { showEventModal, setShowEventModal } = useGlobalContext();
	return (
		<div
			className={`bg-${pEvent.label}-300 p-1 mr-3 text-gray-600 text-sm rounded-lg mb-1 truncate`}
			// onClick={() => setShowEventModal(true)}
		>
			{pEvent.title}
		</div>
	);
};

export default Event;
