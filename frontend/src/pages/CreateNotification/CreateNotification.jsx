import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./CreateNotification.css"
import API_URL from "../../API_URL";
import AuthContext from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";


const CreateLostAndFound = () =>{
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
  };
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId")
  const role = localStorage.getItem("role")
  


  const handleDescriptionChange = (e) => {
      setDescription(e.target.value);
  };


  useEffect(()=>{
    async function fetchUserData(){
      try{
        const response = await fetch(`${API_URL}/users/${userId}`);
        if(!response.ok){
          console.log("Korisnik nije pronadjen")
          return;
        }
        const data = await response.json();
        // setClassroomId(data.clasroomId);
      }catch(e){
        console.log(e)
      }
    }
    fetchUserData()
  },[])
  const handleSubmit = async (e) =>{
    e.preventDefault();
    
    const formData = {
      title,
      description,
      createdBy:userId,
    }

    try {
      const response = await fetch(`${API_URL}/notifications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Notification:", data);
        navigate("/notifications")
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  }


    return <>
    <div className="form-container">
            <h3>Kreiranje Teme</h3>
            <form className="form">
            <div className="form-control">
            <label htmlFor="title">Tema</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Roditeljski sastanak"
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Opis</label>
            <textarea  id="description"
                name="description"
                rows="5" 
                cols="40" 
                placeholder="Opisite vasu temu ovde.."
                value={description}
                onChange={handleDescriptionChange}
                ></textarea>
          </div>
          <div className="button-container">
          {(role === "Razredni") &&<button type="button"  onClick={handleSubmit}>
            Kreiraj obavestenje
            </button>}
          </div>
        </form>
        </div>
    </>
}
export default CreateLostAndFound