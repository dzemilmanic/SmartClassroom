import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./CreateLostAndFound.css"
import API_URL from "../../API_URL";
import AuthContext from '../../context/AuthContext'
import { useNavigate } from "react-router-dom";


const CreateLostAndFound = () =>{
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [classroomId,setClassroomId] = useState("");
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
          console.log("User not found.")
          return;
        }
        const data = await response.json();
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
      description,
      createdBy:userId,
    }

    try {
      const response = await fetch(`${API_URL}/lostFound`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("LostFound:", data);
        navigate("/lostandfound")
      } else {
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }


    return <>
    <div className="form-container">
      <h3 style={{textAlign:"center"}}>Posting lost and found items</h3>
            <form className="form">
            <div className="form-control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="The item you found/lost"
            />
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea  id="description"
                name="description"
                rows="5" 
                cols="40" 
                placeholder="Enter your message here..."
                value={description}
                onChange={handleDescriptionChange}
                ></textarea>
          </div>
          <div className="button-container">
          {(role === "Razredni" || role === "Dete") &&<button type="button"  onClick={handleSubmit}>
          Create a post
            </button>}
          </div>
        </form>
        </div>
    </>
}
export default CreateLostAndFound