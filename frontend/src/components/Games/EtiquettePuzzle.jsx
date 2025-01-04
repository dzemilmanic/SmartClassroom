import React, { useState } from "react";
import { Puzzle } from "lucide-react";
import './InternetSafetyGame.css';
import Header from "../Header/Header";

function EtiquettePuzzle() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0); 
  const [isGameOver, setIsGameOver] = useState(false);

  const questions = [
    { question: "What behavior is best in society?", options: ["Listen to your elders", "Be uninterested", "Laugh when others fall"], correctAnswer: "Listen to your elders" },
    { question: "What should you do if you see someone sharing personal information online?", options: ["Inform the adults", "Ignore", "Act the same as they do"], correctAnswer: "Inform the adults" },
    // ... ostatak pitanja ...
  ];

  const handleAnswerSelection = (answer) => {
    if (!selectedAnswers.includes(answer)) {
      setSelectedAnswers((prevAnswers) => [...prevAnswers, answer]);
    }
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    }
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setCorrectAnswers(0);
    setIsGameOver(false);
  };

  return (
    <>
      <Header title="Behavioral Rules Puzzle" />
      <div className="game-container-safety">
        {isGameOver ? (
          <div className="game-over">
            <Puzzle className="game-over-icon" />
            <h3>
              {correctAnswers === questions.length ? "Winner!" : "Try again!"}
            </h3>
            <p>Number of correct answers: {correctAnswers} od {questions.length}</p>
            <button onClick={restartGame}>Play again</button>
          </div>
        ) : (
          <div>
            <h3>{questions[currentQuestionIndex].question}</h3>
            <div className="answers">
              {questions[currentQuestionIndex].options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswerSelection(option)}
                  className="answer-button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default EtiquettePuzzle;
