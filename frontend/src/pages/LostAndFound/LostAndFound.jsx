import React, { useEffect, useState } from "react";
import "./LostAndFound.css";
import API_URL from "../../API_URL";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const LostAndFound = () => {
  const [lostAndFounds, setLostAndFounds] = useState([]);
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  async function handleDelete(id) {
    if (role !== "Razredni" && role !== "Dete") {
      alert("Nemate pravo da brišete ovu stavku.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/lostFound/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
    navigate("/lostandfound/createlostandfound");
  }

  useEffect(() => {
    async function fetchAllLostAndFounds() {
      try {
        const response = await fetch(`${API_URL}/lostFound`);
        if (!response.ok) {
          console.error(`Greška: HTTP status ${response.status}`);
          return;
        }
        const data = await response.json();
        setLostAndFounds(data);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja materijala:", error);
      }
    }
    fetchAllLostAndFounds();
  }, []);

  return (
    <>
      <Header title="Izgubljene stvari" />
      <div className="lost-and-found">
        <button className="add-material" onClick={handleAdd}>
          Dodaj izgubljeno/nađeno
        </button>
        <div className="lost-and-found-container">
          {lostAndFounds.map((lostAndFound, index) => (
            <div
              key={lostAndFound.id}
              className={`lost-and-found-card ${
                index % 2 === 0 ? "even-card" : "odd-card"
              }`}
            >
              <h1>{lostAndFound.title}</h1>
              <p>{lostAndFound.description}</p>
              <p style={{ fontWeight: "520" }}>Škola: {lostAndFound.school}</p>
              <p className="author">Autor: {lostAndFound.createdBy}</p>
              <p className="date">
                {new Date(lostAndFound.date).toLocaleDateString("sr-RS", {
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                })}
              </p>

              {(role === "Razredni" || userId === lostAndFound.createdBy) && (
                <button
                  className="delete-button"
                  onClick={() => handleDelete(lostAndFound.id)}
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

export default LostAndFound;
