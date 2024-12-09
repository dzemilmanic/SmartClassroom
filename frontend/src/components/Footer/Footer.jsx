import React from 'react';
import { useNavigate } from "react-router-dom";
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const role = localStorage.getItem("role")

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>O nama</h3>
          <p>SmartRazred je digitalna platforma koja povezuje roditelje, učenike i nastavnike kako bi unapredila obrazovni proces. Naša platforma omogućava jednostavnu razmenu materijala, organizovanje sastanaka i pružanje podrške učenicima kroz alate kao što su asistenti za učenje. S ciljem poboljšanja komunikacije i organizacije, SmartRazred pruža sveobuhvatno rešenje za efikasno praćenje obrazovnog napretka i podršku svakom članu obrazovnog sistema.</p>
        </div>
        <div className="footer-section">
          
        {role && (
  <>
    <h3>Brzi linkovi</h3>
    <ul>
      {role !== "Admin" && (
        <li>
          <a onClick={() => navigate("/notifications")}>Obavestenja</a>
        </li>
      )}
      {(role === "Razredni" || role === "Dete") && (
        <li>
          <a onClick={() => navigate("/materials")}>Materijali</a>
        </li>
      )}
      {role !== "Admin" && (
        <li>
          <a onClick={() => navigate("/meetings")}>Sastanak</a>
        </li>
      )}
    </ul>
  </>
)}

        </div>
        <div className="footer-section">
          <h3>Kontakt informacije</h3>
          <p>Email: info@smartRazred.com</p>
          <p>Telefon: 020 381 381</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SmartRazred. Sva prava zadržana.</p>
      </div>
    </footer>
  );
}

export default Footer;
