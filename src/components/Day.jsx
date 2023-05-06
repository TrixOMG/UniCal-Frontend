import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "../context/context";

const Day = ({ pDay, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    setSelectedEvent,
    changeShowEventModal,
    setChosenDayForTask,
    filteredEvents,
    setReferenceElement,
    showFakeTask,
    setShowFakeTask,
    chosenDayForTask,
    setSelectedDaysArray,
    setChosenDay,
    dispatchCalEvent,
    savedGroups,
  } = useGlobalContext();

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

  function handleAddEventClick() {
    setSelectedEvent(null);
    setChosenDayForTask(pDay);
    setReferenceElement(newTaskReference.current);
    changeShowEventModal(true);
    setShowFakeTask(true);
  }

  function handleOnEventClick(pEvent) {
    setSelectedEvent(pEvent);
    changeShowEventModal(true);
  }

  function handleTaskDone(pEvent) {
    setSelectedEvent(null);
    changeShowEventModal(false);

    dispatchCalEvent({
      type: "update",
      payload: {
        title: pEvent.title,
        description: pEvent.description,
        label: pEvent.label,
        day: pEvent.day,
        groupId: pEvent.groupId,
        id: pEvent.id,
        done: !pEvent.done,
      },
    });
  }

  return (
    <div className='border border-gray-200 flex flex-col rounded-lg'>
      <header
        className='flex flex-col items-center bg-gray-300 rounded-t-lg pb-1 cursor-pointer'
        onClick={() => handleAddEventClick()}
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
            // setModalPlacement("bottom-start");
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
                            setReferenceElement(e.currentTarget);
                            handleOnEventClick(evt);
                          }}
                        >
                          <div
                            className={`${
                              evt.done
                                ? "bg-" + evt.label + "-400"
                                : "bg-" + evt.label + "-300"
                            } mx-1 text-gray-600 text-sm rounded-lg mb-1 flex flex-row justify-left items-center`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <input
                              type='checkbox'
                              checked={evt.done}
                              onChange={() => handleTaskDone(evt)}
                              className={`form-checkbox h-4 w-4 mx-1 text-${
                                savedGroups.find((gr) => gr.id === evt.groupId)
                                  .label
                              }-400 rounded ring-0 focus:ring-offset-0 focus:ring-0 cursor-pointer border-0 bg-${
                                savedGroups.find((gr) => gr.id === evt.groupId)
                                  .label
                              }-400`}
                            />
                            <p
                              className={`truncate p-[0.20em] hover:cursor-pointer ${
                                evt.done ? "line-through" : ""
                              }`}
                            >
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
