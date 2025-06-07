import quizOver from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({answersList}) {
    const skippedCount = answersList.filter((answer) => answer ===  null);
    const correctCount = answersList.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

    const skippedRate = Math.round(skippedCount.length / answersList.length * 100);
    const correctRate = Math.round(correctCount.length / answersList.length * 100);
    const wrongRate = 100 - skippedRate - correctRate;


    return(
        <div id="summary">
            <img src={quizOver} alt="Quiz-over-logo" />
            <h2>Quiz Completed!</h2>

            <div id="summary-stats">
                <p>
                    <span className="number">{skippedRate}%</span>
                    <span className="text">Unanswered</span>
                </p>
                <p>
                    <span className="number">{correctRate}%</span>
                    <span className="text">Correct</span>
                </p>
                <p>
                    <span className="number">{wrongRate}%</span>
                    <span className="text">Incorrect</span>
                </p>
            </div>

            <ol>
                {answersList.map((answer, index) =>{
                    let cssClass = 'user-answer';
                    if(answer === QUESTIONS[index].answers[0]){
                        cssClass += ' correct'
                    } else if(answer === null){
                        cssClass += ' skipped'
                    } else {
                        cssClass += ' wrong'
                    }

                    return(
                    <li key={index}>
                        <h3>{index + 1}</h3>
                        <p className="question">{QUESTIONS[index].text}</p>
                        <p className={cssClass}>{answer ? answer : 'Skipped'}</p>
                    </li>)
                
                })}
            </ol>
        </div>
)
}