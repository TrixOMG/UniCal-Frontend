//import dayjs from "dayjs";
import React, { useCallback, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { labelsClasses, useGlobalContext } from "../context/context";
import "../index.css";

const GroupModal = () => {
  const {
    showGroupModal,
    changeShowGroupModal,
    groupModalRef,
    groupReferenceElement,
    setGroupReferenceElement,
    dispatchGroups,
    savedGroups,
    selectedGroup,
    setSelectedGroup,
  } = useGlobalContext();

  //////////////
  const [title, setTitle] = useState(selectedGroup ? selectedGroup.title : "");
  const [description, setDescription] = useState(
    selectedGroup ? selectedGroup.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedGroup
      ? labelsClasses.find((lbl) => lbl === selectedGroup.label)
      : labelsClasses[0]
  );

  useEffect(() => {
    if (selectedGroup) {
      setTitle(selectedGroup.title);
      setDescription(selectedGroup.description);
      setSelectedLabel(selectedGroup.label);
    } else {
      setTitle("");
      setDescription("");
      setSelectedLabel(labelsClasses[0]);
    }
  }, [selectedGroup, savedGroups]);

  useCallback(() => {
    if (!showGroupModal) {
      setModalDefaults();
    }
  }, [showGroupModal, setModalDefaults]);

  // POPPER
  const [popperElement, setPopperElement] = useState(null);

  const { styles } = usePopper(groupReferenceElement, popperElement, {
    placement: "right-start",
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

  function setModalDefaults() {
    changeShowGroupModal(false);
    setSelectedGroup(null);
    //appearance
    setTitle("");
    setDescription("");
    setSelectedLabel(labelsClasses[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === "") return;

    const newGroup = {
      checked: true,
      title: title,
      description: description,
      label: selectedLabel,
      id: selectedGroup ? selectedGroup.id : Date.now(),
    };

    if (selectedGroup) {
      dispatchGroups({ type: "update", payload: newGroup });
    } else {
      dispatchGroups({ type: "push", payload: newGroup });
    }

    setModalDefaults();
  }

  function getClassShow() {
    return showGroupModal ? "visible" : "invisible";
  }

  function handleDelete(e) {
    e.preventDefault();

    if (savedGroups.length > 1) {
      dispatchGroups({ type: "delete", payload: selectedGroup });
      changeShowGroupModal(false);
      setGroupReferenceElement(null);
      setModalDefaults();
    } else {
      //TODO: make a hint 'At least one group is required'
    }
  }

  function handleClose() {
    setModalDefaults();
  }

  return (
    <div ref={groupModalRef}>
      <form
        className={`bg-white rounded-xl drop-shadow-lg overflow-hidden ${getClassShow()}`}
        ref={setPopperElement}
        style={styles.popper}
      >
        <header className='bg-gray-100 px-4 py-2 flex justify-end items-center'>
          <div>
            {selectedGroup && (
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
                  handleClose();
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
              placeholder='Add Group Title'
              required
              className='pt-3 border-0 text-gray-600 text-lg font-semibold w-full pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-b-blue-500'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className='material-icons text-gray-400 unselectable pb-7'>
              segment
            </span>
            <textarea
              type='text'
              name='description'
              placeholder='Add a Description'
              className='border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:border-blue-500 resize-none'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength='100'
              rows={2}
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
    </div>
  );
};

export default GroupModal;
