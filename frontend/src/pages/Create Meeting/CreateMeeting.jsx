import React from "react";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../API_URL"
const CreateMeeeting = () =>{
    const [title,setTitle] = useState("");
    const [link,setLink] = useState("");
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
  };
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId")
  const role = localStorage.getItem("role")
  


  const handleLinkChange = (e) => {
      setLink(e.target.value);
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
      link,
      createdBy:userId,
    }

    try {
      const response = await fetch(`${API_URL}/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Meetings:", data);
        navigate("/meetings")
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Greška:", error);
    }
  }


    return <>
    <div className="form-container">
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
            <label htmlFor="title">Klik da kreirate Google meet</label>
            <a href="https://meet.google.com/landing" target="_blank">Link za google meet</a>
          </div>
          <div className="form-control">
            <label htmlFor="link">Unesite link</label>
            <input
              type="text"
              name="link"
              id="link"
              required
              placeholder="https://meet.google.com/wwt-dgwr-cxy"
              value={link}
              onChange={handleLinkChange}
            />
          </div>
          <div className="button-container">
          <button type="button" onClick={handleSubmit}>  
            Kreiraj obavestenje
            </button>
          </div>
        </form>
        </div>
    </>
}
export default CreateMeeeting