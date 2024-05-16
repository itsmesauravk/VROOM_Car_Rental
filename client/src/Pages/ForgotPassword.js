import React, { useState } from 'react';
import env from 'react-dotenv';
import { Link } from 'react-router-dom';
import "../css/Forgot.css"

function ForgotPassword() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  console.log(env.API_URL)

  const forgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target[0].value;

    try {
      const response = await fetch(`${env.API_URL}/reset-password-mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setLoading(false);
      setMessage(data.message || 'Password reset email sent successfully');
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    
      
<div className='passPage' style={{ marginTop: '10rem'  }}>
  <img src='https://cdn.pixabay.com/photo/2016/02/13/13/11/oldtimer-1197800_1280.jpg' className='forgotImage'  />
      {loading && <div>Loading...</div>}
      {message && <div>{message}</div>}
      <div className="forgotPassword">
        <div className="forgot">
          <h1>Forgot Password</h1>
          <form onSubmit={forgotPassword} className='sendCode'>
            <input type="email" placeholder="Email" required />
            <button className='sc' type="submit">Submit</button>
          </form>
          <Link className='toLogin' to="/login">Login</Link>
        </div>
      </div>
    </div>
    
    
  );
}

export default ForgotPassword;
