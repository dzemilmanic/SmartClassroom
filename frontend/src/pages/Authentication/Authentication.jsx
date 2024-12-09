import { useContext, useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import "./Authentication.css";
import AuthContext from "../../context/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import API_URL from "../../API_URL";
import Modal from "../../components/Modal/Modal";
import Loader from "../../components/Loader/Loader";
export default function Authentication() {
  const { token, login, role} = useContext(AuthContext);
  const [loader, setLoader] = useState(false);
  let mode = useSearchParams()[0].get("mode");
  if (mode) {
    mode = mode.toLowerCase();
  }
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // useEffect(() => {
  //   if (mode !== "login" && !token) {
  //     navigate("/auth?mode=login");
  //   }
  //   if ((mode === "login" && token)) {
  //     navigate("/");
  //   }
  // }, [mode, navigate]);

  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    phone: "",
    address: "",
  });

  // useEffect(() => {
  //   if (token) {
  //     navigate("/");
  //   }
  // }, [token]);

  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    phone: "",
    address: "",
  });

  function handleSwitch() {
    window.scrollTo(0, 0);
    navigate(`/auth?mode=${mode === "login" ? "register" : "login"}`);
  }

  const validate = () => {
    const errors = {};

    // Email validation
    if (!formData.email) {
      errors.email = "Email je obavezan";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    // Password validation using regex for length and character conditions
    if (!formData.password) {
      errors.password = "Lozinka je obavezna";
    } else {
      const passwordErrors = [];
      if (formData.password.length < 6)
        passwordErrors.push("Lozinka mora imati najmanje 6 znakova");
      if (!/[A-Z]/.test(formData.password))
        passwordErrors.push("Lozinka mora imati najmanje jedno veliko slovo");
      if (!/[a-z]/.test(formData.password))
        passwordErrors.push("Lozinka mora imati najmanje jedno malo slovo");
      if (!/[0-9]/.test(formData.password))
        passwordErrors.push("Lozinka mora imati najmanje jedan broj");

      if (passwordErrors.length) {
        errors.password = passwordErrors.join(", ");
      }
    }

    // Validate confirm password in register mode
    // if (mode === "register") {
    //   if (formData.password !== formData.confirmPassword) {
    //     errors.confirmPassword = "Lozinke se ne podudaraju";
    //   }
    //   // Check for required fields using a loop
    //   const requiredFields = ["name", "surname", "phone", "address"];
    //   requiredFields.forEach((field) => {
    //     if (!formData[field])
    //       errors[field] = `${field.charAt(0).toUpperCase() +
    //         field.slice(1)} je obavezno`;
    //   });

    //   // Validate phone number format
    //   if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
    //     errors.phone = "Broj telefona mora imati 10 cifara";
    //   }
    // }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // async function createUser(data) {
  //   setLoader(true);
  //   try {
  //     const response = await fetch(`${API_URL}/users`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });
  //     if (!response.ok) {
  //       const error = await response.json();
  //       setError(error.message);
  //       setIsModalOpen(true);
  //     } else {
  //       window.scrollTo(0, 0);
  //       navigate("/auth?mode=login");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setError(error.message);
  //     setIsModalOpen(true);
  //   } finally {
  //     setLoader(false);
  //   }
  // }

  async function loginUser(data) {
    const { email, password } = data;
    setLoader(true);
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        setError(responseData.message || "Došlo je do greške");
        setLoader(false);
        setIsModalOpen(true);
        return;
      }

      login(responseData.userId, responseData.token, responseData.role);
      window.scrollTo(0, 0);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Došlo je do greške. Pokušajte ponovo.");
      setIsModalOpen(true);
      return;
    } finally {
      setLoader(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!validate()) {
      return;
    }
    if (mode === "login") {
      loginUser(formData);
    } else {
      createUser(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  return (
    <>
      <Header title={mode === "login" ? "Prijava" : "Registracija"} />
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {formErrors.email && (
              <div className="error-message">{formErrors.email}</div>
            )}
          </div>

          <div className="form-control">
            <label htmlFor="password">Lozinka</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {formErrors.password && (
              <div className="error-message">{formErrors.password}</div>
            )}
          </div>

          {mode === "register" && (
            <>
              <div className="form-control">
                <label htmlFor="confirm-password">Ponovi lozinku</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirm-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {formErrors.confirmPassword && (
                  <div className="error-message">{formErrors.confirmPassword}</div>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="name">Ime</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {formErrors.name && (
                  <div className="error-message">{formErrors.name}</div>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="surname">Prezime</label>
                <input
                  type="text"
                  name="surname"
                  id="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
                {formErrors.surname && (
                  <div className="error-message">{formErrors.surname}</div>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="phone">Telefon</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                {formErrors.phone && (
                  <div className="error-message">{formErrors.phone}</div>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="address">Adresa</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
                {formErrors.address && (
                  <div className="error-message">{formErrors.address}</div>
                )}
              </div>
            </>
          )}
          <div className="button-container">
            {!error && loader && <Loader />}
            {!loader && (
              <button type="submit">
                {mode === "login" ? "Prijava" : "Registracija"}
              </button>
            )}
          </div>
        </form>
        {error && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            errorMessage={error}
          >
            <h1>Greška</h1>
            <p>Proverite podatke još jednom</p>
          </Modal>
        )}
      </div>
    </>
  );
}
