import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";
import Header from "../../components/Header/Header";
import Modal from "../../components/Modal/Modal"; // Updated Modal
import API_URL from "../../API_URL";
import AuthContext from "../../context/AuthContext";

function ChangePassword() {
  const { userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/;

  const validate = () => {
    const errors = {};
    if (!passwords.oldPassword) {
      errors.oldPassword = "Stara lozinka je obavezna";
    } else if (!passwordRegex.test(passwords.oldPassword)) {
      errors.oldPassword =
        "Lozinka mora imati najmanje 6 znakova, uključujući veliko i malo slovo i broj";
    }
    if (!passwords.newPassword) {
      errors.newPassword = "Nova lozinka je obavezna";
    } else if (!passwordRegex.test(passwords.newPassword)) {
      errors.newPassword =
        "Lozinka mora imati najmanje 6 znakova, uključujući veliko i malo slovo i broj";
    } else if (passwords.oldPassword === passwords.newPassword) {
      errors.newPassword = "Nova lozinka ne sme biti ista kao trenutna lozinka";
    }
    if (!passwords.confirmPassword) {
      errors.confirmPassword = "Potvrda lozinke je obavezna";
    } else if (passwords.confirmPassword !== passwords.newPassword) {
      errors.confirmPassword = "Lozinke se ne podudaraju";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      const response = await fetch(
        `${API_URL}/users/${userId}/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        setError(error.message || "Došlo je do greške");
        setIsModalOpen(true);
        return;
      }
      window.scrollTo(0,0);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Greška u mreži. Pokušajte ponovo kasnije.");
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Header title="Promena lozinke" />
      <div className="change-password">
        <div className="password-form-container">
          <form onSubmit={handleSubmit} className="password-form">
            <div className="form-group">
              <label style={{color:"white"}}>Trenutna lozinka</label>
              <input
                type="password"
                value={passwords.oldPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, oldPassword: e.target.value })
                }
                required
              />
              {formErrors.oldPassword && (
                <div className="error-message">{formErrors.oldPassword}</div>
              )}
            </div>

            <div className="form-group">
              <label style={{color:"white"}}>Nova lozinka</label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                required
              />
              {formErrors.newPassword && (
                <div className="error-message">{formErrors.newPassword}</div>
              )}
            </div>

            <div className="form-group">
              <label style={{color:"white"}}>Potvrdite novu lozinku</label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />
              {formErrors.confirmPassword && (
                <div className="error-message">
                  {formErrors.confirmPassword}
                </div>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Promenite lozinku
            </button>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        errorMessage={error}
      >
        <h2>Greška</h2>
        <p>Unesite ispravnu lozinku</p>
      </Modal>
    </>
  );
}

export default ChangePassword;
