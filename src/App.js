import React from "react"
import './App.css';


function App() {
  const [questions, setQuestions] = React.useState([])

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
    .then(res => res.json())
    .then(data => setQuestions(data.results))
  }, [])

  return (
    <div className="App">
      
      <section className="start">
        <h1 className="startSceeen__title">Quizical</h1>
        <p className="start__description">Some Description if neeed</p>
        <button className="start_button">Start Quiz</button>
      </section>

      <section className="questions">
          
      </section>


    </div>
  );
}

export default App;
