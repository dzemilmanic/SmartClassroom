import React from "react";
import { Link } from "react-router-dom"; // Importujte Link iz react-router-dom
import "./Home.css";
import Header from "../../components/Header/Header";
import Banner from "../../components/Banner/Banner";

function Home() {
  return (
    <div className="home">
      <Banner />
      <main className="main-content">
        <section className="features">
          <Header title={"Learn and play!"} />
          <div className="features-grid">
            <div className="feature-card">
              <h3>Internet safety</h3>
              <p>
              The internet has become a key part of our lives, but just like in the real world, it is important to be cautious online. Internet safety is very important, especially for children, because the internet can be a dangerous place if not used properly.
              </p>
              <Link to="/games/internetSafetyGame">
                <button className="play-button">Play now!</button>
              </Link>
            </div>
            <div className="feature-card">
              <h3>Recognize phishing messages"</h3>
              <p>
              Phishing is a type of scam where scammers try to trick you into revealing your personal information, such as passwords, credit card numbers, or other sensitive data, through fake messages. These messages may appear to come from well-known companies, friends, or even teachers, but in reality, they are an attempt to steal your information.
              </p>
              <Link to="/games/phishingGame">
                <button className="play-button">Play now!</button>
              </Link>
            </div>
            <div className="feature-card">
              <h3>Puzzle rules of behavior</h3>
              <p>
              This game is designed as a fun way for children to learn basic rules of behavior, both online and in everyday life. The puzzle will allow children to match proper behaviors with situations, thereby improving their social skills and ability to make the right decisions in various life circumstances.
              </p>
              <Link to="games/etiquettePuzzle">
                <button className="play-button">Play now!</button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;