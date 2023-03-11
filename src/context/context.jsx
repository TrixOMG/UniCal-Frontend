import dayjs from "dayjs";
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { getProperSelectedDays } from "../util/util";

export const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

// Custom hook (closing on click outside component functionality)
//////////////////////////////
export const useOutsideAlerter = (initialValue) => {
  const ref = useRef(null);
  const [show, setShow] = useState(initialValue);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) setShow(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ref]);

  return { show, setShow, ref };
};
/////////////////////////////

function groupsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((group) => (group.id === payload.id ? payload : group));
    case "delete":
      // change
      return state.filter((group) => group.id !== payload.id);
    default:
      throw new Error("groupsReducerError");
  }
}

function initGroups() {
  const storageGroups = localStorage.getItem("savedGroups");
  let parsedGroups = null;

  if (storageGroups !== null) parsedGroups = JSON.parse(storageGroups);
  else
    parsedGroups = [
      {
        title: "Your Default Group",
        id: Date.now(),
        description: "Your Default Group's Description",
        checked: true,
        label: labelsClasses[0],
      },
    ];
  return parsedGroups;
}

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    case "pushFromStart":
      return [payload, ...state];
    default:
      throw new Error("eventsReducerError");
  }
}

function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  let parsedEvents = [];

  if (storageEvents !== null) parsedEvents = JSON.parse(storageEvents);
  else parsedEvents = [];
  return parsedEvents;
}

const GlobalContext = React.createContext();

const GlobalContextProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month() + 1);
  const [showSidebar, setShowSidebar] = useState(true);
  //  const [showEventModal, setShowEventModal] = useState(false);
  const { show, setShow, ref } = useOutsideAlerter(false);
  //
  const [chosenDayForTask, setChosenDayForTask] = useState(dayjs());

  // для отображения меню изменения таска
  const [selectedEvent, setSelectedEvent] = useState(null);

  // groups
  const [savedGroups, dispatchGroups] = useReducer(
    groupsReducer,
    [],
    initGroups
  );

  const [selectedGroup, setSelectedGroup] = useState(null);

  const [modalPlacement, setModalPlacement] = useState("bottom-start");

  // POPPER
  const [referenceElement, setReferenceElement] = useState(null);
  // const [popperElement, setPopperElement] = useState(null);

  // Fake Task
  const [showFakeTask, setShowFakeTask] = useState(true);

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      savedGroups
        .filter((group) => group.checked)
        .map((group) => group.id)
        .includes(evt.groupId)
    );
  }, [savedEvents, savedGroups]);

  // Backup

  // const filteredEvents = useMemo(() => {
  //   return savedEvents.filter((evt) =>
  //     groups
  //       .filter((group) => group.checked)
  //       .map((group) => group.label)
  //       .includes(evt.label)
  //   );
  // }, [savedEvents, groups]);

  // groups work
  // useEffect(() => {
  //   setGroups((prevGroups) => {
  //     return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
  //       const currentLabel = prevGroups.find((group) => group.label === label);
  //       return { label, checked: currentLabel ? currentLabel.checked : true };
  //     });
  //   });
  // }, [savedEvents]);

  // Backup

  // useEffect(() => {
  //   setGroups((prevGroups) => {
  //     return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
  //       const currentLabel = prevGroups.find((group) => group.label === label);
  //       return { label, checked: currentLabel ? currentLabel.checked : true };
  //     });
  //   });
  // }, [savedEvents]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    localStorage.setItem("savedGroups", JSON.stringify(savedGroups));
  }, [savedGroups]);

  const [selectedDaysArray, setSelectedDaysArray] = useState(
    getProperSelectedDays([dayjs()])
  );
  const [chosenDay, setChosenDay] = useState(dayjs());

  // function updateGroup(label) {
  // setGroups(
  // groups.map((group) => (group.label === label.label ? label : group))
  // );
  // }

  // Backup

  // function updateGroup(label) {
  //     setGroups(
  //       groups.map((group) => (group.label === label.label ? label : group))
  //     );
  //   }
  //

  function changeShowEventModal() {
    setShow((visible) => !visible);
  }

  const value = {
    monthIndex,
    setMonthIndex,
    showSidebar,
    setShowSidebar,
    // showEventModal,
    // setShowEventModal,
    show,
    setShow,
    ref, //for hiding event modal on click outside
    changeShowEventModal,
    selectedDaysArray,
    setSelectedDaysArray,
    chosenDayForTask,
    setChosenDayForTask,
    chosenDay,
    setChosenDay,
    dispatchCalEvent,
    savedEvents,
    selectedEvent,
    setSelectedEvent,
    savedGroups,
    dispatchGroups,
    filteredEvents,
    referenceElement,
    setReferenceElement,
    showFakeTask,
    setShowFakeTask,
    modalPlacement,
    setModalPlacement,
    selectedGroup,
    setSelectedGroup,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalContextProvider };
