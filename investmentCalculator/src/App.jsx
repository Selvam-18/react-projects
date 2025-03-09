import Header from "./components/Header.jsx";
import UserInput from "./components/UserInput.jsx";
import Result from "./components/Result.jsx"; //Result component
import { useState } from "react";


function App() {

  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 2000,
    expectedReturn: 6,
    duration:10
});

const inputIsValid = userInput.duration > 0;

function handleChange(inputIdentifier, newValue){
    console.log(typeof(newValue));
    setUserInput( (prevUserInput) => {
        return{
            ...prevUserInput,
            [inputIdentifier] : +newValue // +(unary+ operator) newValue forces the input to change into number 
        };
    } );
}
  return (
    <>
      <Header />
      <UserInput userInput={userInput} onStateChange={handleChange}/>
      {inputIsValid && <Result result={userInput}/>}
      {!inputIsValid && <p className="center">Duration cannot be negative or 0</p>}
      
    </>
  )
}

export default App;
