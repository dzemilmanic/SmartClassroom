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
      errors.oldPassword = "Old password is required";
    } else if (!passwordRegex.test(passwords.oldPassword)) {
      errors.oldPassword =
        "Password must be at least 6 characters long and include an uppercase letter, a lowercase letter, and a number.";
    }
    if (!passwords.newPassword) {
      errors.newPassword = "New password is required";
    } else if (!passwordRegex.test(passwords.newPassword)) {
      errors.newPassword =
        "The password must be at least 6 characters long and include an uppercase letter, a lowercase letter, and a number.";
    } else if (passwords.oldPassword === passwords.newPassword) {
      errors.newPassword = "The new password must not be the same as the current password.";
    }
    if (!passwords.confirmPassword) {
      errors.confirmPassword = "Password confirmation is required";
    } else if (passwords.confirmPassword !== passwords.newPassword) {
      errors.confirmPassword = "Passwords do not match";
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
        setError(error.message || "An error has occurred");
        setIsModalOpen(true);
        return;
      }
      window.scrollTo(0,0);
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setError("Network error. Please try again later.");
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
              <label style={{color:"white"}}>Current password</label>
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
              <label style={{color:"white"}}>New password</label>
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
              <label style={{color:"white"}}>Confirm new password</label>
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
            Change password
            </button>
          </form>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        errorMessage={error}
      >
        <h2>Error</h2>
        <p>Enter a valid password</p>
      </Modal>
    </>
  );
}

export default ChangePassword;
