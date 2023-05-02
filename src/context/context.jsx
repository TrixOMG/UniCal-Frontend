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
  // tooltip
  const [tooltipTitle, setTooltipTitle] = useState("");
  const [tooltipRefElement, setTooltipRefElement] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  // tooltip

  const [monthIndex, setMonthIndex] = useState(dayjs().month() + 1);

  const [showSidebar, setShowSidebar] = useState(true);

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [selectedGroup, setSelectedGroup] = useState(null);

  const {
    show: showEventModal,
    setShow: setShowEventModal,
    ref: modalRef,
  } = useOutsideAlerter(false);

  const {
    show: showGroupModal,
    setShow: changeShowGroupModal,
    ref: groupModalRef,
  } = useOutsideAlerter(false);

  //
  const [chosenDayForTask, setChosenDayForTask] = useState(dayjs());

  // groups
  const [savedGroups, dispatchGroups] = useReducer(
    groupsReducer,
    [],
    initGroups
  );

  // POPPER
  const [referenceElement, setReferenceElement] = useState(null);
  const [groupReferenceElement, setGroupReferenceElement] = useState(null);
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

  // Everything for modal START

  function changeShowEventModal() {
    setShowEventModal((visible) => !visible);
  }

  //const [modalObject, setModalObject] = useState({});

  //objectName: 'task',
  //  title: '',
  //  description: '',
  //  label: labelsClasses[0],
  //  group: savedGroups[0],

  //const [modalTitle, setModalTitle] = useState("");
  //const [modalDescription, setModalDescription] = useState("");
  //const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

  //const [showDropdown, setShowDropdown] = useState(false);
  //const [chosenGroupForTask, setChosenGroupForTask] = useState(savedGroups[0]);

  //const [selectedObjectForModal, setSelectedObjectForModal] = useState("");

  // Everything for modal END

  const [selectedGroupLabel, setSelectedGroupLabel] = useState(
    labelsClasses[0]
  );

  const value = {
    //tooltip
    tooltipTitle,
    setTooltipTitle,
    tooltipRefElement,
    setTooltipRefElement,
    showTooltip,
    setShowTooltip,
    //tooltip

    //group modal
    showGroupModal,
    changeShowGroupModal,
    groupModalRef,
    groupReferenceElement,
    setGroupReferenceElement,
    selectedGroupLabel,
    setSelectedGroupLabel,
    //group modal

    monthIndex,
    setMonthIndex,

    selectedEvent,
    setSelectedEvent,
    selectedGroup,
    setSelectedGroup,

    showSidebar,
    setShowSidebar,
    showEventModal,
    setShowEventModal,
    modalRef, //for hiding event modal on click outside
    changeShowEventModal,
    selectedDaysArray,
    setSelectedDaysArray,
    chosenDayForTask,
    setChosenDayForTask,
    chosenDay,
    setChosenDay,
    dispatchCalEvent,
    savedEvents,
    savedGroups,
    dispatchGroups,
    filteredEvents,
    referenceElement,
    setReferenceElement,
    showFakeTask,
    setShowFakeTask,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalContext, GlobalContextProvider };
