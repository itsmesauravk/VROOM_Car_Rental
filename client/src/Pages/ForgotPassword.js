import React, { useState } from 'react'
import "../css/Forgot.css"
import { Link } from 'react-router-dom'
import CodeEnter from './CodeEnter';


function ForgotPassword() {
  const [change,onChange] = useState(false);
  const changeComponent = ()=>{
    onChange(!change)
  }

  return (
    <>
    { change ? <CodeEnter /> : <div className="forgotPassword">
        <p>Enter your email</p>
        <div className="sendCode">
        <input  type='email' className='forgotEmail'  />
        <button  onClick={changeComponent} className='sc'>Send Code</button>
        </div>
       
    </div>}
    </>
  )
}

export default ForgotPassword