import React, { useState, useEffect } from "react";
import "./Tests.css";

const mathQuestions = [
  {
    question: "What is 5 + 3 * 2?",
    answer: "11",
    incorrectAnswers: ["13", "14", "15"],
  },
  {
    question: "What is 12 x 3 + 4?",
    answer: "40",
    incorrectAnswers: ["36", "42", "45"],
  },
  {
    question: "What is 15 - 8 / 4?",
    answer: "13",
    incorrectAnswers: ["12", "10", "14"],
  },
  {
    question: "What is 100 / 5?",
    answer: "20",
    incorrectAnswers: ["15", "25", "30"],
  },
  {
    question: "What is 9 * 8?",
    answer: "72",
    incorrectAnswers: ["68", "74", "80"],
  },
  {
    question: "What is 5^3?",
    answer: "125",
    incorrectAnswers: ["100", "150", "200"],
  },
];

const englishQuestions = [
  {
    question: "How do you say 'hello' in Bosnian??",
    answer: "Zdravo",
    incorrectAnswers: ["Ćao", "Doviđenja", "Pozdrav"],
  },
  {
    question: "What is the opposite of 'hot'??",
    answer: "Cold",
    incorrectAnswers: ["Warm", "Cool", "Freezing"],
  },
  {
    question: "How do you say 'Good morning' in Bosnian?",
    answer: "Dobro jutro",
    incorrectAnswers: ["Dobro veče", "Laku noć", "Zdravo"],
  },
  {
    question: "What does 'Doviđenja' mean?",
    answer: "Goodbye",
    incorrectAnswers: ["Hello", "Good morning", "Bye"],
  },
  {
    question: "How do you say 'Thank you' in Bosnian?",
    answer: "Hvala",
    incorrectAnswers: ["Izvini", "Molim te", "Pozdrav"],
  },
];

const logicQuestions = [
  {
    "question": "If all cats are animals, and some animals are dogs, are all cats dogs?",
    "answer": "No",
    "incorrectAnswers": ["Yes", "Maybe", "No answer"]
  },
  {
    "question": "What comes next in the sequence: 2, 7, 12, 17, __?",
    "answer": "22",
    "incorrectAnswers": ["18", "19", "23"]
  },
  {
    "question": "If you have 3 apples and take away 2, how many do you have?",
    "answer": "2",
    "incorrectAnswers": ["1", "3", "4"]
  },
  {
    "question": "If 5 > 3 and 3 > 2, is 5 > 2?",
    "answer": "Yes",
    "incorrectAnswers": ["No", "Maybe", "No answer"]
  },
  {
    "question": "Which number follows in the sequence: 3, 6, 9, 12, __?",
    "answer": "15",
    "incorrectAnswers": ["13", "14", "16"]
  }
];

const historyQuestions = [
  {
    "question": "What was the First World War?",
    "answer": "World War I",
    "incorrectAnswers": ["World War II", "Cold War", "Crimean War"]
  },
  {
    "question": "Who was the first emperor of Rome?",
    "answer": "Augustus",
    "incorrectAnswers": ["Caesar", "Nero", "Julius Caesar"]
  },
  {
    "question": "When did World War II begin?",
    "answer": "1939",
    "incorrectAnswers": ["1941", "1945", "1929"]
  },
  {
    "question": "Who was the leader of the Soviet Union during World War II?",
    "answer": "Stalin",
    "incorrectAnswers": ["Lenin", "Khrushchev", "Brezhnev"]
  },
  {
    "question": "What was the date of the signing of the Treaty of Versailles?",
    "answer": "1919",
    "incorrectAnswers": ["1918", "1923", "1939"]
  }
];

const geographyQuestions = [
  {
    "question": "What is the largest ocean in the world?",
    "answer": "Pacific",
    "incorrectAnswers": ["Atlantic", "Indian", "Arctic"]
  },
  {
    "question": "Which country has the largest population?",
    "answer": "China",
    "incorrectAnswers": ["India", "USA", "Russia"]
  },
  {
    "question": "What is the capital city of France?",
    "answer": "Paris",
    "incorrectAnswers": ["Marseille", "Lyon", "Bordeaux"]
  },
  {
    "question": "Which continent is the youngest?",
    "answer": "Antarctica",
    "incorrectAnswers": ["Africa", "Asia", "Europe"]
  },
  {
    "question": "What is the highest mountain in the world?",
    "answer": "Mount Everest",
    "incorrectAnswers": ["K2", "Kangchenjunga", "Makalu"]
  }
];
  

