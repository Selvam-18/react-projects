
import Timer from "./Timer.jsx";
import Answers from "./Answers.jsx";
import { useState } from "react";
import QUESTIONS from "../questions.js";

export default function Questions({index, onSkipAns, onSelectAns}) {
    
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    })

    function handleAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        })


        setTimeout(() =>{
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAns(answer)
            }, 2000)

        },1000)
    }

    let timer = 10000;
    
    if(answer.selectedAnswer) {
        timer = 1000;
    }
    if(answer.isCorrect !== null) {
        timer = 2000;
    }

    let answerState = '';
    if(answer.selectedAnswer && answer.isCorrect !== null) {
        answerState = answer.isCorrect ? 'correct' : 'wrong';
    } else if(answer.selectedAnswer) {
        answerState = 'answered';
    }
    return(
        <div id="question">
            <Timer 
                key={timer}
                timeout={timer} 
                onTimeout={answer.selectedAnswer === '' ? onSkipAns : null}
                mode={answerState}
            />

            <h2>{QUESTIONS[index].text}</h2>
            
            <Answers 
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleAnswer}
            />
        </div>
    )
}