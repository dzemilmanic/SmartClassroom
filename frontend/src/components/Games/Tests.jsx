import React, { useState, useEffect } from "react";
import "./Tests.css";

const mathQuestions = [
  {
    question: "Koliko je 5 + 3 * 2?",
    answer: "11",
    incorrectAnswers: ["13", "14", "15"],
  },
  {
    question: "Koliko je 12 x 3 + 4?",
    answer: "40",
    incorrectAnswers: ["36", "42", "45"],
  },
  {
    question: "Koliko je 15 - 8 / 4?",
    answer: "13",
    incorrectAnswers: ["12", "10", "14"],
  },
  {
    question: "Koliko je 100 / 5?",
    answer: "20",
    incorrectAnswers: ["15", "25", "30"],
  },
  {
    question: "Koliko je 9 * 8?",
    answer: "72",
    incorrectAnswers: ["68", "74", "80"],
  },
  {
    question: "Koliko je 5^3?",
    answer: "125",
    incorrectAnswers: ["100", "150", "200"],
  },
];

const englishQuestions = [
  {
    question: "Kako se kaže 'zdravo' na engleskom?",
    answer: "Hello",
    incorrectAnswers: ["Hi", "Goodbye", "Hey"],
  },
  {
    question: "Šta je suprotno od 'hot'?",
    answer: "Cold",
    incorrectAnswers: ["Warm", "Cool", "Freezing"],
  },
  {
    question: "Kako se kaže 'dobro jutro' na engleskom?",
    answer: "Good morning",
    incorrectAnswers: ["Good evening", "Good night", "Hello"],
  },
  {
    question: "Šta znači 'goodbye'?",
    answer: "Zbogom",
    incorrectAnswers: ["Hello", "Good morning", "Bye"],
  },
  {
    question: "Kako se kaže 'hvala' na engleskom?",
    answer: "Thank you",
    incorrectAnswers: ["Thanks", "Please", "Sorry"],
  },
];

const logicQuestions = [
  {
    question:
      "Ako su sve mačke životinje, a neke životinje psi, jesu li sve mačke psi?",
    answer: "Ne",
    incorrectAnswers: ["Da", "Možda", "Nema odgovora"],
  },
  {
    question: "Šta slijedi u nizu: 2, 7, 12, 17, __?",
    answer: "22",
    incorrectAnswers: ["18", "19", "23"],
  },
  {
    question: "Ako imate 3 jabuke i odnesete 2, koliko ih imate?",
    answer: "2",
    incorrectAnswers: ["1", "3", "4"],
  },
  {
    question: "Ako je 5 > 3 i 3 > 2, da li je 5 > 2?",
    answer: "Da",
    incorrectAnswers: ["Ne", "Možda", "Nema odgovora"],
  },
  {
    question: "Koji broj sledi u nizu: 3, 6, 9, 12, __?",
    answer: "15",
    incorrectAnswers: ["13", "14", "16"],
  },
];
const historyQuestions = [
    {
      question: "Koji je bio prvi svetski rat?",
      answer: "Prvi svetski rat",
      incorrectAnswers: ["Drugi svetski rat", "Hladni rat", "Krimski rat"],
    },
    {
      question: "Ko je bio prvi car Rima?",
      answer: "August",
      incorrectAnswers: ["Cezar", "Neron", "Julije Cezar"],
    },
    {
      question: "Kada je počeo Drugi svetski rat?",
      answer: "1939",
      incorrectAnswers: ["1941", "1945", "1929"],
    },
    {
      question: "Ko je bio lider Sovjetskog Saveza tokom Drugog svetskog rata?",
      answer: "Staljin",
      incorrectAnswers: ["Lenjin", "Hruščov", "Breznjev"],
    },
    {
      question: "Koji je bio datum potpisivanja Versailleskog ugovora?",
      answer: "1919",
      incorrectAnswers: ["1918", "1923", "1939"],
    },
  ];
  
  const geographyQuestions = [
    {
      question: "Koji je najveći okean na svetu?",
      answer: "Pacifik",
      incorrectAnswers: ["Atlantik", "Indijski", "Arktički"],
    },
    {
      question: "Koja država ima najveći broj stanovnika?",
      answer: "Kina",
      incorrectAnswers: ["Indija", "SAD", "Rusija"],
    },
    {
      question: "Koji je glavni grad Francuske?",
      answer: "Pariz",
      incorrectAnswers: ["Marsej", "Lion", "Bordo"],
    },
    {
      question: "Koji kontinent je najmlađi?",
      answer: "Antarktik",
      incorrectAnswers: ["Afrika", "Azija", "Evropa"],
    },
    {
      question: "Koja je najviša planina na svetu?",
      answer: "Mount Everest",
      incorrectAnswers: ["K2", "Kangchenjunga", "Makalu"],
    },
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
      return <p>Svaka čast! Postigao/la si 5/5!</p>;
    } else if (score === 0) {
      return <p>Morate više vežbati!</p>;
    }
    return null;
  };

  return (
    <div className="test-container">
      {!selectedTest ? (
        <div>
          <h2>Odaberite oblast za testiranje</h2>
          <button onClick={() => handleTestSelection("mathematics")}>
            Matematika
          </button>
          <button onClick={() => handleTestSelection("english")}>
            Engleski
          </button>
          <button onClick={() => handleTestSelection("logic")}>Logika</button>
          <button onClick={() => handleTestSelection("history")}>Istorija</button> {/* Dodato dugme za istoriju */}
          <button onClick={() => handleTestSelection("geography")}>Geografija</button> {/* Dodato dugme za geografiju */}
        </div>
      ) : !isGameOver ? (
        <div>
          <div className="timer">Preostalo vreme: {timer}s</div>
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
          <h3>Kraj igre</h3>
          <p>Tvoj rezultat: {score}</p>
          <p>Netačnih odgovora: {incorrect}</p>
          {displayMessage()}
          <button onClick={() => setSelectedTest(null)}>
            Vrati se na sekciju sa testovima
          </button>
        </div>
      )}
    </div>
  );
}

export default Tests;