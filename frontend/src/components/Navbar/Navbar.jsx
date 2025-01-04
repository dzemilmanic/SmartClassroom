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
      SmartClassroom
      </div>
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        {isLoggedIn && (
          <>
            {role !== "Admin" && <a href="/notifications">Notifications</a>}
            {(role !== "Roditelj" && role !== "Admin") && <a href="/materials">Materials</a>}
            {role !== "Admin" && <a href="/meetings">Meeting</a>}
            {role === "Razredni" && <a href="/chat">Assistant in work</a>}
            {role === "Dete" && (
              <div className="dropdown">
                <select onChange={handleDropdownChange} defaultValue="">
                  <option value="asistent" selected >Assistant in learning</option>
                  <option value="image">Explain the picture</option>
                </select>
              </div>
            )}
            {role !== "Admin" && <a href="/lostandfound">Lost and Found</a>}
            {role === "Admin" && <a href="/admin/createuser">Add user</a>}
            {role === "Roditelj" && <a>Parent's Corner</a>}
            {role !== "" && <a href="/profile">Profile</a>}
            <a onClick={handleLogout} href="#">
              Logout
            </a>
          </>
        )}
        {!isLoggedIn && (
          <>
            <a href="/auth?mode=login">Log in </a>
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
