import { useState, useEffect } from "react"


export default function Timer({timeout, onTimeout, mode}) {
    
    const [remainingTime, setRemainingTime] = useState(timeout);
    useEffect(() => {
        console.log("Timeout")
        const timer = setTimeout(onTimeout, timeout)

        return() => {
            clearTimeout(timer)
        }
    }, [onTimeout, timeout])

    useEffect(()=> {
        console.log("Interval")
        const interval = setInterval(()=>{
            setRemainingTime((prev)=> prev - 100)
        }, 100);
        return () => {
            clearInterval(interval);
        }
    }, [timeout])
    console.log(mode);
    
    return(
        <progress id="question-time" max={timeout} value={remainingTime} className={mode} />
    )
}