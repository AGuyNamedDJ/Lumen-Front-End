import React, { useState } from 'react';
import { useUser } from '../utilities/UserContext';

const PromptPage = () => {
    const user = useUser();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="prompt-container">
            <nav className="prompt-navbar">
                <div className="navbar-left">
                    <button className="navbar-dropdown" onClick={toggleMenu}>
                        <i className="fas fa-bars-staggered"></i>
                    </button>
                    {menuOpen && (
                        <div className="dropdown-menu">
                            <div className="dropdown-item">Lumen-1</div>
                            <div className="dropdown-item">ABRO</div>
                            <div className="dropdown-item">Crafting Prompt Titles</div>
                            <div className="dropdown-item">Seeking Historic Charm</div>
                            {/* Add more items as needed */}
                        </div>
                        )}
                        </div>
                    <div className="navbar-center">
                        <select className="model-select">
                            <option value="Lumen-1">Lumen-1</option>
                            <option value="Lumen-2">Lumen-2</option>
                        </select>
                    </div>
                <div className="navbar-right">
                    <button className="new-message-button">
                        <i className="fa fa-pen-to-square"></i>
                    </button>
                </div>
            </nav>
            <div className="intro">
                <h1 className="greeting">Hello, {user ? user.first_name : '[Your Name]'}</h1>
                <h1 className="help">How can I help you today?</h1>
                <div className="example-prompts">
                    <div className="example-prompt">Explain what is a Call Option.</div>
                    <div className="example-prompt">Where do you see $SPX closing today?</div>
                    <div className="example-prompt">Is $SPX currently bearish?</div>
                    <div className="example-prompt">What is the next major move you see with $SPX?</div>
                </div>
            </div>
            <div className="message-input-container">
                <textarea className="message-input" placeholder="Message Lumen"></textarea>
                <button className="submit-button">
                    <i className="fa fa-arrow-up"></i>
                </button>
            </div>
            <p className="disclaimer">
                Lumen’s insights may vary. Always double-check before trading.
            </p>
        </div>
    );
};

export default PromptPage;