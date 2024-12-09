import React, { useEffect, useState } from "react";
import "./Material.css";
import API_URL from "../../API_URL";
import Header from "../../components/Header/Header";
import { useNavigate } from "react-router-dom";

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  async function handleDelete(id) {
    try {
      const response = await fetch(`${API_URL}/materials/${id}`, {
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
    navigate("/materials/creatematerial");
  }

  useEffect(() => {
    async function fetchAllMaterials() {
      try {
        const response = await fetch(`${API_URL}/materials`);
        if (!response.ok) {
          console.error(`Greška: HTTP status ${response.status}`);
          return;
        }
        const data = await response.json();
        setMaterials(data);
      } catch (error) {
        console.error("Greška prilikom dohvaćanja materijala:", error);
      }
    }
    fetchAllMaterials();
  }, []);

  return (
    <>
      <Header title="Materijali" />
      <div className="material">
        {role === "Razredni" && (
          <button className="add-material" onClick={handleAdd}>
            Dodaj materijal
          </button>
        )}
        <div className="materials-container">
          {materials
            .filter((material) => {
              if (userId) {
                return material.createdBy === userId;
              }
              return true;
            })
            .map((material, index) => (
              <div
                className={`material-card ${
                  index % 2 === 0 ? "even-card" : "odd-card"
                }`}
                key={material.id}
              >
                <h1 className="material-title">{material.title}</h1>
                <p className="material-description">{material.description}</p>
                <a
                  className="material-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://${material.link}`}
                >
                  Link do materijala
                </a>
                <p className="material-type">{material.type}</p>
                <p className="material-date">
                  {new Date(material.date).toLocaleDateString("sr-RS", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </p>
                {role === "Razredni" && (
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(material.id)}
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

export default Material;
