import React from "react"; //, { useState } from "react";
import { useGlobalContext } from "../context/context";

const Groups = () => {
  // const [ggroups, setGgroups] = useState();

  const { groups, updateGroup } = useGlobalContext();

  return (
    <>
      <p className='text-gray-500 font-bold mt-10'>Groups</p>
      {groups.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className='items-center mt-3 block'>
          <input
            type='checkbox'
            checked={checked}
            onChange={() => updateGroup({ label: lbl, checked: !checked })}
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className='ml-2 text-gray-700 capitalize'>{lbl}</span>
        </label>
      ))}
    </>
  );
};

export default Groups;
