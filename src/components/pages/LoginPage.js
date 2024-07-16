import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
      event.preventDefault();
      try {
          const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
          });

          if (!response.ok) {
              throw new Error('Invalid username or password');
          }

          const data = await response.json();
          // Save user data to state or context if needed
          console.log('Logged in user:', data);
          navigate('/');
      } catch (error) {
          setError(error.message);
      }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <Link to="/" className="close-button">×</Link>
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
        <input type="text" placeholder="Phone, email, or username" className="input-field" />
        <button className="sign-in-button sign-in-button-next">Next</button>
        <button className="sign-in-button sign-in-button-forgot">Forgot password?</button>
        <div className="alternate-login">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;