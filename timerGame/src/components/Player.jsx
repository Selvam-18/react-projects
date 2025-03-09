import { useState, useRef } from "react";


export default function Player() {
  const playerName = useRef();
  const [enteredName, setEnteredName] = useState(null);
  //const [submitted, setSubmitted] = useState(false);

  // function handlefunction(event) {
  //   setSubmitted(false);
  //   setEnteredName(event.target.value);
  // }

  function handleClick() {
    // setSubmitted(true);
    setEnteredName(playerName.current.value);
    playerName.current.value = '';
  }
  
  return (
    <section id="player">
      <h2>Welcome {enteredName ?? 'User'}</h2> 
      <p>
        <input 
          ref={playerName} 
          type="text" 
          // onChange={handlefunction} 
          // value={enteredName}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
