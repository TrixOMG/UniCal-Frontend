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
    changeShowEventModal,
    modalRef,
    chosenDayForTask,
    dispatchCalEvent,
    selectedEvent,
    setSelectedEvent,
    referenceElement,
    setReferenceElement,
    setShowFakeTask,
    dispatchGroups,
    selectedGroup,
    setSelectedGroup,
    savedGroups,
    //removed from modal
    modalTitle,
    setModalTitle,
    modalDescription,
    setModalDescription,
    selectedLabel,
    setSelectedLabel,
    showDropdown,
    setShowDropdown,
    chosenGroupForTask,
    setChosenGroupForTask,
    // modal multipurpose
    selectedObjectForModal,
    // modal multipurpose
  } = useGlobalContext();

  //////////////
  // const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  // const [description, setDescription] = useState(
  //   selectedEvent ? selectedEvent.description : ""
  // );
  // const [selectedLabel, setSelectedLabel] = useState(
  //   selectedEvent
  //     ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
  //     : labelsClasses[0]
  // );
  //////////////

  //////
  //////

  // const [showDropdown, setShowDropdown] = useState(false);
  // const [chosenGroupForTask, setChosenGroupForTask] = useState(savedGroups[0]);

  //update showing fake task with new click outside hook

  useEffect(() => {
    if (selectedObjectForModal === "add-event") setShowFakeTask(showEventModal);
  }, [showEventModal, setShowFakeTask, selectedObjectForModal]);

  useEffect(() => {
    if (showEventModal === false) {
      setSelectedEvent(null);
      setReferenceElement(null);
      setShowFakeTask(false);
      //setSelectedGroup(savedGroups[0]);
      //setSelectedLabel(labelsClasses[0]);
    }
  });

  // useEffect(() => {
  //   if (selectedEvent) {
  //     setModalTitle(selectedEvent.title);
  //     setModalDescription(selectedEvent.description);
  //     setSelectedLabel(
  //       labelsClasses.find((lbl) => lbl === selectedEvent.label)
  //     );
  //     setChosenGroupForTask(
  //       savedGroups.find((group) => group.id === selectedEvent.groupId)
  //     );
  //   } else {
  //     setModalTitle("");
  //     setModalDescription("");
  //     setSelectedLabel(labelsClasses[0]);
  //     setChosenGroupForTask(savedGroups[0]);
  //   }

  //   if (selectedGroup) {
  //     setModalTitle(selectedGroup.title);
  //     setModalDescription(selectedGroup.description);
  //     setSelectedLabel(
  //       labelsClasses.find((lbl) => lbl === selectedGroup.label)
  //     );
  //   } else {
  //     setModalTitle("");
  //     setModalDescription("");
  //     setSelectedLabel(labelsClasses[0]);
  //   }
  // });

  // useEffect(() => {
  //   setChosenGroupForTask(savedGroups[0]);
  // }, [savedGroups]);

  // POPPER
  const [popperElement, setPopperElement] = useState(null);

  const { styles } = usePopper(referenceElement, popperElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
      {
        name: "flip",
        options: {
          fallbackPlacements: [
            "right-start",
            "left-start",
            "bottom-start",
            "top-start",
          ],
          rootBoundary: "viewport",
        },
      },
    ],
  });

  // POPPER

  // POPPER for dropdown

  const [dropdownPopperRefElement, setDropdownPopperRefElement] =
    useState(null);
  const [dropdownPopperElement, setDropdownPopperElement] = useState(null);

  const { styles: dpdStyles } = usePopper(
    dropdownPopperRefElement,
    dropdownPopperElement,
    {
      placement: "bottom-start", //"bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 4],
          },
        },
        {
          name: "flip",
          options: {
            fallbackPlacements: [
              "right-start",
              "left-start",
              "bottom-start",
              "top-start",
            ],
            rootBoundary: "viewport",
          },
        },
      ],
    }
  );

  // POPPER for dropdown

  function handleSubmit(e) {
    e.preventDefault();

    if (modalTitle.trim() === "") return;

    if (
      selectedObjectForModal === "add-event" ||
      selectedObjectForModal === "event"
    ) {
      const calendarEvent = {
        modalTitle,
        modalDescription,
        label: selectedLabel,
        day: selectedEvent ? selectedEvent.day : chosenDayForTask.valueOf(),
        id: selectedEvent ? selectedEvent.id : Date.now(),
        groupId: chosenGroupForTask.id,
      };

      if (selectedEvent) {
        dispatchCalEvent({ type: "update", payload: calendarEvent });
      } else {
        dispatchCalEvent({ type: "pushFromStart", payload: calendarEvent });
      }
    } else {
      const newGroup = {
        modalTitle,
        modalDescription,
        label: selectedLabel,
        id: selectedGroup ? selectedGroup.id : Date.now(),
        checked: true,
      };

      if (selectedGroup) {
        dispatchGroups({ type: "update", payload: newGroup });
      } else {
        dispatchGroups({ type: "push", payload: newGroup });
      }
    }

    changeShowEventModal(false);
    setSelectedEvent(null);
    setReferenceElement(null);
    setModalTitle("");
    setModalDescription("");
    setSelectedLabel(labelsClasses[0]);
    setShowFakeTask(false);
  }

  function getClassShow() {
    return showEventModal ? "visible" : "invisible"; //showEventModal ? "visible" : "invisible";
  }

  function handleDelete(e) {
    e.preventDefault();

    if (selectedObjectForModal === "group") {
      if (savedGroups.length > 1) {
        dispatchGroups({ type: "delete", payload: selectedGroup });

        changeShowEventModal(false);
        setSelectedEvent(null);
        setSelectedGroup(null);
        setReferenceElement(null);
      } else {
        // TODO: make a hint 'At least one group is required'
        return;
      }
    } else if (selectedObjectForModal === "event") {
      dispatchCalEvent({
        type: "delete",
        payload: selectedEvent,
      });
      changeShowEventModal(false);
      setSelectedEvent(null);
      setSelectedGroup(null);
      setReferenceElement(null);
    }
  }

  return (
    <div ref={modalRef}>
      <form
        className={`bg-white rounded-xl drop-shadow-lg overflow-hidden ${getClassShow()}`}
        ref={setPopperElement}
        style={styles.popper}
      >
        <header className='bg-gray-100 px-4 py-2 flex justify-end items-center'>
          <div>
            {(selectedObjectForModal === "group" ||
              selectedObjectForModal === "event") && (
              <button
                onClick={(e) => {
                  handleDelete(e);
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
                  changeShowEventModal(false);
                  //changeShowEventModal(false);
                  //setSelectedGroup(null);
                  //setSelectedEvent(null);
                  //setReferenceElement(null);
                  //setShowFakeTask(false);
                }}
              >
                close
              </span>
            </button>
          </div>
        </header>
        <div className='p-3'>
          <div className='grid grid-cols-1/5 items-end gap-y-5 align-middle'>
            <div></div>
            <input
              type='text'
              name='title'
              placeholder={
                selectedObjectForModal === "add-event"
                  ? "Add Title"
                  : "Add Group Title"
              }
              required
              className='pt-3 border-0 text-gray-600 text-lg font-semibold w-full pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-b-blue-500'
              value={modalTitle}
              onChange={(e) => setModalTitle(e.target.value)}
            />
            {(selectedObjectForModal === "event" ||
              selectedObjectForModal === "add-event") && (
              <span className='material-icons text-gray-400 unselectable'>
                schedule
              </span>
            )}
            {(selectedObjectForModal === "event" ||
              selectedObjectForModal === "add-event") && (
              <p className='pl-1 unselectable'>
                {selectedEvent
                  ? dayjs(selectedEvent.day).format("dddd, MMMM DD")
                  : chosenDayForTask.format("dddd, MMMM DD")}
              </p>
            )}
            <span className='material-icons text-gray-400 unselectable pb-7'>
              segment
            </span>
            <textarea
              type='text'
              name='description'
              placeholder='Add a Description'
              className='border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 resize-none'
              value={modalDescription}
              onChange={(e) => setModalDescription(e.target.value)}
              maxLength='100'
              rows={2}
            />
            {(selectedObjectForModal === "event" ||
              selectedObjectForModal === "add-event") && (
              <span className='material-icons text-gray-400 unselectable py-1'>
                list_alt
              </span>
            )}
            {(selectedObjectForModal === "event" ||
              selectedObjectForModal === "add-event") && (
              <div className='w-full'>
                <header
                  className='w-full cursor-pointer border border-gray-300 rounded-lg p-1'
                  ref={setDropdownPopperRefElement}
                  onClick={() => {
                    setShowDropdown(true);
                  }}
                >
                  <button
                    className='flex flex-row bg-white gap-2 justify-start align-middle'
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDropdown(false);
                    }}
                  >
                    <span
                      className={`bg-${chosenGroupForTask.label}-500 w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer `}
                    ></span>
                    {chosenGroupForTask.title}
                  </button>
                </header>
                {showDropdown && (
                  <div
                    className='absolute flex flex-col justify-items-start w-[77%] border border-gray-300 rounded-lg overflow-hidden bg-white'
                    ref={setDropdownPopperElement}
                    style={dpdStyles.popper}
                  >
                    {savedGroups.map((group, idx) => (
                      <button
                        className='flex flex-row bg-white gap-2 p-1 justify-start align-middle'
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          setChosenGroupForTask(group);
                          setShowDropdown(false);
                        }}
                      >
                        <span
                          className={`bg-${group.label}-500 w-6 h-6 rounded-lg flex items-center justify-center cursor-pointer`}
                        ></span>
                        {group.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
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
    </div>
  );
};

export default EventModal;
