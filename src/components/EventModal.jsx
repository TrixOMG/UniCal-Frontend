// import dayjs from "dayjs";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { labelsClasses, useGlobalContext } from "../context/context";
import "../index.css";

//const labelsClasses = ["indigo", "gray", "green", "blue", "red", "purple"];

const EventModal = () => {
  const {
    showEventModal,
    setShowEventModal,
    chosenDayForTask,
    dispatchCalEvent,
    selectedEvent,
    setSelectedEvent,
    referenceElement,
    setReferenceElement,
    setShowFakeTask,
    modalPlacement,
    dispatchGroups,
  } = useGlobalContext();

  //////////////
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );
  //////////////

  useEffect(() => {
    if (selectedEvent) {
      setTitle(selectedEvent.title);
      setDescription(selectedEvent.description);
      setSelectedLabel(
        labelsClasses.find((lbl) => lbl === selectedEvent.label)
      );
    } else {
      setTitle("");
      setDescription("");
      setSelectedLabel(labelsClasses[0]);
    }
  }, [selectedEvent]);

  // POPPER
  const [popperElement, setPopperElement] = useState([]);

  const { styles } = usePopper(referenceElement, popperElement, {
    placement: modalPlacement, //"bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
      {
        name: "flip",
        options: {
          allowedAutoPlacements: ["right-start", "left-start", "bottom"],
          rootBoundary: "viewport",
        },
      },
    ],
  });

  // POPPER

  function handleSubmit(e) {
    e.preventDefault();

    if (modalPlacement === "bottom-start") {
      if (title.trim() === "") return;

      const calendarEvent = {
        title,
        description,
        label: selectedLabel,
        day: selectedEvent ? selectedEvent.day : chosenDayForTask.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
      };

      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "pushFromStart", payload: calendarEvent });
      }
    } else {
      const newGroup = {
        title,
        description,
        label: selectedLabel,
        id: Date.now(),
        checked: true,
      };

      dispatchGroups({ type: "push", payload: newGroup });
    }

    setShowEventModal(false);
    setSelectedEvent(null);
    setReferenceElement(null);
    setTitle("");
    setDescription("");
    setSelectedLabel(labelsClasses[0]);
    setShowFakeTask(false);
  }

  function getClassShow() {
    return showEventModal ? "visible" : "invisible";
  }

  return (
    <form
      className={`bg-white rounded-xl drop-shadow-lg overflow-hidden ${getClassShow()}`}
      ref={setPopperElement}
      style={styles.popper}
    >
      <header className='bg-gray-100 px-4 py-2 flex justify-end items-center'>
        <div>
          {selectedEvent && (
            <button
              onClick={() => {
                dispatchCalEvent({ type: "delete", payload: selectedEvent });
                setShowEventModal(false);
                setSelectedEvent(null);
                setReferenceElement(null);
              }}
            >
              <span className='material-icons text-gray-400 unselectable'>
                delete
              </span>
            </button>
          )}
          <button type='button'>
            <span
              className='material-icons text-gray-400 unselectable'
              onClick={() => {
                setShowEventModal(false);
                setSelectedEvent(null);
                setReferenceElement(null);
                setShowFakeTask(false);
              }}
            >
              close
            </span>
          </button>
        </div>
      </header>
      <div className='p-3'>
        <div className='grid grid-cols-1/5 items-end gap-y-5'>
          <div></div>
          <input
            type='text'
            name='title'
            placeholder={
              modalPlacement === "bottom-start"
                ? "Add Title"
                : "Add Group Title"
            }
            required
            className='pt-3 border-0 text-gray-600 text-lg font-semibold w-full pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-b-blue-500'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {modalPlacement === "bottom-start" && (
            <span className='material-icons text-gray-400 unselectable'>
              schedule
            </span>
          )}
          {modalPlacement === "bottom-start" && (
            <p className='pl-1 unselectable'>
              {selectedEvent
                ? dayjs(selectedEvent.day).format("dddd, MMMM DD")
                : chosenDayForTask.format("dddd, MMMM DD")}
            </p>
          )}
          <span className='material-icons text-gray-400 unselectable'>
            segment
          </span>
          <input
            type='text'
            name='description'
            placeholder='Add a Description'
            className='border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className='material-icons text-gray-400 unselectable'>
            bookmark_border
          </span>
          <div className='flex gap-x-2'>
            {labelsClasses.map((lblClass, i) => (
              <span
                key={i}
                onClick={() => setSelectedLabel(lblClass)}
                className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer `}
              >
                {selectedLabel === lblClass && (
                  <span className='material-icons text-white text-sm'>
                    check
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
      <footer className='flex justify-end border-t p-3 mt-3'>
        <button
          type='submit'
          onClick={handleSubmit}
          className='bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white unselectable'
        >
          Save
        </button>
      </footer>
    </form>
  );
};

export default EventModal;
