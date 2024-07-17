import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const navigate = useNavigate();

  const handleNextClick = async () => {
    if (step === 1 && email && username) {
      setStep(2);
    } else if (step === 2 && password && firstName && lastName) {
      try {
        const response = await axios.post('https://lumen-0q0f.onrender.com/api/signup', {
          email,
          username,
          password,
          first_name: firstName,
          last_name: lastName,
        });
        const { token, user } = response.data;

        // Store token and user info in local storage or context
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to /lumen page
        navigate('/lumen');
      } catch (error) {
        console.error('Failed to sign up:', error);
        alert('Failed to sign up. Please check your information and try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <button className="close-button"><Link to="/">x</Link></button>
        <h2>Sign up for Lumen</h2>
        <button className="signup-button signup-button-google">
          <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google" /> Sign up with Google
        </button>
        <button className="signup-button signup-button-apple">
          <img src="https://www.freeiconspng.com/uploads/apple-icon-4.png" alt="Apple" /> Sign up with Apple
        </button>
        <div className="divider">
          <span>or</span>
        </div>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="First Name"
              className="input-field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input-field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}
        <button
          className={`signup-button ${step === 1 ? 'signup-button-next' : 'signup-button-signup'}`}
          onClick={handleNextClick}
        >
          {step === 1 ? 'Next' : 'Sign Up'}
        </button>
        <div className="alternate-login">
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;