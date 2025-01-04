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
      alert("You do not have permission to delete this item..");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/notifications/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        console.log("Error: Delete failed");
      }
    } catch (error) {
      console.log("Error: " + error);
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
          console.error(`Error: HTTP status ${response.status}`);
          return;
        }
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error("Error while fetching the notification:", error);
      }
    }
    fetchAllNotifications();
  }, []);

  return (
    <>
      <Header title="Notifications" />
      <div className="material">
        { role === "Razredni" &&<button className="add-material" onClick={handleAdd}>Create notification</button>}
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
                Teacher: <strong>{notification.createdBy}</strong>
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
                  Delete
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
