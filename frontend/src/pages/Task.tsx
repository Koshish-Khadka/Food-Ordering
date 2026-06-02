// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";

// const Task = () => {
//   const numbers = [
//     {
//       label: "1",
//       characters: "",
//     },
//     {
//       label: "2",
//       characters: "ABC",
//     },
//     {
//       label: "3",
//       characters: "DEF",
//     },
//     {
//       label: "4",
//       characters: "GHI",
//     },
//     {
//       label: "5",
//       characters: "JKL",
//     },
//     {
//       label: "6",
//       characters: "MNO",
//     },
//     {
//       label: "7",
//       characters: "PQRS",
//     },
//     {
//       label: "8",
//       characters: "TUV",
//     },
//     {
//       label: "9",
//       characters: "WXYZ",
//     },
//     {
//       label: "*",
//       characters: "+",
//     },
//     {
//       label: "0",
//       characters: "-",
//     },
//     {
//       label: "#",
//       characters: "=>",
//     },
//   ];
//   const [input, setInput] = useState([]);

//   const handleInput = (value: number) => {
//     setInput([...input, value]);
//   };

//   const handleClear = () => {
//     setInput([]);
//   };

//   const handleBackspace = () => {
//     const newArray = [...input];
//     newArray.pop();
//     setInput(newArray);
//   };

//   //   console.log(input);
//   return (
//     <div className="h-screen flex justify-center items-center">
//       <div>
//         <div className="bg-amber-50 text-black border p-4">{input}</div>
//         <div className="bg-[#444444] w-fit rounded-2xl border-4 border-[#1a1a1a]">
//           <div className="p-4 grid grid-cols-3 gap-4">
//             {numbers.map((items, index) => {
//               return (
//                 <button
//                   className="p-4 gap-x-3 rounded-xl bg-[#333333] border-b-4 "
//                   key={index}
//                   onClick={() => handleInput(items.label)}
//                 >
//                   <p className="text-white font-black">{items.label}</p>
//                   <p className="text-white font-light text-base ">{items.characters}</p>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//         <div className="flex justify-between">
//           <button className="p-2 border " onClick={handleClear}>
//             Clear
//           </button>
//           <button className="p-2 border" onClick={handleBackspace}>
//             Backspace
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Task;

// import { useState } from "react";

// const Task = () => {
//   const numbers = [
//     {
//       label: "1",
//       characters: "",
//     },
//     {
//       label: "2",
//       characters: "ABC",
//     },
//     {
//       label: "3",
//       characters: "DEF",
//     },
//     {
//       label: "4",
//       characters: "GHI",
//     },
//     {
//       label: "5",
//       characters: "JKL",
//     },
//     {
//       label: "6",
//       characters: "MNO",
//     },
//     {
//       label: "7",
//       characters: "PQRS",
//     },
//     {
//       label: "8",
//       characters: "TUV",
//     },
//     {
//       label: "9",
//       characters: "WXYZ",
//     },
//     {
//       label: "*",
//       characters: "+",
//     },
//     {
//       label: "0",
//       characters: "-",
//     },
//     {
//       label: "#",
//       characters: "=>",
//     },
//   ];

//   const [input, setInput] = useState([]);
//   const handleInput = (num: string) => {
//     setInput([...input, num]);
//   };

//   const handleBackspace = () => {
//     const newArray = [...input];
//     newArray.pop();
//     setInput(newArray);
//   };

//   return (
//     <div className="h-screen flex justify-center items-center">
//       <div>
//         <p>{input}</p>
//         <div className="grid grid-cols-3 gap-4 bg-[#444444] border-2 p-4 rounded-lg">
//           {numbers.map((items, index) => (
//             <div
//               key={index}
//               onClick={() => handleInput(items.label)}
//               className="bg-gray-900 text-white text-bold p-4 rounded-lg flex flex-col items-center border-b-4"
//             >
//               <p>{items.label}</p>
//               <p>{items.characters}</p>
//             </div>
//           ))}
//         </div>
//         <div className="flex justify-between mt-4">
//           <button
//             className="p-4 bg-red-400 text-white"
//             onClick={() => setInput([])}
//           >
//             Clear
//           </button>
//           <button
//             className="p-4 bg-gray-800 text-white"
//             onClick={handleBackspace}
//           >
//             Backspace
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Task;

import React from "react";

const Task = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      {/* <div className="grid grid-cols-4 gap-4 bg-amber-100 p-2 place-items-center">
        <div className="p-4 border">Box 1</div>
        <div className="p-4 border">Box 2</div>
        <div className="p-4 border">Box 3 </div>
        <div className="p-4 border">Box 4 </div>
        <div className="p-4 border ">Box 5</div>
        <div className="p-4 border">Box 6</div>
      </div> */}

      <div className="grid grid-cols-4 grid-rows-3 gap-4">
        <div className="col-span-2 border">Wide Box</div>
        <div className="row-span-2 border">Tall Box</div>
        <div className="p-4 border">Box 1</div>
        <div className="p-4 border">Box 2</div>
        <div className="p-4 border">Box 3 </div>
        <div className="p-4 border">Box 4 </div>
        <div className="p-4 border ">Box 5</div>
        <div className="p-4 border">Box 1</div>
        <div className="p-4 border">Box 2</div>
        <div className="p-4 border">Box 3 </div>
        <div className="p-4 border">Box 4 </div>
        <div className="p-4 border ">Box 5</div>
      </div>
    </div>
  );
};

export default Task;
