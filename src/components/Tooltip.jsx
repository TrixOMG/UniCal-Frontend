import React, { useState } from "react";
import { usePopper } from "react-popper";
import { useGlobalContext } from "../context/context";
import "../index.css";

const Tooltip = () => {
  const { tooltipTitle, tooltipRefElement } = useGlobalContext();
  const [popperElement, setPopperElement] = useState(null);

  const { styles } = usePopper(tooltipRefElement, popperElement, {
    placement: "top",
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
    <div
      className='unselectable w-10 h-10 bg-black absolute p-1'
      ref={setPopperElement}
      style={styles.popper}
    >
      <p className=''>{tooltipTitle}</p>
    </div>
  );
};

export default Tooltip;
