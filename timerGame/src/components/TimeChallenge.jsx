import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimeChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog1 = useRef();
    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;


    // const [timeStarted, setTimeStarted] = useState(false);
    // const [timeExpired, setTimerExpired] = useState(false);
    if(timeRemaining <= 0) {
        clearInterval(timer.current);
        dialog1.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            // setTimerExpired(true);
            // dialog1.current.open();

            setTimeRemaining(prevTime => prevTime - 20);
        }, 20 );
        // setTimeStarted(true);
    }

    function handleRestart() {
        setTimeRemaining(targetTime * 1000);
    }

    function handleStop() {
        clearTimeout(timer.current); 
        dialog1.current.open();
    }
    return (
        <>
        <ResultModal 
            ref={dialog1} 
            result="lost" 
            targetTime={targetTime} 
            remainingTime = {timeRemaining}
            onRestart={handleRestart}
        />
        <section className="challenge">
            <h2>{title}</h2>

            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? "s" : ""}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                    {timerIsActive ? "Stop": "Start"} challenge
                </button>
            </p>
            <p className={timerIsActive ? 'active': undefined}>
                {timerIsActive ? "Timer is ticking" : "Timer Inactive"}
            </p>
        </section>
        </>
    )
}