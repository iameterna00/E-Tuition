// import React, { useEffect, useState, useRef } from "react";
// import "../css/aakrity.css";
// import img1 from "../assets/aakrity/row-1-column-1.jpg";
// import img2 from "../assets/aakrity/row-1-column-2.jpg";
// import img3 from "../assets/aakrity/row-1-column-3.jpg";
// import img4 from "../assets/aakrity/row-2-column-1.jpg";
// import img5 from "../assets/aakrity/row-2-column-2.jpg";
// import img6 from "../assets/aakrity/row-2-column-3.jpg";
// import img7 from "../assets/aakrity/row-3-column-1.jpg";
// import img8 from "../assets/aakrity/row-3-column-2.jpg";
// import empty from "../assets/aakrity/empty.jpg"; // Empty tile

// const ProposalGame = () => {
//   const [name, setName] = useState("");
//   const [showPuzzle, setShowPuzzle] = useState(false);
//   const [puzzleCompleted, setPuzzleCompleted] = useState(false);
//   const [tiles, setTiles] = useState([]);
//   const [emptyIndex, setEmptyIndex] = useState(8); // 3x3 grid, empty tile at index 8
//   const [task, setTask] = useState(1); // Track the task number
//   const [answer, setAnswer] = useState("");
//   const [messages, setMessages] = useState([]);
//   const messagesEndRef = useRef(null); // Reference to the last message for scrolling

//   const imageParts = [
//     img1, img2, img3, 
//     img4, img5, img6, 
//     img7, img8, 'empty.jpg' // The last tile is the empty one
//   ];

//   // Initialize the puzzle
//   const countInversions = (tiles) => {
//     let inversions = 0;
//     for (let i = 0; i < tiles.length - 1; i++) {
//       for (let j = i + 1; j < tiles.length; j++) {
//         if (tiles[i] !== "empty.jpg" && tiles[j] !== "empty.jpg" && tiles[i] > tiles[j]) {
//           inversions++;
//         }
//       }
//     }
//     return inversions;
//   };
  
//   const isSolvable = (tiles) => {
//     const inversions = countInversions(tiles);
//     return inversions % 2 === 0; // Puzzle is solvable if inversions are even
//   };
  
//   const initializePuzzle = () => {
//     let shuffledTiles = [...imageParts];
//     do {
//       shuffledTiles = [...imageParts].sort(() => Math.random() - 0.5); // Shuffle the tiles
//     } while (!isSolvable(shuffledTiles)); // Keep shuffling until we get a solvable puzzle
  
//     setTiles(shuffledTiles);
//     setEmptyIndex(shuffledTiles.indexOf("empty.jpg"));
//     setShowPuzzle(true);
//   };
  
//   useEffect(() => {
//     if (task === 3) {
//       // Function to print messages with delay
//       const printMessagesWithDelay = async () => {
//         const newMessages = [];
//         for (let i = 0; i < 1000; i++) {
//           newMessages.push("I Love You POOKIE");
//           setMessages([...newMessages]);
//           await new Promise(resolve => setTimeout(resolve, 200)); // 0.2 second delay
//         }
//       };
//       printMessagesWithDelay();
//     }
//   }, [task]);

//   // Scroll to the latest message whenever it updates
//   useEffect(() => {
//     if (messages.length) {
//       messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);

//   // Handle tile click
//   const handleTileClick = (index) => {
//     if (isAdjacent(index, emptyIndex)) {
//       const newTiles = [...tiles];
//       [newTiles[index], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[index]];
//       setTiles(newTiles);
//       setEmptyIndex(index);
//       checkCompletion(newTiles);
//     }
//   };

//   // Check if the puzzle is completed
//   const checkCompletion = (tiles) => {
//     const isComplete = tiles.every((tile, index) => tile === imageParts[index]);
//     if (isComplete) {
//       setPuzzleCompleted(true);
//     }
//   };

//   // Check if two tiles are adjacent
//   const isAdjacent = (index1, index2) => {
//     const row1 = Math.floor(index1 / 3);
//     const col1 = index1 % 3;
//     const row2 = Math.floor(index2 / 3);
//     const col2 = index2 % 3;
//     return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
//   };

//   // Handle name submission
//   const handleNameSubmit = () => {
//     if (name.toLowerCase() === "pookiemon") {
//       initializePuzzle();
//     } else {
//       alert("Wrong name! Think your name again.");
//     }
//   };

//   // Handle skipping to next task
//   const handleNextTask = () => {
//     setTask(task + 1);
//   };

//   // Handle task answer submission
//   const handleAnswerSubmit = () => {
//     if (task === 2 && answer.toLowerCase() !== "ass") {
//       alert("Oops! Wrong answer, think try again.");
//     } else {
//       setTask(task + 1); // Move to next task
//     }
//   };

//   return (
//     <div className="App">
//       {!showPuzzle ? (
//         <div className="name-input">
//           <h1>Valentine's Day Special</h1>
//           <input
//             type="text"
//             placeholder="Enter your name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//           <button onClick={handleNameSubmit}>Submit</button>
//         </div>
//       ) : (
//         <div className="task-container">
//           {task === 1 && (
//             <>
//               <h1>TASK 2: Solve the Puzzle!</h1>
//               <div className="puzzle-grid">
//                 {tiles.map((tile, index) => (
//                   <div
//                     key={index}
//                     className={`puzzle-tile ${tile === "empty.jpg" ? "empty" : ""}`}
//                     onClick={() => handleTileClick(index)}
//                   >
//                     {tile !== "empty.jpg" && <img src={tile} alt={`Puzzle part ${index}`} />}
//                   </div>
//                 ))}
//               </div>
//               {puzzleCompleted && (
//                 <>
//                   <button onClick={handleNextTask}>Next Task</button>
//                 </>
//               )}
//             </>
//           )}

//           {task === 2 && (
//             <>
//               <h1>TASK 2: What's does Anuj like in you the most?</h1>
//               <input
//                 type="text"
//                 placeholder="Enter your answer"
//                 value={answer}
//                 onChange={(e) => setAnswer(e.target.value)}
//               />
//               <button onClick={handleAnswerSubmit}>Submit Answer</button>
//             </>
//           )}

//           {task === 3 && (
//             <>
//               <div className="messages-container" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
//                 {messages.map((message, index) => (
//                   <h1 key={index}>{message}</h1>
//                 ))}
//                 <div ref={messagesEndRef} />
//               </div>
//               <button onClick={() => window.open('https://www.instagram.com/anuzzjoshi/', '_blank')}>
//   Call Anuj Now
// </button>
//             </>
//           )}

//         </div>
//       )}

   
//     </div>
//   );
// };

// export default ProposalGame;
