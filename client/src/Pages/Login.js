import React, { useState } from 'react'
import "../css/LogSign.css"
import { Link, useNavigate } from 'react-router-dom';
import car from "../assets/images/car.jpg"
// import ForgotPassword from '../Pages/ForgotPassword';


const Login = () => {
  const [userEmail,setUserEmail] = useState("");
  const [usePassword,setUserPassword] = useState("");
  const navigate = useNavigate();
 

  function handleSubmit(e){
    e.preventDefault();
    const formData = {
      email: userEmail,
      password: usePassword
    };
    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if(data.success){
        alert('User logged in successfully')
        setUserEmail("");
        setUserPassword("");
        navigate('/')
        localStorage.setItem('token', data.token)
      }
      if(!data.success){
        alert('Invalid email or password')
      }
    })
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