import React, { useState } from 'react';
// import env from 'react-dotenv';
import { useNavigate, useParams } from 'react-router-dom';

const PasswordReset = () => {
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const {token} = useParams()
    const navigate = useNavigate()
   
    // console.log(env.API_URL)

    const resetPassword = async (e) => {
        e.preventDefault();


        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/reset-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password ,token}),
            });
            const data = await response.json();
            console.log(data);
            if (data.success) {
                alert('Password reset successfully');
            }
            setLoading(false);
            navigate('/login')
        } catch (error) {
            console.error('Error resetting password:', error);
            setLoading(false);
            setError('Error resetting password');
        }
    };

    return (
        <div style={{ marginTop: '10rem' }}>
            <h1>Password Reset</h1>
            <form onSubmit={resetPassword}>
                <input
                    type="password"
                    placeholder=" New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit" disabled={loading}>Submit</button>
            </form>
        </div>
    );
};

export default PasswordReset;
