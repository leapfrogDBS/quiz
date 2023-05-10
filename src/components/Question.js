import React from "react"
import he from 'he'

export default function Question({ id, question, onAnswerSelect, gameComplete }) { // destructure props
   
    function handleChange(e) {
        onAnswerSelect(id, e.target.value);
    }
                        
    return (
        <div className="question">
            <h2 className="question-text">Question: {he.decode(question.question)}</h2>
            <p >Key: {question.id}</p>
            <p >Answer: {question.correct_answer}</p>
            <div className="answer-choices">
                {question.answerChoices.map((choice, index) => (
                    <div className="answer-choice" key={index}>
                        <input 
                        type="radio"
                        id={`choice-${id}-${index}`} 
                        name={`${id}-answer`} 
                        value={choice.key} 
                        onChange={handleChange}
                        disabled={gameComplete} 
                        />
                        <label 
                            htmlFor={`choice-${id}-${index}`}
                            className={
                            gameComplete 
                            ? (choice.key === question.correctAnswerKey 
                            ? "correct-answer" 
                            : (choice.key === question.selectedAnswerKey ? "selected incorrect-answer" : "incorrect-answer")
                            )
                            : ""
                            }
                        >
                        {he.decode(choice.answer)}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}