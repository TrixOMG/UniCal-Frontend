import React, { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { useGlobalContext } from "../context/context";
import "../index.css";

const Tooltip = () => {
  const { tooltipTitle, tooltipRefElement, showTooltip } = useGlobalContext();
  const [popperElement, setPopperElement] = useState(null);

  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setShow(true), 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [showTooltip]);

  const { styles } = usePopper(tooltipRefElement, popperElement, {
    placement: "bottom",
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

  return (
    <div>
      {show && (
        <div
          className='unselectable bg-white absolute p-1 border-gray-300 rounded-lg border'
          ref={setPopperElement}
          style={styles.popper}
        >
          <p className='text-sm'>{tooltipTitle}</p>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
