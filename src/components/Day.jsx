import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "../context/context";

const Day = ({ pDay, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setShowEventModal,
    setChosenDayForTask,
    filteredEvents,
    setReferenceElement,
    showFakeTask,
    setShowFakeTask,
    chosenDayForTask,
    setSelectedDaysArray,
    setChosenDay,
    // dispatchCalEvent,
  } = useGlobalContext();

  const { setSelectedEvent } = useGlobalContext();

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) => dayjs(evt.day).format("DD-MM-YY") === pDay.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, pDay]);

  function getAccentOnToday() {
    if (dayjs(pDay).format("DD-MM-YY") === dayjs().format("DD-MM-YY")) {
      return "bg-blue-600 text-white rounded-lg hover:bg-blue-300";
    } else {
      return "bg-gray-400 rounded-lg hover:bg-gray-200";
    }
  }

  const newTaskReference = useRef(null);

  function handleClick() {
    setChosenDayForTask(pDay);
    setShowEventModal(true);
    setShowFakeTask(true);
    setReferenceElement(newTaskReference.current);
  }

  return (
    <div className='border border-gray-200 flex flex-col rounded-lg'>
      <header
        className='flex flex-col items-center bg-gray-300 rounded-t-lg pb-1 cursor-pointer'
        onClick={() => handleClick()}
      >
        {rowIdx === 0 && (
          <p className='text-sm mt-1'>
            {dayjs(pDay).format("ddd").toUpperCase()}
          </p>
        )}
        <p
          className={`text-sm w-7 h-7 text-center p-[0.2em] ${getAccentOnToday()}`}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedDaysArray([pDay]);
            setChosenDay(pDay);
          }}
        >
          {dayjs(pDay).date()}
        </p>
      </header>
      <div
        className={`${
          pDay === chosenDayForTask && showFakeTask
            ? "display-block visible"
            : "absolute invisible"
        } mt-1 mx-1 text-white text-sm rounded-lg flex flex-row justify-between border-gray-300 border-2 p-[0.15em] unselectable`}
        ref={newTaskReference}
      >
        /
      </div>
      <Droppable droppableId={pDay.valueOf() + ""}>
        {(provided) => {
          return (
            <div
              className='flex-1 my-1 overflow-y-hidden'
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {dayEvents.map((evt, idx) => {
                return (
                  <Draggable
                    key={evt.id + ""}
                    index={idx}
                    draggableId={evt.id + ""}
                  >
                    {(provided) => {
                      return (
                        <div
                          onClick={(e) => {
                            setReferenceElement(e.target);
                            setSelectedEvent(evt);
                            setShowEventModal(true);
                          }}
                        >
                          <div
                            onClick={() => {
                              setSelectedEvent(evt);
                            }}
                            className={`bg-${evt.label}-300 mx-1 text-gray-600 text-sm rounded-lg mb-1 flex flex-row justify-between`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p className='truncate p-[0.20em] hover:cursor-pointer'>
                              {evt.title}
                            </p>
                          </div>
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
