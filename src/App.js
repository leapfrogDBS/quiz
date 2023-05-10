import React from "react"
import './App.css';
import Question from './components/Question'
import { nanoid } from 'nanoid';


function App() {

  /* Declare state variables */
  const [questions, setQuestions] = React.useState([])
  const [correctAnswerCount, setCorrectAnswerCount] = React.useState(null);
  const [gameComplete, setGameComplete] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(null);


  // A helper function to generate answer choices
  function generateAnswerChoices(question) {
    const choices = [...question.incorrect_answers, question.correct_answer];
    const shuffledChoices = shuffleArray(choices); // assuming you have a shuffleArray function

    return shuffledChoices.map(choice => ({
      key: nanoid(),
      answer: choice,
      isCorrect: choice === question.correct_answer,
    }));
  }
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
    return array;
  }

  // The startQuiz function with the helper function
  function startQuiz() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => {
        const modifiedData = data.results.map(question => {
          const answerChoices = generateAnswerChoices(question);
          const correctAnswerKey = answerChoices.find(choice => choice.isCorrect).key;
          return {
            ...question,
            id: nanoid(),
            answerChoices,
            correctAnswerKey,
            selectedAnswerKey: null,
          };
        });
        setQuestions(modifiedData);
      })      
      .catch(err => {
        console.log(err);
        setErrorMessage("Failed to load questions, please try again later.");
      });
  }

  

  function handleAnswerSelect(questionId, selectedAnswerKey) {
    setQuestions(prev => {
      return prev.map(q => {
        if (q.id === questionId) {
          return {...q, selectedAnswerKey: selectedAnswerKey};
        } else {
          return q;
        }
      });
    });
  }

  function checkAnswers() {
    if (!gameComplete) {
      let count = 0; // Initialize count
      for (let i = 0; i < questions.length; i++) {
        if (questions[i].selectedAnswerKey === questions[i].correctAnswerKey) {
              count++; // Increment count if the answer is correct
          }
      }
      setCorrectAnswerCount(count) // Set the correct answer count
      setGameComplete(true) // Set game complete
      
    } else {
      setGameComplete(false) // Set game complete to false
      setCorrectAnswerCount(null) // Reset correct answer count
      startQuiz(); // Start a new game
      }
  }


  return (
    <div className="App">
      
      {!questions.length ? (
      <section className="start">
        {errorMessage && <h2>{errorMessage}</h2>}
        <h1 className="startSceeen__title">Quizical</h1>
        <p className="start__description">Some Description if neeed</p>
        <button 
          onClick={startQuiz}
          className="blue_button start_button"
        >
          Start Quiz
        </button>
      </section>
      ) : (
      <section className="questions">
        
        <div className="questions-container">
          {questions.map((question) =>
            <Question 
              key={question.id}
              question={question}
              id={question.id}
              gameComplete={gameComplete} // pass gameComplete as a prop
              onAnswerSelect={handleAnswerSelect} />
          )}
        </div>
        <div className="results">
          {correctAnswerCount !== null && (
            <h3 className="results-text">You scored {correctAnswerCount}/{questions.length} correct answers</h3>
          )}
          <button 
            onClick={checkAnswers} 
            className="blue_button check_button"
          >
            {gameComplete ? "Play Again" : "Check answers"}
          </button>
        </div>
      </section>
      )}  

    </div>
  );
}

export default App;
