import dayjs from "dayjs";
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
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
  let parsedGroups = [];

  if (storageGroups !== null) parsedGroups = JSON.parse(storageGroups);
  else parsedGroups = [];
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
  const [showEventModal, setShowEventModal] = useState(false);
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
        .map((group) => group.groupName)
        .includes(evt.groupName)
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

  const value = {
    monthIndex,
    setMonthIndex,
    showSidebar,
    setShowSidebar,
    showEventModal,
    setShowEventModal,
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
