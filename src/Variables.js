const Variables = {
  eng: {
    confirmationWindow: {
      confirm: "Ok",
      cancel: "Cancel",
    },
  },
  rus: {
    confirmationWindow: {
      confirm: "Ок",
      cancel: "Отмена",
    },
  },
};

export const popperConfig = {
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
};

export default Variables;
