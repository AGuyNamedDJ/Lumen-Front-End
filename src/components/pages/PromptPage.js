import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { useUser } from '../utilities/UserContext';

const PromptPage = () => {
    const user = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState("Lumen-1");
    const modelDropdownRef = useRef(null);
    const menuDropdownRef = useRef(null);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleModelDropdown = () => {
        setModelDropdownOpen(!modelDropdownOpen);
    };

    const handleModelSelect = (model) => {
        setSelectedModel(model);
        setModelDropdownOpen(false);
    };

    const handleClickOutside = (event) => {
        if (modelDropdownRef.current && !modelDropdownRef.current.contains(event.target)) {
            setModelDropdownOpen(false);
        }
        if (menuDropdownRef.current && !menuDropdownRef.current.contains(event.target)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (modelDropdownOpen || menuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.classList.add('modal-open');
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.classList.remove('modal-open');
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.classList.remove('modal-open');
        };
    }, [modelDropdownOpen, menuOpen]);

    return (
        <div className="prompt-container">
            <nav className="prompt-navbar">
                <div className="navbar-left">
                    <button className="navbar-dropdown" onClick={toggleMenu}>
                        <i className="fas fa-bars-staggered"></i>
                    </button>
                    {menuOpen && (
                        <div className="left-dropdown-menu">
                            <div className="dropdown-section">
                                <Link to="/" className="dropdown-item">
                                    <i className="fas fa-lightbulb"></i> {/* Add the icon */}
                                    <span>Lumen</span> {/* Add the word Lumen */}
                                </Link>
                            </div>
                            <div className="dropdown-section">
                                <div className="dropdown-heading">Today</div>
                                <div className="dropdown-item">Chat 1</div>
                            </div>
                            <div className="dropdown-section">
                                <div className="dropdown-heading">Yesterday</div>
                                <div className="dropdown-item">Chat 2</div>
                            </div>
                            <div className="dropdown-section">
                                <div className="dropdown-heading">Previous 7 Days</div>
                                <div className="dropdown-item">Chat 3</div>
                                <div className="dropdown-item">Chat 4</div>
                            </div>
                            <div className="dropdown-section">
                                <div className="dropdown-heading">Previous 30 Days</div>
                                <div className="dropdown-item">Chat 5</div>
                            </div>
                            <div className="dropdown-section user-section">
                                <div className="dropdown-item user-info" onClick={() => console.log('Redirect to settings')}>
                                    <img src="path/to/profile-picture" alt="Profile" className="profile-image"/>
                                    {user ? `${user.first_name} ${user.last_name}` : '[Your Name]'}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="navbar-center">
                    <div className="model-select-wrapper" ref={modelDropdownRef}>
                        <div className="model-select" onClick={toggleModelDropdown}>
                            {selectedModel} <i className="fa fa-caret-down"></i>
                        </div>
                        {modelDropdownOpen && (
                            <div className="model-dropdown">
                                <div className="model-dropdown-header">
                                    <span className="model-header-text">Model</span>
                                    <i className="fa fa-info-circle"></i>
                                </div>
                                <div className="model-item" onClick={() => handleModelSelect('Lumen-2')}>
                                    <i className="fas fa-flask"></i>
                                    <div>
                                        <div className="model-name">Lumen-2</div>
                                        <div className="model-description">Experimental model under development</div>
                                    </div>
                                    {selectedModel === 'Lumen-2' && <i className="fa fa-check-circle check-mark"></i>}
                                </div>
                                <div className="model-item" onClick={() => handleModelSelect('Lumen-1')}>
                                    <i className="fas fa-lightbulb"></i>
                                    <div>
                                        <div className="model-name">Lumen-1</div>
                                        <div className="model-description">Advanced model for general tasks</div>
                                    </div>
                                    {selectedModel === 'Lumen-1' && <i className="fa fa-check-circle check-mark"></i>}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className="navbar-right">
                    <button
                        className="new-message-button"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <i className="fa fa-pen-to-square"></i>
                    </button>
                    {showTooltip && <div className="tooltip">New chat</div>}
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