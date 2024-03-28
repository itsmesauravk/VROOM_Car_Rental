import React, { useState } from 'react'
import "../../style/Login.css"
import { Link } from 'react-router-dom';
import car from "../../images/car.jpg"
import ForgotPassword from './ForgotPassword';
// import carVideo from "../../videos/car.mp4"

const Login = () => {
  const [userEmail,setUserEmail] = useState("");
  const [usePassword,setUserPassword] = useState("");
  function handleSubmit(e){
    e.preventDefault();
    console.log("Email: ",userEmail);
    console.log("Password: ",usePassword);
  }
  return (
    <>
    {/* <video  autoPlay loop muted src={carVideo} className='carVideo' /> */}
   <img src={car} alt="car" className="bgImage" />
    <form onSubmit={handleSubmit}>
    <div className="login">
      <h1>Login</h1>
      <div className="container">
        <p>Email</p >
        <input type='email' value={userEmail} onChange={(e)=> setUserEmail(e.target.value)} />
        <p>Password</p >
        <input type='password' value={usePassword} onChange={(e)=> setUserPassword(e.target.value)} />
        <button className='loginBtn' type="submit" onClick={(e)=>handleSubmit(e)}>Login</button>
        <p className='existing'>Don't have an account? <Link to="/signup">Signup</Link></p>
        <Link to="/forgot" className='resetPass'>Forgot password? </Link>
      </div>
    </div>
    </form>
    </>
  )
}

export default Login