import { useState, useCallback, useRef } from "react";
import QUESTIONS from "../questions.js";
import Timer from "./Timer.jsx";
import Answers from "./Answers.jsx";
import Questions  from "./Questions.jsx";
import Summary from "./Summary.jsx";
import quizOver from "../assets/quiz-complete.png";


export default function Quiz() {
    // const [answerState, setAnswerState] = useState('');
    const [selectedAns, setSelectedAns] = useState([]);
    const selectedQstnIndex =  selectedAns.length;;
    const quizCompleted = selectedQstnIndex === QUESTIONS.length;


    const handleAnswer = useCallback(function handleAnswer(selectedAnswer) {
        // setAnswerState("answered");
        setSelectedAns((prev)=>{
            return [...prev, selectedAnswer]
        })

        // setTimeout(()=>{
        //     // console.log(QUESTIONS[selectedQstnIndex].answers[0]);
        //     if(selectedAnswer === QUESTIONS[selectedQstnIndex].answers[0]){
        //         setAnswerState("correct")
        //     } else {
        //         setAnswerState("wrong")
        //     }

        //     setTimeout(()=>{
        //         setAnswerState('');
        //     }, 2000)
        // },1000)
    },[])

    const handleSkipAns = useCallback(()=>handleAnswer(null),[handleAnswer])

    if(quizCompleted){
        return(
            <Summary answersList={selectedAns} />
        )
    }
    

    
    return(
        <div id="quiz">

            <Questions 
                key={selectedQstnIndex}
                index={selectedQstnIndex}
                onSelectAns={handleAnswer}
                onSkipAns={handleSkipAns}
            />
            
        </div>
    )
}