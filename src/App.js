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

  return (
    <div className="App">
      
      {!questions.length ? (
      <section className="start">
        <h1 className="startSceeen__title">Quizical</h1>
        <p className="start__description">Some Description if neeed</p>
        <button onClick={startQuiz} className="start_button">Start Quiz</button>
      </section>
      ) : (
      <section className="questions">
        {questions.map((question) =>
          <Question key={question.id} question={question} id={question.id} />
        )}
      </section>
      )}
      

    </div>
  );
}

export default App;
