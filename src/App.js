import React, {useEffect} from "react";

import EventModal from "./components/EventModal";
import MainDaysComponent from "./components/MainDaysComponent";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Tooltip from "./components/Tooltip";
import { useGlobalContext } from "./context/context";
import "./index.css";
import "./util/util";

function App() {
  const { showSidebar, selectedDaysArray, showTooltip } = useGlobalContext();

  return (
    <>
      {showTooltip && <Tooltip />}
      <EventModal />
      <div className='App h-screen flex flex-col'>
        <Navbar />
        <div className='flex flex-1 p-1 max-h-[92%]'>
          {showSidebar && <Sidebar />}
          <MainDaysComponent timeSpan={selectedDaysArray} />
        </div>
      </div>
    </>
  );
}

export default App;
