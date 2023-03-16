import React, { useRef } from "react";
import { labelsClasses, useGlobalContext } from "../context/context";

const Groups = () => {
  const {
    savedGroups,
    dispatchGroups,
    changeShowEventModal,
    setReferenceElement,
    setSelectedGroup,
    // modal
    setModalTitle,
    setModalDescription,
    setSelectedLabel,
    setSelectedObjectForModal,
    // modal
  } = useGlobalContext();

  const modalReference = useRef(null);

  function handleGroupClick(pGroup) {
    setSelectedObjectForModal("group");
    setSelectedGroup(pGroup);
    setReferenceElement(modalReference.current);
    setModalTitle(pGroup.title);
    setModalDescription(pGroup.description);
    setSelectedLabel(pGroup.label);
    changeShowEventModal(true);
  }

  function handleAddClick() {
    setSelectedObjectForModal("add-group");
    setReferenceElement(modalReference.current);
    setModalDescription("");
    setModalTitle("");
    setSelectedLabel(labelsClasses[0]);
    changeShowEventModal(true);
  }

  return (
    <div className='border border-gray-200 mt-10 rounded-lg'>
      <header className='flex justify-between rounded-t-lg bg-gray-300'>
        <p className='text-gray-500 font-bold mx-1'>Groups</p>
        <span
          className='material-symbols-outlined text-gray-500 cursor-pointer unselectable'
          onClick={() => {
            handleAddClick();
          }}
          ref={modalReference}
        >
          add
        </span>
      </header>
      {savedGroups.length > 0 &&
        savedGroups.map((group, idx) => (
          <div
            className='flex flex-row justify-start items-center mt-3 ml-1'
            key={idx}
          >
            <input
              type='checkbox'
              checked={group.checked}
              onChange={() => {
                dispatchGroups({
                  type: "update",
                  payload: {
                    title: group.title,
                    description: group.description,
                    label: group.label,
                    id: group.id,
                    checked: !group.checked,
                  },
                });
              }}
              className={`form-checkbox h-5 w-5 text-${group.label}-400 rounded focus:ring-0 cursor-pointer bg-${group.label}-400 border-0`}
            />
            <span
              className='ml-2 text-gray-700 capitalize cursor-pointer'
              onClick={() => handleGroupClick(group)}
            >
              {group.title}
            </span>
          </div>
        ))}
    </div>
  );
};

export default Groups;
