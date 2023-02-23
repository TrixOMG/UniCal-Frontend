import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "../context/context";
// import Event from "./Event";

const Day = ({ pDay, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);
  const { setShowEventModal, setChosenDayForTask, filteredEvents } =
    useGlobalContext();

  const { setSelectedEvent } = useGlobalContext();

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === pDay.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, pDay]);

  function getAccentOnToday() {
    console.table();
    if (dayjs(pDay).format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
      return "bg-blue-600 text-white rounded-lg";
    } else {
      return "";
    }
  }

  return (
    <div className='border border-gray-200 flex flex-col h-full rounded-lg'>
      <header className='flex flex-col items-center h-10'>
        {rowIdx === 0 && (
          <p className='text-sm mt-1'>
            {dayjs(pDay).format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm mt-1 w-7 h-7 text-center p-1 ${getAccentOnToday()}`}
        >
          {dayjs(pDay).date()}
        </p>
      </header>
      <Droppable droppableId={pDay.valueOf() + ""}>
        {(provided) => {
          return (
            <div
              className='flex-1 cursor-pointer pt-5'
              onClick={() => {
                setChosenDayForTask(pDay);
                setShowEventModal(true);
              }}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {dayEvents.map((evt, idx) => {
                return (
                  <Draggable key={idx} index={idx} draggableId={evt.id + ""}>
                    {(provided) => {
                      return (
                        <div
                          onClick={() => setSelectedEvent(evt)}
                          className={`bg-${evt.label}-300 p-1 mx-1 text-gray-600 text-sm rounded-lg mb-1 truncate`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {evt.title}
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Day;
