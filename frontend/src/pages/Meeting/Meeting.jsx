import React, { useEffect, useState } from "react";
import "./Meeting.css";
import API_URL from "../../API_URL";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const Meeting = () => {
  const [meetings, setMeetings] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  async function handleDelete(id) {
    if (role !== "Razredni") {
      alert("Nemate pravo da brišete ovu stavku.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/meetings/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        console.log("Greška: Nije uspelo brisanje");
      }
    } catch (error) {
      console.log("Greška: " + error);
    }
    window.location.reload();
  }

  function handleAdd() {
    navigate("/meetings/createmeeting");
  }

  useEffect(() => {
    async function fetchAllMeetings() {
      try {
        const response = await fetch(`${API_URL}/meetings`);
        if (!response.ok) {
          console.error(`Greška: HTTP status ${response.status}`);
          return;
        }
        const data = await response.json();
        setMeetings(data);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja obaveštenja:", error);
      }
    }
    fetchAllMeetings();
  }, []);

  return (
    <>
      <Header title="Sastanak" />
      <div className="material">
        {role === "Razredni" &&<button className="add-material" onClick={handleAdd}>Kreiraj sastanak</button>}
        <div className="notification-container">
          {meetings.map((meeting, index) => (
            <div
              className={`notification-card ${
                index % 2 === 0 ? "even-card" : "odd-card"
              }`}
              key={meeting.id}
            >
              <h1 className="notification-title">{meeting.title}</h1>
              <p className="notification-description">
                <a href={meeting.link} target="_blank" rel="noopener noreferrer">
                  Klik za sastanak
                </a>
              </p>
              <p className="notification-author">
                Starešina: <strong>{meeting.createdBy}</strong>
              </p>
              <p className="notification-date">
                {new Date(meeting.date).toLocaleDateString("sr-RS", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
              {role === "Razredni" && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(meeting.id)}
                >
                  Obriši
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Meeting;
