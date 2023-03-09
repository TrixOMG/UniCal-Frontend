import React, { useState } from "react";
import { usePopper } from "react-popper";
import { labelsClasses, useGlobalContext } from "../context/context";

const SmallModal = () => {
  const { showSmallModal, setShowSmallModal, smallReferenceElement } =
    useGlobalContext();

  // POPPER
  const [popperElement, setPopperElement] = useState([]);

  const [title, setTitle] = useState("");
  const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

  const { styles } = usePopper(smallReferenceElement, popperElement, {
    placement: "right-start",
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

  function getClassShow() {
    return showSmallModal ? "visible" : "invisible";
  }

  return (
    <form
      className={`bg-white rounded-xl drop-shadow-lg overflow-hidden ${getClassShow()}`}
      ref={setPopperElement}
      style={styles.popper}
    >
      <header className='bg-gray-100 px-2 pt-1 flex justify-between items-center'>
        <button type='button'>
          <span
            className='material-icons text-gray-400'
            onClick={() => {
              setShowSmallModal(false);
            }}
          >
            close
          </span>
        </button>
      </header>
      <div className='p-3 grid grid-cols-1/5 items-end gap-y-1'>
        <div></div>
        <input
          type='text'
          name='title'
          placeholder='Add Title'
          required
          className='pt-3 border-0 text-gray-600 text-sm font-semibold w-full pb-2 border-b-2 border-gray-200 focus:outline-none focus:border-b-blue-500'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <span className='material-icons text-gray-400'>bookmark_border</span>
        <div className='flex gap-x-2'>
          {labelsClasses.map((lblClass, i) => (
            <span
              key={i}
              onClick={() => setSelectedLabel(lblClass)}
              className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer `}
            >
              {selectedLabel === lblClass && (
                <span className='material-icons text-white text-sm'>check</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </form>
  );
};

export default SmallModal;
