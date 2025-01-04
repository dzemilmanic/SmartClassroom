import React, { useState } from "react";
import "./InternetSafetyGame.css";
import Header from "../Header/Header";
function InternetSafetyGame() {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const questions = [
    {
      question: "What should you do if you receive an unknown email message?",
      answers: [
        "Open it and click on the links",
        "Delete it and inform adults",
        "Reply with personal information",
      ],
      correctAnswer: "Delete it and inform adults",
    },
    {
      question: "Which information should you never share online?",
      answers: ["Full name", "Phone number", "Passwords and credit card numbers"],
      correctAnswer: "Passwords and credit card numbers",
    },
    {
      question: "How can you protect yourself from phishing attacks online?",
      answers: [
        "Click on links in all emails you receive",
        "Use strong passwords and two-factor authentication",
        "Share your passwords with friends to help them remember",
      ],
      correctAnswer: "Use strong passwords and two-factor authentication",
    },
    {
      question: "What is the safest thing to do when using public Wi-Fi?",
      answers: [
        "Use a VPN (Virtual Private Network)",
        "Enter your personal information in apps",
        "Open all links in emails",
      ],
      correctAnswer: "Use a VPN (Virtual Private Network)",
    },
    {
      question: "What should you do if someone asks for your passwords online?",
      answers: [
        "Then send them your password to resolve the issue",
        "Immediately end the conversation and report it to the authorities",
        "Try to ignore it and continue as usual",
      ],
      correctAnswer: "Immediately end the conversation and report it to the authorities",
    },
    {
      question: "Which types of links should you avoid?",
      answers: [
        "Links from known and secure websites",
        "Links from suspicious and unknown email addresses",
        "Links in messages from friends",
      ],
      correctAnswer: "Links from suspicious and unknown email addresses",
    },
    {
      question: "How can you check if the website you're on is secure?",
      answers: [
        "Check if the URL starts with 'http' instead of 'https'",
        "Check if there is a locked padlock next to the URL",
        "Click on all ads on the site to check if they're safe",
      ],
      correctAnswer: "Check if there is a locked padlock next to the URL",
    },
    {
      question: "What should you do if you suspect your personal data has been stolen?",
      answers: [
        "Change passwords on all accounts and notify your bank",
        "Do nothing, the data isn't valuable",
        "Tell your friends not to worry",
      ],
      correctAnswer: "Change passwords on all accounts and notify your bank",
    },
    {
      question: "What is the best way to protect your device from viruses?",
      answers: [
        "Download antivirus software and update it regularly",
        "Download all apps from unknown sources",
        "Open email messages even if they're from unknown senders",
      ],
      correctAnswer: "Download antivirus software and update it regularly",
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
    <Header title="Internet Safety"/>
    <div className="game-container-safety">
      {isGameOver ? (
        <div className="game-over">
          <h3>Game Over!</h3>
          <p>
          Your score is: {score} of {questions.length}
          </p>
        </div>
      ) : (
        <div className="answers">
          <h3>{questions[currentQuestionIndex].question}</h3>
          {questions[currentQuestionIndex].answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(answer)}
              className="answer-button"
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

export default InternetSafetyGame;