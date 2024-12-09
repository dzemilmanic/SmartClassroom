import React, { useEffect, useState } from "react";
import "./Notifications.css";
import API_URL from "../../API_URL";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  async function handleDelete(id) {
    if (role !== "Razredni") {
      alert("Nemate pravo da brišete ovu stavku.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/notifications/${id}`, {
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
    navigate("/notifications/createnotification");
  }

  useEffect(() => {
    async function fetchAllNotifications() {
      try {
        const response = await fetch(`${API_URL}/notifications`);
        if (!response.ok) {
          console.error(`Greška: HTTP status ${response.status}`);
          return;
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja obaveštenja:", error);
      }
    }
    fetchAllNotifications();
  }, []);

  return (
    <>
      <Header title="Obaveštenja" />
      <div className="material">
        { role === "Razredni" &&<button className="add-material" onClick={handleAdd}>Kreiraj obaveštenje</button>}
        <div className="notification-container">
          {notifications.map((notification, index) => (
            <div
              className={`notification-card ${
                index % 2 === 0 ? "even-card" : "odd-card"
              }`}
              key={notification.id}
            >
              <h1 className="notification-title">{notification.title}</h1>
              <p className="notification-description">{notification.description}</p>
              <p className="notification-author">
                Starešina: <strong>{notification.createdBy}</strong>
              </p>
              <p className="notification-date">
                {new Date(notification.date).toLocaleDateString("sr-RS", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>
              {role === "Razredni" && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(notification.id)}
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

export default Notifications;
