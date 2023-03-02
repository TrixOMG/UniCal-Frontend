import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "../context/context";

const Day = ({ pDay, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setShowEventModal,
    setChosenDayForTask,
    filteredEvents,
    isDragging,
    setReferenceElement,
  } = useGlobalContext();

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

  function handleClick() {
    setChosenDayForTask(pDay);
    setShowEventModal(true);
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
              className='flex-1 pt-5 group'
              // onClick={() => {
              // setShowEventModal(true);
              // handleClick();
              // }}
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
                            // setShowEventModal(true);
                          }}
                          ref={setReferenceElement}
                        >
                          <div
                            onClick={() => {
                              setSelectedEvent(evt);
                              // setShowEventModal(true);
                              // setReferenceElement(e.target);
                            }}
                            className={`bg-${evt.label}-300 p-1 mx-1 text-gray-600 text-sm rounded-lg mb-1 flex flex-row justify-between`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <p className='truncate p-1'>{evt.title}</p>
                          </div>
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <div className='mr-2'>
                <button
                  className={`invisible ${
                    !isDragging && "group-hover:visible"
                  } p-1 mx-1 bg-gray-300 text-gray-600 text-sm rounded-lg mb-1 flex flex-row justify-center w-full `}
                  onClick={(e) => {
                    handleClick();
                    setReferenceElement(e.target);
                  }}
                >
                  <span className='material-icons text-gray-600 cursor-pointer text-sm'>
                    edit
                  </span>
                  New Task
                </button>
              </div>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Day;
