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
