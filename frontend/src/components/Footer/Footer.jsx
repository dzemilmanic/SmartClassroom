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
          <h3>About Us</h3>
          <p>SmartClassroom is a digital platform that connects parents, students, and teachers to enhance the educational process. Our platform enables easy sharing of materials, organizing meetings, and providing student support through tools such as learning assistants. With the goal of improving communication and organization, SmartClassroom offers a comprehensive solution for effectively tracking educational progress and supporting every member of the educational system.</p>
        </div>
        <div className="footer-section">
          
        {role && (
  <>
    <h3>Quick Links</h3>
    <ul>
      {role !== "Admin" && (
        <li>
          <a onClick={() => navigate("/notifications")}>Notifications</a>
        </li>
      )}
      {(role === "Razredni" || role === "Dete") && (
        <li>
          <a onClick={() => navigate("/materials")}>Materials</a>
        </li>
      )}
      {role !== "Admin" && (
        <li>
          <a onClick={() => navigate("/meetings")}>Meeting</a>
        </li>
      )}
    </ul>
  </>
)}

        </div>
        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>Email: info@smartclassroom.com</p>
          <p>Phone: 020 381 381</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SmartClassroom. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
