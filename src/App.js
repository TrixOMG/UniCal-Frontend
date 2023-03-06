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

  return (
    <>
      <EventModal />
      <div className='App h-screen flex flex-col'>
        <Navbar />
        <div className='flex flex-1 p-1 max-h-[90%]'>
          {showSidebar && <Sidebar />}
          <MainDaysComponent timeSpan={selectedDaysArray} />
        </div>
      </div>
    </>
  );
}

export default App;
