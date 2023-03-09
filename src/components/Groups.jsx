import React, { useRef } from "react";
import { useGlobalContext } from "../context/context";

const Groups = () => {
  const {
    groups,
    //  setGroups,
    setShowSmallModal,
    setSmallReferenceElement,
  } = useGlobalContext();

  const smallModalReference = useRef(null);

  // function handleCreateGroup() {}

  return (
    <div className='border border-gray-200 mt-10 rounded-lg'>
      <header className='flex justify-between rounded-t-lg bg-gray-300'>
        <p className='text-gray-500 font-bold mx-1'>Groups</p>
        <span
          className='material-symbols-outlined text-gray-500 cursor-pointer unselectable'
          onClick={() => {
            setShowSmallModal(true);
            setSmallReferenceElement(smallModalReference.current);
          }}
          ref={smallModalReference}
        >
          add
        </span>
      </header>
      {groups.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className='items-center mt-3 block'>
          <input
            type='checkbox'
            // checked={checked}
            // onChange={() => updateGroup({ label: lbl, checked: !checked })}
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className='ml-2 text-gray-700 capitalize'>{lbl}</span>
        </label>
      ))}
    </div>
  );
};

export default Groups;

// Backup

//    {groups.map(({ label: lbl, checked }, idx) => (
//     <label key={idx} className='items-center mt-3 block'>
//       <input
//         type='checkbox'
//         checked={checked}
//         onChange={() => updateGroup({ label: lbl, checked: !checked })}
//         className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
//       />
//       <span className='ml-2 text-gray-700 capitalize'>{lbl}</span>
//     </label>
//   ))}
// </div>

// const Groups = () => {
//   const { groups, updateGroup } = useGlobalContext();

//   return (
//     <div className='border border-gray-200 mt-10 rounded-lg'>
//       <header className='flex justify-between rounded-t-lg bg-gray-300'>
//         <p className='text-gray-500 font-bold mx-1'>Groups</p>
//         <span class='material-symbols-outlined text-gray-500 cursor-pointer unselectable'>
//           add
//         </span>
//       </header>
//       {groups.map(({ label: lbl, checked }, idx) => (
//         <label key={idx} className='items-center mt-3 block'>
//           <input
//             type='checkbox'
//             checked={checked}
//             onChange={() => updateGroup({ label: lbl, checked: !checked })}
//             className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
//           />
//           <span className='ml-2 text-gray-700 capitalize'>{lbl}</span>
//         </label>
//       ))}
//     </div>
//   );
// };
