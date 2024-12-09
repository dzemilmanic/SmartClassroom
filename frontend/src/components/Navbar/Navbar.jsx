import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, logout } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function handleLogout() {
    logout();
    navigate("/");
  }

  function handleDropdownChange(event) {
    const selectedOption = event.target.value;
    if (selectedOption === "asistent") {
      navigate("/chat");
    } else if (selectedOption === "image") {
      navigate("/chat/image");
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        SmartRazred
      </div>
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        {isLoggedIn && (
          <>
            {role !== "Admin" && <a href="/notifications">Obaveštenja</a>}
            {(role !== "Roditelj" && role !== "Admin") && <a href="/materials">Materijali</a>}
            {role !== "Admin" && <a href="/meetings">Sastanak</a>}
            {role === "Razredni" && <a href="/chat">Asistent u radu</a>}
            {role === "Dete" && (
              <div className="dropdown">
                <select onChange={handleDropdownChange} defaultValue="">
                  <option value="asistent" selected >Asistent u učenju</option>
                  <option value="image">Objasni sliku</option>
                </select>
              </div>
            )}
            {role !== "Admin" && <a href="/lostandfound">Izgubljeno nađeno</a>}
            {role === "Admin" && <a href="/admin/createuser">Dodaj korisnika</a>}
            {role === "Roditelj" && <a>Roditeljski Kutak</a>}
            {role !== "" && <a href="/profile">Profil</a>}
            <a onClick={handleLogout} href="#">
              Logout
            </a>
          </>
        )}
        {!isLoggedIn && (
          <>
            <a href="/auth?mode=login">Prijavi se</a>
          </>
        )}
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span className="line"></span>
        <span className="line"></span>
        <span className="line"></span>
      </div>
    </nav>
  );
};

export default Navbar;
