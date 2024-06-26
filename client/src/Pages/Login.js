import React, { useState } from 'react'
import "../css/Login.css"
import { Link, useNavigate } from 'react-router-dom';

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Login = () => {

  const [userEmail,setUserEmail] = useState("");
  const [usePassword,setUserPassword] = useState("");
  const navigate = useNavigate();
  const [showHide, setShowHide] = useState(false)
  const [role, setRole] = useState("")

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
      // console.log(data);
      if(data.success){
        alert('User logged in successfully')
        setUserEmail("");
        setUserPassword("");
        localStorage.setItem('token', data.token)

        if(data.role === 'admin'){
          navigate('/adminDashboard')
        }else if(data.role === 'user'){
          navigate('/')
        }else{
          navigate(`/distributors_profile/${data.id}`)
        }
        // document.cookie = `token = ${data.token}`
      }
      if(!data.success){
        alert('Invalid email or password')
        setRole("")
      }
    })
  }

  

  return (
    <>
    <div className='loginPage'>
   <img src="https://images.unsplash.com/photo-1541348263662-e068662d82af?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGFyayUyMGNhcnxlbnwwfHwwfHx8MA%3D%3D" alt="car" className="bgImage" />
   <div className='login-div'>
    <form onSubmit={handleSubmit}>
    <div className="login">
      <h1>Login</h1>
      <div className="containerL">
        <p>Email</p >
        <input type='email' value={userEmail} autoFocus onChange={(e)=> setUserEmail(e.target.value)}/>
        <p>Password</p >
        <input type={showHide? "text": 'password'} value={usePassword} onChange={(e)=> setUserPassword(e.target.value)} />
        <button type='button' className='showHideSignup'  onClick={()=>setShowHide(!showHide)}>{showHide ? <FaRegEye /> :  <FaRegEyeSlash /> } </button>
        <button className='loginBtn' type="submit" onClick={(e)=>handleSubmit(e)}>Login</button>
        <p className='existingL' style={{fontSize:"18px"}}>Don't have an account? <Link to="/signup" className='signup-link'>Signup</Link></p>
        <Link to="/forgot" className='resetPass'>Forgot password? </Link>
      </div>
    </div>
    </form>
   </div>
    </div>
    </>
  )
}

export default Login