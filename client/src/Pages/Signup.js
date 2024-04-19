import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import env from 'react-dotenv';
import "../css/LogSign.css"
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

function Signup() {
    const [userName,setUserName] = useState("");
    const [userEmail,setUserEmail] = useState("");
    const [userNumber,setUserNumber] = useState("");
    const [userLocation,setUserLocation] = useState("");
    const [usePassword,setUserPassword] = useState("");
    const [showHide, setShowHide] = useState(false)
   

    const submitData = async (e) => {
      e.preventDefault();

  
      const formData = {
        fullname: userName,
        email: userEmail,
        phone: userNumber,
        password: usePassword,
        address: userLocation
      };
  
      try {
        const response = await fetch(`${env.API_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data);
        if(data.success){
          alert('User registered successfully')
          setUserName("");
          setUserEmail("");
          setUserNumber("");
          setUserLocation("");
          setUserPassword("");
        if(!data.success){
          alert('Email already exists')
        }
        }
      } catch (error) {
        console.error('Error:', error);
      }
      
    };



  return (
    <>
    <div className='signupPage'>
    <img src="https://images.pexels.com/photos/38570/lamborghini-car-speed-prestige-38570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="car" className="signImage" />
    <form onSubmit={(e)=>submitData(e)}>
    <div className="Signup">
      <h1>Sign up</h1>
      <div className="container">
        <p>Full Name</p >
        <input type='text'
          placeholder='Your Name'
         value={userName} onChange={(e)=> setUserName(e.target.value)} required />
        <p>Email</p >
        <input type='email'
          placeholder='example@gmail.com'
         value={userEmail} onChange={(e)=> setUserEmail(e.target.value)} required />
        <p>Phone</p >
        <input type='number' 
          placeholder='0123456789'
        value={userNumber} onChange={(e)=> setUserNumber(e.target.value)} required />
        <p>Password</p >
        <input value={usePassword} type={showHide ? "text" : "password"} onChange={(e)=> setUserPassword(e.target.value)}  required/>
        <button  type='button'className='showHideSignup'  onClick={()=>setShowHide(!showHide)}>{showHide ? <FaRegEye /> :  <FaRegEyeSlash /> } </button>
         <p>Address</p >
        <input type='text'
          placeholder='xyz-01, abc street'
         value={userLocation} onChange={(e)=> setUserLocation(e.target.value)}  required/>
         <button className='SignupBtn' type="submit" onClick={(e)=>submitData(e)}>Signup</button>
        <p className='existingS'>Already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
    </form>
    </div>
    </>
  )
}

export default Signup
