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
    { question: "Koje ponašanje je najbolje u društvu?", options: ["Poslušaj starije", "Budi nezainteresovan", "Smej se kada drugi padaju"], correctAnswer: "Poslušaj starije" },
    { question: "Šta bi trebalo da uradiš ako vidiš da neko deli lične informacije na internetu?", options: ["Obavesti odrasle", "Ignoriši", "Deluj isto kao i oni"], correctAnswer: "Obavesti odrasle" },
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
      <Header title="Slagalica pravila ponašanja" />
      <div className="game-container-safety">
        {isGameOver ? (
          <div className="game-over">
            <Puzzle className="game-over-icon" />
            <h3>
              {correctAnswers === questions.length ? "Pobednik!" : "Pokušaj ponovo!"}
            </h3>
            <p>Broj tačnih odgovora: {correctAnswers} od {questions.length}</p>
            <button onClick={restartGame}>Igraj opet</button>
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
