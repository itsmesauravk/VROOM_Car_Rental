import React, { useState } from 'react';
import env from 'react-dotenv';
import { Link } from 'react-router-dom';

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
    <div style={{ marginTop: '10rem' }}>
      {loading && <div>Loading...</div>}
      {message && <div>{message}</div>}
      <div className="container">
        <div className="forgot">
          <h1>Forgot Password</h1>
          <form onSubmit={forgotPassword}>
            <input type="email" placeholder="Email" required />
            <button type="submit">Submit</button>
          </form>
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
