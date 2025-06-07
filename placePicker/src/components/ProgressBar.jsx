import { useState, useEffect } from 'react';
const TIMER = 3000;

export default function ProgressBar() {
    const [progress, setProgress] = useState(TIMER);
    
      useEffect(()=>{
        const interval = setInterval(() =>{ 
          console.log("Interval");
          setProgress((prev) => prev - 10);
        }, 10);
    
        return () => {
          console.log("Interval ended");
          clearInterval(interval);
        }
      }, []);

      // let color = "yellow";

      // if(progress <= 1200) {
      //   console.log("less than 40%");
      //   color = 'red'
      // } else if( progress > 1200 && progress <= 2400) {
      //   console.log("41-80%")
      //   color = 'orange'
      // } 
      // else if(progress >2400 && progress<=3000){
      //   console.log("More than 80%");
      //   color = 'green'
      // }

    return <progress value={progress} max={TIMER}  /> 
    
}