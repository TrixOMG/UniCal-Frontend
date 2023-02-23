import React from "react";
import { useGlobalContext } from "../context/context";

const Event = ({ pEvent }) => {
  const { setSelectedEvent } = useGlobalContext();
  return (
    <div
      onClick={() => setSelectedEvent(pEvent)}
      className={`bg-${pEvent.label}-300 p-1 mx-1 text-gray-600 text-sm rounded-lg mb-1 truncate`}
    >
      {pEvent.title}
    </div>
  );
};

export default Event;
