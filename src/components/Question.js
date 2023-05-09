import React from "react"
import he from 'he';

export default function Question(props) {

    /* const [selectedAnswer, setSelectedAnswer] = React.useState('');
    const [isCorrect, setIsCorrect] = React.useState(false); */
    
    const [answerChoices] = React.useState(() => {
        const randomIndex = Math.floor(Math.random() * (props.question.incorrect_answers.length + 1));
        const choices = [...props.question.incorrect_answers]      
        choices.splice(randomIndex, 0, props.question.correct_answer) 
        return choices;
    })

   /* const handleChange = (e) => {
        setSelectedAnswer(e.target.value);
        setIsCorrect(e.target.value === props.question.correct_answer) 
    } */
                        
    return (
        <div className="question">
           <h1>Question instance</h1>
           <p>Question: {he.decode(props.question.question)}</p>
           <p>Key: {props.question.id}</p>
           <p>Answer: {props.question.correct_answer}</p>
           <div className="answer-choices">
              {answerChoices.map((choice, index) => (
                <div className="answer-choice" key={index}>
                    <input type="radio" id={`choice-${props.id}-${index}`} name={`${props.id}-answer`} value={he.decode(choice)} /* onChange={handleChange} */ />
                    <label htmlFor={`choice-${props.id}-${index}`}>{he.decode(choice)}</label>
                </div>
              ))}
           </div>
        </div>
    )
}