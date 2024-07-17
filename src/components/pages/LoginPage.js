import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNextClick = async () => {
    if (step === 1 && username) {
        setStep(2);
    } else if (step === 2 && password) {
        try {
            const response = await axios.post('https://lumen-0q0f.onrender.com/api/login', { username, password });
            const { token, user } = response.data;

            // Store token and user info in local storage or context
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            // Redirect to /lumen page
            navigate('/lumen');
        } catch (error) {
            console.error('Failed to log in:', error);
            alert('Failed to log in. Please check your username or password.');
        }
    }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <button className="close-button"><Link to="/">x</Link></button>
        <h2>Sign in to Lumen</h2>
        <button className="sign-in-button sign-in-button-google">
          <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" /> Sign in with Google
        </button>
        <button className="sign-in-button sign-in-button-apple">
          <img src="https://www.freeiconspng.com/uploads/apple-icon-4.png" alt="Apple" /> Sign in with Apple
        </button>
        <div className="divider">
          <span>or</span>
        </div>
        {step === 1 && (
          <input
            type="text"
            placeholder="Username"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        )}
        {step === 2 && (
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <button
          className={`sign-in-button ${step === 1 ? 'sign-in-button-next' : 'sign-in-button-login'}`}
          onClick={handleNextClick}
        >
          {step === 1 ? 'Next' : 'Log In'}
        </button>
        {step === 1 && (
          <button className="sign-in-button sign-in-button-forgot">Forgot password?</button>
        )}
        <div className="alternate-login">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;