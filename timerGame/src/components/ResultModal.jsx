import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

    const ResultModal =  forwardRef(function({targetTime, remainingTime, onRestart}, ref) {
    
    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);
    
    const dialog2 = useRef();
    useImperativeHandle(ref, () => {
        return{
            open() {
                dialog2.current.showModal();
            }
        }
    });

    return(createPortal(
        <dialog ref={dialog2} className="result-modal" onClose={onRestart}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score: {score}</h2>}
            <p>The target time was <strong>{targetTime} seconds.</strong></p>
            <p>You stopped the timer with <strong>{formattedRemainingTime} seconds</strong> left</p>
            <form method="dialog" onSubmit={onRestart}>
                <button>Close</button>
            </form>
        </dialog>, 
        document.getElementById('modal')
        )
    )
})

export default ResultModal;