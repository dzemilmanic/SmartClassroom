import React from "react";
import { useState } from "react";
import "./CreateUser.css"
import { TbWashDryP } from "react-icons/tb";
import API_URL from "../../API_URL";
import { useNavigate } from "react-router-dom";

const CreateUser = () =>{
  
    const [name,setName] = useState("")
    const [surname,setSurname] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [role,setRole] = useState("")
    const [classroom,setClassroom] = useState("")
    const [school,setSchool] = useState("")

    //HANDLE EVENTI 
    const handleNameChange = (e) => setName(e.target.value);
    const handleSurnameChange = (e) => setSurname(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);
    const handleAddressChange = (e) => setAddress(e.target.value);
    const handleRoleChange = (e) => setRole(e.target.value);
    const handleClassroomChange = (e) => setClassroom(e.target.value);
    const handleSchoolChange = (e) => setSchool(e.target.value);

    const navigate = useNavigate();
     const handleSubmit = async (e) =>{
        e.preventDefault();
        const data ={
            name,
            surname,
            email,
            password,
            phone,
            address,
            role,
            school,
            classroomId:classroom
        };
        console.log()
        try {
          const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
    navigate("/")
      }
      catch(error){
        return;
      }
     }

    

    return(
        <div className="form-container">
            <form className="form">
            <div className="form-control">
            <label htmlFor="name">First Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={name}
              onChange={handleNameChange}
              placeholder="Petar"
            />
          </div>
          <div className="form-control">
            <label htmlFor="surname">Last Name</label>
            <input
              type="text"
              name="surname"
              id="surname"
              required
              value={surname}
              onChange={handleSurnameChange}
              placeholder="Petrovic"
            />
          </div>
            <div className="form-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={email}
              onChange={handleEmailChange}
              placeholder="petarpetrovic@gmail.com"
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              placeholder="+38162333333"
              value={phone}
              onChange={handlePhoneChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="adress"
              id="address"
              required
              placeholder="Trg Slobode 12"
              value={address}
              onChange={handleAddressChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="role">Role</label>
            <select onChange={handleRoleChange} value={role} id="role" name="role" required>
                <option value="" disabled selected>---</option>
                <option value="Admin">Admin</option>
                <option value="Razredni">Class teacher/Teacher</option>
                <option value="Roditelj">Parent</option>
                <option value="Dete">Child</option>
            </select>
          </div>
          {/* Prikaz odeljenja samo za "Razredni/Učitelj" i "Dete" */}
{(role === "Razredni" || role === "Dete") && (
    <div className="form-control">
        <label htmlFor="classroom">Class</label>
        <select
            onChange={handleClassroomChange}
            id="class-section"
            name="classSection"
            value={classroom}
            required={role === "Razredni" || role === "Dete"} // Opcionalno osiguranje
        >
            <option value="" disabled>
                ---
            </option>
            <option value="I-1">I-1</option>
            <option value="I-2">I-2</option>
            <option value="I-3">I-3</option>
            <option value="I-4">I-4</option>
            <option value="I-5">I-5</option>
            <option value="I-6">I-6</option>
            <option value="I-7">I-7</option>
            <option value="I-8">I-8</option>
            <option value="II-1">II-1</option>
            <option value="II-2">II-2</option>
            <option value="II-3">II-3</option>
            <option value="II-4">II-4</option>
            <option value="II-5">II-5</option>
            <option value="II-6">II-6</option>
            <option value="II-7">II-7</option>
            <option value="II-8">II-8</option>
            <option value="III-1">III-1</option>
            <option value="III-2">III-2</option>
            <option value="III-3">III-3</option>
            <option value="III-4">III-4</option>
            <option value="III-5">III-5</option>
            <option value="III-6">III-6</option>
            <option value="III-7">III-7</option>
            <option value="III-8">III-8</option>
            <option value="IV-1">IV-1</option>
            <option value="IV-2">IV-2</option>
            <option value="IV-3">IV-3</option>
            <option value="IV-4">IV-4</option>
            <option value="IV-5">IV-5</option>
            <option value="IV-6">IV-6</option>
            <option value="IV-7">IV-7</option>
            <option value="IV-8">IV-8</option>
            <option value="V-1">V-1</option>
            <option value="V-2">V-2</option>
            <option value="V-3">V-3</option>
            <option value="V-4">V-4</option>
            <option value="V-5">V-5</option>
            <option value="V-6">V-6</option>
            <option value="V-7">V-7</option>
            <option value="V-8">V-8</option>
            <option value="VI-1">VI-1</option>
            <option value="VI-2">VI-2</option>
            <option value="VI-3">VI-3</option>
            <option value="VI-4">VI-4</option>
            <option value="VI-5">VI-5</option>
            <option value="VI-6">VI-6</option>
            <option value="VI-7">VI-7</option>
            <option value="VI-8">VI-8</option>
            <option value="VII-1">VII-1</option>
            <option value="VII-2">VII-2</option>
            <option value="VII-3">VII-3</option>
            <option value="VII-4">VII-4</option>
            <option value="VII-5">VII-5</option>
            <option value="VII-6">VII-6</option>
            <option value="VII-7">VII-7</option>
            <option value="VII-8">VII-8</option>
            <option value="VIII-1">VIII-1</option>
            <option value="VIII-2">VIII-2</option>
            <option value="VIII-3">VIII-3</option>
            <option value="VIII-4">VIII-4</option>
            <option value="VIII-5">VIII-5</option>
            <option value="VIII-6">VIII-6</option>
            <option value="VIII-7">VIII-7</option>
            <option value="VIII-8">VIII-8</option>
        </select>
    </div>
)}
       {(role === "Razredni" || role === "Dete") && ( <div className="form-control">
            <label htmlFor="school">Elementary school</label>
            <select onChange={handleSchoolChange} value={school} id="role" name="role" required>
                <option value="" disabled selected>---</option>
                <option value="Bratstvo">Bratstvo</option>
                <option value="Jovan-Jovanovic-Zmaj">Jovan Jovanovic Zmaj</option>
                <option value="Mesa-Selimovic">Mesa Selimovic</option>
                <option value="Rifat-Burdzevic-Trso">Rifat Burdzevic Trso</option>
                <option value="Stefan-Nemanja">Stefan Nemanja</option>
                <option value="Vuk-Karadzic">Vuk Karadzic</option>
                <option value="Camil-Sijaric">Camil Sijaric</option>
                <option value="Desanka-Maksimovic">Desanka Maksimovic</option>
            </select>
          </div>)}
          <div className="button-container">
          <button onClick={handleSubmit} type="button" >
            Create User
            </button>
          </div>
        </form>
        </div>
    )
}
export default CreateUser;