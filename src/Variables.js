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
        padding: 500,
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
          "top",
          "bottom",
          "right",
          "left",
        ],
        rootBoundary: "viewport",
      },
    },
  ],
};

export default Variables;
