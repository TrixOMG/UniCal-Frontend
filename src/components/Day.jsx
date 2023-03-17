import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { labelsClasses, useGlobalContext } from "../context/context";

const Day = ({ pDay, rowIdx }) => {
  const [dayEvents, setDayEvents] = useState([]);

  const {
    //setShowEventModal,
    // tooltip
    setTooltipRefElement,
    setTooltipTitle,
    setShowTooltip,
    // tooltip
    changeShowEventModal,
    setChosenDayForTask,
    filteredEvents,
    setReferenceElement,
    showFakeTask,
    setShowFakeTask,
    chosenDayForTask,
    setSelectedDaysArray,
    setChosenDay,
    // modal
    setModalTitle,
    setModalDescription,
    setSelectedLabel,
    setChosenGroupForTask,
    savedGroups,
    setSelectedObjectForModal,
    // modal
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
    setChosenDayForTask(pDay);
    setReferenceElement(newTaskReference.current);
    setSelectedObjectForModal("add-event");
    setModalTitle("");
    setModalDescription("");
    setSelectedLabel(labelsClasses[0]);
    setChosenGroupForTask(savedGroups[0]);
    changeShowEventModal(true);
    setShowFakeTask(true);
  }

  function handleOnEventClick(pEvent) {
    setSelectedObjectForModal("event");
    setModalTitle(pEvent.title);
    setModalDescription(pEvent.description);
    setSelectedLabel(pEvent.label);
    setChosenGroupForTask(
      savedGroups.find((group) => group.id === pEvent.groupId)
    );
    changeShowEventModal(true);
  }

  // let tooltipTimeout = useRef(null);

  function handleTooltipShow(e, pTitle) {
    setTooltipRefElement(e.target);
    setTooltipTitle(pTitle);
    setShowTooltip(true);
  }

  function handleTooltipHide() {
    setShowTooltip(false);
  }

  return (
    <div className='border border-gray-200 flex flex-col rounded-lg overflow-hidden'>
      <header
        className='flex flex-col items-center bg-gray-300 pb-1 cursor-pointer'
        onClick={() => handleAddEventClick()}
        onMouseEnter={(e) => handleTooltipShow(e, "Create New Task")}
        onMouseOut={() => handleTooltipHide()}
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
          onMouseEnter={(e) => handleTooltipShow(e, "Go to Day")}
          onMouseOut={(e) => handleTooltipHide()}
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
                            handleOnEventClick(evt);
                            // setSelectedEvent(evt);
                            // setModalPlacement("bottom-start");
                            // changeShowEventModal(true);
                            // setSelectedEvent(evt);
                          }}
                        >
                          <div
                            // onClick={() => {
                            // setSelectedEvent(evt);
                            // }}
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
