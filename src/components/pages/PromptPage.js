import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../utilities/UserContext';

const PromptPage = () => {
  const user = useUser();

  console.log("User data:", user);

  return (
    <div className="prompt-container">
        <nav className="prompt-navbar">
            <div className="navbar-left">
                <button className="navbar-dropdown">Chats</button>
            </div>
            <div className="navbar-center">
                <select className="model-select">
                    <option value="Lumen-1">Lumen-1</option>
                    <option value="Lumen-2">Lumen-2</option>
                </select>
            </div>
            <div className="navbar-right">
                <button className="new-message-button">New Message</button>
            </div>
        </nav>
      <div className="intro">
            <h1>Hello, {user ? user.first_name : '[Your Name]'}. </h1>
            <h1>How can I help you today?</h1>
            <div className="example-prompts">
                <div className="example-prompt">Explain what is a Call Option.</div>
                <div className="example-prompt">Where do you see $SPX closing today.</div>
                <div className="example-prompt">Is $SPX currently bearish?</div>
                <div className="example-prompt">What is the next major move you see with $SPX?</div>
            </div>
        </div>
        <div className="message-input-container">
            <textarea className="message-input" placeholder="Message Lumen"></textarea>
            <button className="submit-button">Submit</button>
        </div>
        <p className="disclaimer">
            Lumen may display inaccurate info, including about people, so double-check its responses.
        </p>
        </div>
    );
};

export default PromptPage;