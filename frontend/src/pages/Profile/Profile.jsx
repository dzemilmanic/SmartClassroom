import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import API_URL from "../../API_URL";
import AuthContext from "../../context/AuthContext";
import Header from "../../components/Header/Header";
import Loader from "../../components/Loader/Loader";
function Profile() {
  const [user, setUser] = useState(null);
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState(null);
  const { userId, token, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !userId) {
      navigate("/auth?mode=login");
    }
  }, [userId, loading, navigate]);

  useEffect(() => {
    if (!userId || loading) return;

    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const err = await response.json();
          setError(err.message);
          return;
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingData(false);
      }
    };

    fetchUserData();
  }, [userId, token, loading]);

  if (loading || loadingData) {
    return (
      <div className="loading">
        <Loader />
      </div>
    );
  }
  if (error) return <div className="error">Greška: {error}</div>;
  if (!user) return <div className="error">Korisnik nije pronađen</div>;

  return (
    <>
      <Header title={"Profil"} />
      <div className="profile-container">
        <div className="profile-info">
          <div className="info-group">
            <label style={{color:"white"}}>Ime:</label>
            <span style={{color:"white"}}>{user.name}</span>
          </div>
          <div className="info-group">
            <label style={{color:"white"}}>Prezime:</label>
            <span style={{color:"white"}}>{user.surname}</span>
          </div>
          <div className="info-group">
            <label style={{color:"white"}}>Email:</label>
            <span style={{color:"white"}}>{user.email}</span>
          </div>
          <div className="info-group">
            <label style={{color:"white"}}>Telefon:</label>
            <span style={{color:"white"}}>{user.phone}</span>
          </div>
        </div>
        <div className="profile-actions">
          <button
            className="edit-button"
            onClick={() => navigate(`/profile/${userId}/edit`)}
          >
            Izmeni Profil
          </button>
          <button
            className="change-password-button"
            onClick={() => navigate("/profile/change-password")}
          >
            Promeni Šifru
          </button>
        </div>
      </div>
    </>
  );
}

export default Profile;
