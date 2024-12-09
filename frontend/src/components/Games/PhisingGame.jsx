import React, { useState } from "react";
import "./PhisingGame.css";
import Header from "../Header/Header";
function PhishingGame() {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const questions = [
    {
      question: "Da li je ova email poruka phishing?",
      message: "Od vas se traži da unesete podatke o kartici kako biste dobili nagradu.",
      answers: ["Da", "Ne"],
      correctAnswer: "Da",
    },
    {
      question: "Da li je ova email poruka phishing?",
      message: "Ovo je obaveštenje iz vaše banke o neovlašćenom pokušaju prijavljivanja.",
      answers: ["Da", "Ne"],
      correctAnswer: "Ne",
    },
    {
      question: "Da li je ova email poruka phishing?",
      message: "Dobijate email od 'Amazon' koji vas obaveštava da morate resetovati lozinku zbog sumnjive aktivnosti na vašem nalogu.",
      answers: ["Da", "Ne"],
      correctAnswer: "Da",
    },
    {
      question: "Da li je ova email poruka phishing?",
      message: "Poruka tvrdi da je stigao paket za vas, ali traži da kliknete link kako biste uneli podatke za dostavu.",
      answers: ["Da", "Ne"],
      correctAnswer: "Da",
    },
    {
      question: "Da li je ova email poruka phishing?",
      message: "Ovo je obaveštenje od vaše banke koje vas obaveštava da je vaš račun uspešno zatvoren zbog neaktivnosti, uz instrukcije kako da se ponovo prijavite.",
      answers: ["Da", "Ne"],
      correctAnswer: "Ne",
    },
    {
      question: "Da li je ova email poruka phishing?",
      message: "Poruka tvrdi da ste dobili besplatan vaučer za putovanje, ali traži da unesete podatke o kartici.",
      answers: ["Da", "Ne"],
      correctAnswer: "Da",
    },
    {
      question: "Da li je ova email poruka phishing?",
      message: "Obaveštenje od vaše internet provajder kompanije kaže da će vaš račun biti suspendovan ako ne platite odmah, ali uključuje sumnjiv link za uplatu.",
      answers: ["Da", "Ne"],
      correctAnswer: "Da",
    },
    {
      question: "Da li je ova email poruka phishing?",
      message: "Email vas obaveštava da ste dobili nagradu u lutriji, ali traži da unesete lične podatke kako biste je preuzeli.",
      answers: ["Da", "Ne"],
      correctAnswer: "Da",
    },
    {
      question: "Da li je ova email poruka phishing?",
      message: "Email od 'Netflix-a' vas obaveštava da je vaša pretplata blokirana i traži da kliknete na link da biste je ponovo aktivirali.",
      answers: ["Da", "Ne"],
      correctAnswer: "Da",
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
    <Header title="Prepoznavanje phishing poruka"/>
    <div className="phishing-game-container">
      {isGameOver ? (
        <div className="phishing-game-over">
          <h3 className="phishing-game-over-title">Kraj igre!</h3>
          <p className="phishing-game-over-score">Vaš rezultat je: {score} od {questions.length}</p>
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
