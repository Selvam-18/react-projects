import { useState } from "react";


export default function UserInput ({onStateChange, userInput}) {


    // const [userInput, setUserInput] = useState({
    //     initialInvestment: 10000,
    //     annualInvestment: 2000,
    //     expectedReturn: 6,
    //     duration:10
    // });

    // function handleChange(inputIdentifier, newValue){
    //     console.log(newValue);
    //     setUserInput( (prevUserInput) => {
    //         return{
    //             ...prevUserInput,
    //             [inputIdentifier] : newValue
    //         };
    //     } );
    // }


    // This state is lifed up, and put into App component

    return(
        <section id="user-input">
            <div className="input-group">
                <p>
                    <label>Initial Investment</label>
                    <input 
                        type="number" 
                        value={userInput.initialInvestment}
                        required 
                        onChange={(event) => onStateChange('initialInvestment', event.target.value )}/>
                </p>
                <p>
                    <label>Annual Investment</label>
                    <input 
                        type="number" 
                        value={userInput.annualInvestment}
                        required 
                        onChange={(event) => onStateChange('annualInvestment', event.target.value )}/>
                </p>
            </div>
            <div className="input-group">
                <p>
                    <label>Expected Return</label>
                    <input 
                        type="number" 
                        value={userInput.expectedReturn}
                        required 
                        onChange={(event) => onStateChange('expectedReturn', event.target.value )}/>
                </p>
                <p>
                    <label>Duration</label>
                    <input 
                        type="number" 
                        value={userInput.duration}
                        required 
                        onChange={(event) => onStateChange('duration', event.target.value )}/>
                </p>
            </div>
        </section>
    )
}