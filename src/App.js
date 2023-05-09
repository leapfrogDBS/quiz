import React from "react"
import './App.css';
import Question from './components/Question'
import { nanoid } from 'nanoid';



function App() {
  const [questions, setQuestions] = React.useState([])

function startQuiz() {
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => setQuestions(
      data.results.map((question) => ({ ...question, id: nanoid() }))
    ))
  }

  function checkAnswers() {
    console.log("Button clicked")
  }

  return (
    <div className="App">
      
      {!questions.length ? (
      <section className="start">
        <h1 className="startSceeen__title">Quizical</h1>
        <p className="start__description">Some Description if neeed</p>
        <button onClick={startQuiz} className="blue_button start_button">Start Quiz</button>
      </section>
      ) : (
      <section className="questions">
        {questions.map((question) =>
          <Question key={question.id} question={question} id={question.id} />
        )}
        <button onClick={checkAnswers} className="blue_button check_button">Check answers</button>
      </section>
      )}
      

    </div>
  );
}

export default App;
