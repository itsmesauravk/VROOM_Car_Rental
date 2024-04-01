import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import car from "../assets/images/car.jpg"
import "../css/LogSign.css"

function Signup() {
    const [userName,setUserName] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [userNumber,setUserNumber] = useState("");
    const [userLocation,setUserLocation] = useState("");
    const [usePassword,setUserPassword] = useState("");
  
    const  submitData = (e)=>{
      e.preventDefault();
      console.log("Name: ",userName);
      console.log("Phone: ",userNumber);
      console.log("Location: ",userLocation);
      console.log("Email: ",userEmail);
      console.log("Password: ",usePassword);
    }

  return (
    <>
    <img src={car} alt="car" className="bgImage" />
    <form onSubmit={submitData}>
    <div className="Signup">
      <h1>Sign up</h1>
      <div className="container">
        <p>Name</p >
        <input type='text' value={userName} onChange={(e)=> setUserName(e.target.value)} required />
        <p>Email</p >
        <input type='email' value={userEmail} onChange={(e)=> setUserEmail(e.target.value)} required />
        <p>Phone</p >
        <input type='phone' value={userNumber} onChange={(e)=> setUserNumber(e.target.value)} required />
        <p>Password</p >
        <input type='password' value={usePassword} onChange={(e)=> setUserPassword(e.target.value)}  required/>
        <p>Address</p >
        <input type='text' value={userLocation} onChange={(e)=> setUserLocation(e.target.value)}  required/>
        <button className='SignupBtn' type="submit" onClick={(e)=>submitData(e)}>Signup</button>
        <p className='existingS'>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
    </form>
    </>
  )
}

export default Signup