import React, { useState } from "react";
import "./PhisingGame.css";
import Header from "../Header/Header";
function PhishingGame() {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const questions = [
    {
      question: "Is this email a phishing attempt?",
      message: "You are asked to enter your card details to claim a reward.",
      answers: ["Yes", "No"],
      correctAnswer: "Yes",
    },
    {
      question: "Is this email a phishing attempt?",
      message: "This is a notification from your bank about an unauthorized login attempt.",
      answers: ["Yes", "No"],
      correctAnswer: "No",
    },
    {
      question: "Is this email a phishing attempt?",
      message: "You received an email from 'Amazon' notifying you that you must reset your password due to suspicious activity on your account.",
      answers: ["Yes", "No"],
      correctAnswer: "Yes",
    },
    {
      question: "Is this email a phishing attempt?",
      message: "The message claims that a package has arrived for you, but asks you to click a link to enter delivery details.",
      answers: ["Yes", "No"],
      correctAnswer: "Yes",
    },
    {
      question: "Is this email a phishing attempt?",
      message: "This is a notification from your bank informing you that your account has been successfully closed due to inactivity, with instructions on how to log in again.",
      answers: ["Yes", "No"],
      correctAnswer: "No",
    },
    {
      question: "Is this email a phishing attempt?",
      message: "The message claims you’ve received a free travel voucher but asks you to enter your card details.",
      answers: ["Yes", "No"],
      correctAnswer: "Yes",
    },
    {
      question: "Is this email a phishing attempt?",
      message: "A notification from your internet service provider says your account will be suspended if you don’t pay immediately, but includes a suspicious payment link.",
      answers: ["Yes", "No"],
      correctAnswer: "Yes",
    },
    {
      question: "Is this email a phishing attempt?",
      message: "The email informs you that you’ve won a lottery prize but asks you to enter personal details to claim it.",
      answers: ["Yes", "No"],
      correctAnswer: "Yes",
    },
    {
      question: "Is this email a phishing attempt?",
      message: "An email from 'Netflix' informs you that your subscription has been blocked and asks you to click a link to reactivate it.",
      answers: ["Yes", "No"],
      correctAnswer: "Yes",
    },
  ];

  const handleAnswer = (answer) => {
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <>
    <Header title="Phishing Message Recognition"/>
    <div className="phishing-game-container">
      {isGameOver ? (
        <div className="phishing-game-over">
          <h3 className="phishing-game-over-title">Game Over!</h3>
          <p className="phishing-game-over-score">Your result is: {score} of {questions.length}</p>
        </div>
      ) : (
        <div className="phishing-game-question-section">
          <h3 className="phishing-game-question">{questions[currentQuestionIndex].question}</h3>
          <p className="phishing-game-message">{questions[currentQuestionIndex].message}</p>
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className="phishing-game-answer-button"
            >
              {answer}
            </button>
          ))}
        </div>
      )}
    </div>
    </>
    
  );
}

export default PhishingGame;
