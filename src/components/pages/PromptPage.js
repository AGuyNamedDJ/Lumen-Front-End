import React, { useState } from 'react';
import { useUser } from '../utilities/UserContext';

const PromptPage = () => {
    const user = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState("Lumen-1");
    const [message, setMessage] = useState('');

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

    const handleExamplePromptClick = (prompt) => {
        setMessage(prompt);
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
                        </div>
                    )}
                </div>
                <div className="navbar-center">
                    <div className="model-select-wrapper">
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
                                    <i className="fas fa-lightbulb"></i> {/* New icon for Lumen-1 */}
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
                    <div className="example-prompt" onClick={() => handleExamplePromptClick('Explain what is a Call Option.')}>
                        Explain what is a Call Option.
                    </div>
                    <div className="example-prompt" onClick={() => handleExamplePromptClick('Where do you see $SPX closing today?')}>
                        Where do you see $SPX closing today?
                    </div>
                    <div className="example-prompt" onClick={() => handleExamplePromptClick('Is $SPX currently bearish?')}>
                        Is $SPX currently bearish?
                    </div>
                    <div className="example-prompt" onClick={() => handleExamplePromptClick('What is the next major move you see with $SPX?')}>
                        What is the next major move you see with $SPX?
                    </div>
                </div>
            </div>
            <div className="message-input-container">
                <textarea 
                    className="message-input" 
                    placeholder="Message Lumen" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                />
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