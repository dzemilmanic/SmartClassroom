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
          <Header title={"Uči i igraj se!"} />
          <div className="features-grid">
            <div className="feature-card">
              <h3>Bezbednost na internetu</h3>
              <p>
                Internet je postao ključni deo našeg života, ali kao i u
                stvarnom svetu, i na internetu je potrebno biti oprezan.
                Bezbednost na internetu je vrlo važna, posebno za decu, jer
                internet može biti opasno mesto ako se ne koristi na pravi
                način.
              </p>
              <Link to="/games/internetSafetyGame">
                <button className="play-button">Igraj sada!</button>
              </Link>
            </div>
            <div className="feature-card">
              <h3>Prepoznaj phishing poruke</h3>
              <p>
                Phishing je vrsta prevare u kojoj prevaranti pokušavaju da te
                navedu da otkriješ svoje lične podatke, kao što su lozinke,
                brojevi kartica ili drugi osjetljivi podaci, putem lažnih
                poruka. Ove poruke mogu izgledati kao da dolaze od poznatih
                kompanija, prijatelja ili čak učitelja, ali zapravo se radi o
                pokušaju krađe.
              </p>
              <Link to="/games/phishingGame">
                <button className="play-button">Igraj sada!</button>
              </Link>
            </div>
            <div className="feature-card">
              <h3>Slagalica pravila ponašanja</h3>
              <p>
                Ova igra je zamišljena kao zabavan način da deca nauče osnovna
                pravila ponašanja, kako na internetu, tako i u svakodnevnom
                životu. Slagalica će omogućiti deci da povežu pravilna ponašanja
                sa situacijama, čime će se poboljšati njihove socijalne veštine
                i sposobnost donošenja ispravnih odluka u različitim životnim
                okolnostima.
              </p>
              <Link to="games/etiquettePuzzle">
                <button className="play-button">Igraj sada!</button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;