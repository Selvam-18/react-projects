import { useRef } from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    const shuffeledAnswers = useRef();
    // console.log(answers);
    if(!shuffeledAnswers.current) {
        shuffeledAnswers.current = [...answers];
        // console.log(shuffeledAnswers);
        shuffeledAnswers.current.sort(() => Math.random() - 0.5);
        // console.log(shuffeledAnswers);
    }

    return(
        <ul id="answers">
                    {shuffeledAnswers.current.map((answer) =>{
                        let isSelected = selectedAnswer === answer;
                        let cssClasses = '';
                        if (answerState === 'answered' && isSelected) {
                            cssClasses = 'selected';
                        }
                        if((answerState=='correct' || answerState=='wrong') && isSelected) {
                            cssClasses = answerState;
                        }
                        return <li key={answer} className="answer">
                            <button className={cssClasses} onClick={() => onSelect(answer)} disabled={answerState !== ''}>{answer}</button>
                        </li>
                    }
                    )}
                </ul>
    )
}