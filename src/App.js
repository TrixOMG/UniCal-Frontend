import React from "react";

import EventModal from "./components/EventModal";
import MainDaysComponent from "./components/MainDaysComponent";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useGlobalContext } from "./context/context";
import "./index.css";
import "./util/util";

function App() {
  const { showSidebar, selectedDaysArray } = useGlobalContext();

  // const [currentMonth, setCurrentMonth] = useState(getMonth());
  // const [currentFiveDays, setCurrentFiveDays] = useState(getFiveDays(new Date()));

  // useEffect(() => {
  // setCurrentMonth(getMonth(monthIndex));
  // }, [monthIndex]);

  return (
    <>
      {/* {showEventModal && <EventModal />} */}
      <EventModal />
      <div className='App h-screen flex flex-col'>
        <Navbar />
        <div className='flex flex-1 p-1 max-h-[90%]'>
          {showSidebar && <Sidebar />}
          <MainDaysComponent timeSpan={selectedDaysArray} />
          {/* {showFiveDays && <MainFiveDays pFiveDays={currentFiveDays} />} */}
          {/* {showMainMonth && <MainMonth month={currentMonth} />} */}
        </div>
      </div>
    </>
  );
}

export default App;
