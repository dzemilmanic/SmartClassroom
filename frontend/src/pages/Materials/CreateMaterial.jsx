import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./CreateMaterial.css"
import API_URL from "../../API_URL";
import AuthContext from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";


const CreateMaterial = () =>{
    const [user,setUser] = useState({});
    const [title,setTitle] = useState("");
    const [type,setType] = useState("");
    const [link,setLink] = useState("");
    const [description,setDescription] = useState("");
    const [classroomId,setClassroomId] = useState("");
    const [message,setMessage] = useState("")
    //handle eventi
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
  };
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId")
  const role = localStorage.getItem("role");
  
  const handleTypeChange = (e) => {
      setType(e.target.value);
  };

  const handleLinkChange = (e) => {
      setLink(e.target.value);
  };

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
        setUser(data);
        setClassroomId(data.clasroomId);
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
      type,
      link,
      classroomId:user.classroomId,
      description,
      createdBy:userId,
    }

    try {
      const response = await fetch(`${API_URL}/materials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Materijal uspešno kreiran!");
        console.log("Novi materijal:", data);
        navigate("/materials")
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Došlo je do greške.");
      }
    } catch (error) {
      setMessage("Došlo je do greške prilikom kreiranja materijala.");
      console.error("Greška:", error);
    }
  }


    return <>
    <div className="form-container">
      <h3>Postavljanje materijala</h3>
            <form className="form">
            <div className="form-control">
            <label htmlFor="title">Naslov</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Svet oko nas"
            />
          </div>
            <div className="form-control">
            <label htmlFor="type">Tip</label>
            <select id="type" name="type" value={type} onChange={handleTypeChange} required>
            <option value="" disabled selected>---</option>
            <option value="Knjiga">Knjiga</option>
            <option value="Domaci">Domaci zadatak</option>
            <option value="Skripta">Skripta</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="link">Link</label>
            <input
              type="text"
              name="link"
              id="link"
              required
              value={link}
              onChange={handleLinkChange}
              placeholder="google.com"
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Opis</label>
            <textarea  id="description"
                name="description"
                rows="5" 
                cols="40" 
                placeholder="Unesite vašu poruku ovde..."
                value={description}
                onChange={handleDescriptionChange}
                ></textarea>
          </div>
          <div className="button-container">
          <button type="button"  onClick={handleSubmit}>
            Postavi materijal
            </button>
          </div>
        </form>
        </div>
    </>
}
export default CreateMaterial