const Tests = () => {
  const [selectedTest, setSelectedTest] = useState(null); // Initially no test is selected
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [timer, setTimer] = useState(5);
  const [isGameOver, setIsGameOver] = useState(false);
  const [questionsList, setQuestionsList] = useState([]);
  const [answerOptions, setAnswerOptions] = useState([]);

  const questions = {
    mathematics: mathQuestions,
    english: englishQuestions,
    logic: logicQuestions,
    history: historyQuestions, // Dodato pitanje za istoriju
    geography: geographyQuestions, // Dodato pitanje za geografiju
  };
  

  // Function to shuffle and pick 5 random questions
  const getRandomQuestions = (questionsArray) => {
    const shuffled = [...questionsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  // Function to generate random answer options, only once per question
  const getAnswerOptions = (question) => {
    const allAnswers = [question.answer, ...question.incorrectAnswers];
    return allAnswers.sort(() => Math.random() - 0.5); // Shuffle the answers
  };

  // Start timer when a question is displayed
  useEffect(() => {
    if (timer > 0 && !isGameOver) {
      const interval = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !isGameOver) {
      handleTimeOut();
    }
  }, [timer]);

  // Set answer options when the question changes
  useEffect(() => {
    if (selectedTest && questionsList.length > 0) {
      const currentQuestion = questionsList[currentQuestionIndex];
      setAnswerOptions(getAnswerOptions(currentQuestion));
    }
  }, [currentQuestionIndex, selectedTest, questionsList]);

  const handleTimeOut = () => {
    setIncorrect(incorrect + 1);
    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(5); // Reset timer for the next question
    } else {
      setIsGameOver(true);
    }
  };

  const handleAnswer = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      setScore(score + 1);
    } else {
      setIncorrect(incorrect + 1);
    }

    if (currentQuestionIndex < questionsList.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setTimer(5); // Reset timer for the next question
    } else {
      setIsGameOver(true);
    }
  };

  const handleTestSelection = (test) => {
    setSelectedTest(test);
    const selectedQuestions = getRandomQuestions(questions[test]);
    setQuestionsList(selectedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setIncorrect(0);
    setIsGameOver(false);
    setTimer(5);
  };

  const currentQuestion = questionsList[currentQuestionIndex];

  // Function to display custom message based on score
  const displayMessage = () => {
    if (score === 5) {
      return <p>Well done! You scored 5/5!</p>;
    } else if (score === 0) {
      return <p>You need to practice more!</p>;
    }
    return null;
  };

  return (
    <div className="test-container">
      {!selectedTest ? (
        <div>
          <h2>Choose a subject for testing</h2>
          <button onClick={() => handleTestSelection("mathematics")}>
          Mathematics
          </button>
          <button onClick={() => handleTestSelection("english")}>
          English
          </button>
          <button onClick={() => handleTestSelection("logic")}>Logic</button>
          <button onClick={() => handleTestSelection("history")}>History</button> {/* Dodato dugme za istoriju */}
          <button onClick={() => handleTestSelection("geography")}>Geography</button> {/* Dodato dugme za geografiju */}
        </div>
      ) : !isGameOver ? (
        <div>
          <div className="timer">Remaining time: {timer}s</div>
          <h3>{currentQuestion?.question}</h3>
          <div className="answers">
            {answerOptions.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(answer, currentQuestion.answer)}
                className="answer-button"
              >
                {answer}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h3>End of the game</h3>
          <p>Your result: {score}</p>
          <p>Incorrect answers: {incorrect}</p>
          {displayMessage()}
          <button onClick={() => setSelectedTest(null)}>
          Return to the test section.
          </button>
        </div>
      )}
    </div>
  );
}

export default Tests;