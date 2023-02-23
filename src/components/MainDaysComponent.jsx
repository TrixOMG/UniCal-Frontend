import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/context";
import { getMonth, getProperTimespanInMain } from "../util/util";
import Day from "./Day";

import { DragDropContext } from "react-beautiful-dnd";

const MainDaysComponent = ({ timeSpan }) => {
  const [properTimespan, setProperTimespan] = useState(
    getMonth(dayjs().month())
  );
  const {
    selectedDaysArray,
    // setShowEventModal,
    filteredEvents,
    dispatchCalEvent,
  } = useGlobalContext();

  useEffect(() => {
    if (timeSpan.length > 0)
      setProperTimespan(getProperTimespanInMain(timeSpan));
  }, [timeSpan]);

  function getDaysGridClasses() {
    let rowsClass = "grid-rows-";
    let colsClass = "grid-cols-";

    if (selectedDaysArray.length <= 7) {
      rowsClass += 1;
      colsClass += selectedDaysArray.length;
    } else if (selectedDaysArray.length > 7) {
      rowsClass += selectedDaysArray.length / 7;
      colsClass += 7;
    }

    return rowsClass + " " + colsClass + " ";
  }

  // let showEventModalOnDrag = false;
  function handleDragEnd({ destination, source, draggableId }) {
    // если таск дропнули в место куда его нельзя дропнуть
    if (!destination) return;

    // если таск дропнули в тот же день где он и был
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      // setShowEventModal(false);
      return;
    }

    let draggedEvent = filteredEvents.find(
      (evt) => evt.id === parseInt(draggableId)
    );

    draggedEvent.day = parseInt(destination.droppableId);
    // место где меняется расположение таска
    // (перенос его на другой день через DND)
    // const calendarEvent = {
    //   title,
    //   description,
    //   label: selectedLabel,
    //   day: chosenDayForTask.valueOf(),
    //   id: selectedEvent ? selectedEvent.id : Date.now(),
    // };

    dispatchCalEvent({ type: "update", payload: draggedEvent });
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div
        className={`mx-1 flex-1 grid gap-1 ${
          selectedDaysArray.length > 0
            ? getDaysGridClasses() + " "
            : "grid-cols-7 grid-rows-5 "
        }`}
      >
        {properTimespan.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, idx) => (
              <Day pDay={day} key={idx} rowIdx={i} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </DragDropContext>
  );
};

export default MainDaysComponent;
