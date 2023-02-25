import dayjs from "dayjs";
import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { getProperSelectedDays } from "../util/util";

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error("reducerError");
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

  const [wasDragging, setWasDragging] = useState(true);

  // для отображения меню изменения таска
  const [selectedEvent, setSelectedEvent] = useState(null);
  // groups
  const [groups, setGroups] = useState([]);

  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      groups
        .filter((group) => group.checked)
        .map((group) => group.label)
        .includes(evt.label)
    );
  }, [savedEvents, groups]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  // groups work
  useEffect(() => {
    setGroups((prevGroups) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map((label) => {
        const currentLabel = prevGroups.find((group) => group.label === label);
        return { label, checked: currentLabel ? currentLabel.checked : true };
      });
    });
  }, [savedEvents]);

  const [selectedDaysArray, setSelectedDaysArray] = useState(
    getProperSelectedDays([dayjs()])
  );
  const [chosenDay, setChosenDay] = useState(dayjs());

  function updateGroup(label) {
    setGroups(
      groups.map((group) => (group.label === label.label ? label : group))
    );
  }

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
    groups,
    setGroups,
    updateGroup,
    filteredEvents,
    wasDragging,
    setWasDragging,
    // isMouseDown,
    // setIsMouseDown,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalContextProvider };
