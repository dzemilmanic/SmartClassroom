import React, { useState } from "react";
import "./InternetSafetyGame.css";
import Header from "../Header/Header";
function InternetSafetyGame() {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const questions = [
    {
      question: "Šta bi trebalo da uradiš ako dobiješ nepoznatu email poruku?",
      answers: [
        "Otvoriti je i kliknuti na linkove",
        "Obrisati je i obavestiti odrasle osobe",
        "Odgovoriti na nju sa ličnim podacima",
      ],
      correctAnswer: "Obrisati je i obavestiti odrasle osobe",
    },
    {
      question: "Koje informacije nikada ne bi trebalo da deliš na internetu?",
      answers: ["Ime i prezime", "Broj telefona", "Lozinke i brojeve kartica"],
      correctAnswer: "Lozinke i brojeve kartica",
    },
    {
      question: "Kako možeš da se zaštitiš od fišing napada na internetu?",
      answers: [
        "Kliknuti na linkove u svim email porukama koje dobijem",
        "Koristiti jake lozinke i dvofaktorsku autentifikaciju",
        "Deliti svoje lozinke sa prijateljima kako bi ih zapamtili",
      ],
      correctAnswer: "Koristiti jake lozinke i dvofaktorsku autentifikaciju",
    },
    {
      question: "Šta je najsigurnije kada koristiš javni Wi-Fi?",
      answers: [
        "Koristiti VPN (Virtuelnu privatnu mrežu)",
        "Uneti svoje lične podatke u aplikacijama",
        "Otvoriti sve linkove u emailovima",
      ],
      correctAnswer: "Koristiti VPN (Virtuelnu privatnu mrežu)",
    },
    {
      question: "Šta bi trebalo da uradiš ako neko pokuša da te zatraži tvoje lozinke na internetu?",
      answers: [
        "Onda im pošaljite lozinku kako bi rešili problem",
        "Odmah prekinuti razgovor i prijaviti to nadležnim organima",
        "Pokušati da ignorisete i nastavite normalno",
      ],
      correctAnswer: "Odmah prekinuti razgovor i prijaviti to nadležnim organima",
    },
    {
      question: "Koje vrste linkova treba izbegavati?",
      answers: [
        "Linkove sa poznatih i sigurnih sajtova",
        "Linkove sa sumnjivih i nepoznatih email adresa",
        "Linkove u porukama od prijatelja",
      ],
      correctAnswer: "Linkove sa sumnjivih i nepoznatih email adresa",
    },
    {
      question: "Kako možeš da proveriš da li je sajt na kojem se nalaziš siguran?",
      answers: [
        "Provjeriti da li URL počinje sa 'http' umesto 'https'",
        "Proveriti da li ima zaključanog lokota pored URL-a",
        "Kliknuti na sve reklame na sajtu da biste proverili da li su sigurne",
      ],
      correctAnswer: "Proveriti da li ima zaključanog lokota pored URL-a",
    },
    {
      question: "Šta bi trebalo da uradiš ako sumnjaš da su tvoji lični podaci ukradeni?",
      answers: [
        "Promeniti lozinke na svim nalozima i obavestiti banku",
        "Ne raditi ništa, podaci nisu vredni",
        "Reći prijateljima da ne brinu",
      ],
      correctAnswer: "Promeniti lozinke na svim nalozima i obavestiti banku",
    },
    {
      question: "Koji je najbolji način za zaštitu svog uređaja od virusa?",
      answers: [
        "Preuzeti antivirusni program i redovno ga ažurirati",
        "Preuzimati sve aplikacije sa nepoznatih izvora",
        "Otvoriti email poruke čak i kada nisu od poznatih pošiljalaca",
      ],
      correctAnswer: "Preuzeti antivirusni program i redovno ga ažurirati",
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
    <Header title="Bezbednost na internetu"/>
    <div className="game-container-safety">
      {isGameOver ? (
        <div className="game-over">
          <h3>Kraj igre!</h3>
          <p>
            Vaš rezultat je: {score} od {questions.length}
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