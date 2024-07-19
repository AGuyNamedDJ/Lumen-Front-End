import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { useUser } from '../utilities/UserContext';
import { sendMessageToAI } from '../services/apiService';

const PromptPage = () => {
    const user = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showMenuTooltip, setShowMenuTooltip] = useState(false);
    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState("Lumen-1");
    const [message, setMessage] = useState(""); 
    const [conversation, setConversation] = useState([]); 
    const [loading, setLoading] = useState(false); 
    const [conversationStarted, setConversationStarted] = useState(false);
    const modelDropdownRef = useRef(null);
    const menuDropdownRef = useRef(null);
    const menuButtonRef = useRef(null); 
    const textareaRef = useRef(null);
    const chatContainerRef = useRef(null);

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
        if (
            menuDropdownRef.current && 
            !menuDropdownRef.current.contains(event.target) &&
            menuButtonRef.current &&
            !menuButtonRef.current.contains(event.target)
        ) {
            setTimeout(() => {
                setMenuOpen(false);
            }, 150); // Small delay to avoid immediate reopening
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

    useEffect(() => {
        console.log("User Object:", user);
    }, [user]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [conversation]);

    const handleImageError = (e) => {
        console.error("Image failed to load:", e.target.src);
        e.target.onerror = null; 
        e.target.src = "path/to/default-profile-picture";
    };

    const handleExampleClick = (prompt) => {
        setMessage(prompt);
    };

    const handleSendMessage = async () => {
        if (message.trim() === "") return;
    
        setConversationStarted(true); // Set conversation started to true
    
        const newConversation = [...conversation, { role: 'user', content: message }];
        setConversation(newConversation);
        setMessage("");
    
        try {
            const response = await sendMessageToAI(message);
            typeResponse(response);
        } catch (error) {
            console.error('Error sending message to AI:', error);
        }
    };

    const typeResponse = (response) => {
        let index = -1; // Start from the first character
        const typingSpeeds = [
            { speed: 6, duration: 5000 },
            { speed: 12, duration: 7000 },
            { speed: 18, duration: 6000 },
            { speed: 26, duration: 8000 },
        ];
    
        let currentSpeed = typingSpeeds[0].speed;
        let currentDuration = typingSpeeds[0].duration;
        let elapsed = 0;
    
        const initializeResponse = () => {
            setConversation(prev => {
                const newConversation = [...prev, { role: 'ai', content: '', typing: true }];
                return newConversation;
            });
        };
    
        const typeNextChar = () => {
            if (index < response.length) {
                setConversation(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.role === 'ai' && lastMessage.typing) {
                        const updatedMessage = { ...lastMessage, content: lastMessage.content + response.charAt(index) };
                        const newConversation = [...prev.slice(0, prev.length - 1), updatedMessage];
                        return newConversation;
                    }
                    return prev;
                });
                index++;
                elapsed += currentSpeed;
    
                if (elapsed >= currentDuration) {
                    const nextTypingSpeed = typingSpeeds[Math.floor(Math.random() * typingSpeeds.length)];
                    currentSpeed = nextTypingSpeed.speed;
                    currentDuration = nextTypingSpeed.duration;
                    elapsed = 0;
                }
    
                setTimeout(typeNextChar, currentSpeed); // Schedule the next character
            } else {
                setConversation(prev => {
                    const lastMessage = prev[prev.length - 1];
                    if (lastMessage && lastMessage.role === 'ai' && lastMessage.typing) {
                        const updatedMessage = { ...lastMessage, typing: false };
                        const newConversation = [...prev.slice(0, prev.length - 1), updatedMessage];
                        return newConversation;
                    }
                    return prev;
                });
            }
        };
    
        initializeResponse();
        setTimeout(() => typeNextChar(), 1000); // Introduce a 1-second delay before starting the typing
    };

    const handlePredictionSubmit = async () => {
        try {
            const response = await callPredictionAPI(message);
            setConversation(prev => [...prev, { role: 'ai', content: response }]);
        } catch (error) {
            console.error('Error calling the prediction API:', error);
        }
    };

    const callPredictionAPI = async (message) => {
        try {
            const response = await fetch('http://localhost:8000/conversation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data.response;
        } catch (error) {
            console.error('Error calling the prediction API:', error);
            return 'Error occurred while fetching prediction';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);
        const response = await callPredictionAPI(message);
        setLoading(false);

        console.log('API Response:', response);
        setAiResponse(response);

        setMessage('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };


    return (
        <div className="prompt-container">
            <nav className="prompt-navbar">
                <div className="navbar-left">
                    <button
                        className="navbar-dropdown"
                        onClick={toggleMenu}
                        onMouseEnter={() => setShowMenuTooltip(true)}
                        onMouseLeave={() => setShowMenuTooltip(false)}
                        ref={menuButtonRef}
                    >
                        <i className="fas fa-bars-staggered"></i>
                        {showMenuTooltip && <div className="tooltip menu-tooltip">Expand menu</div>}
                    </button>
                    {menuOpen && (
                        <div className="left-dropdown-menu" ref={menuDropdownRef}>
                            <div className="dropdown-section">
                                <Link to="/" className="dropdown-item">
                                    <i className="fas fa-lightbulb"></i>
                                    <span className="home-link-text">Lumen</span>
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
                                    <img src={user?.profile_picture_url} alt="Profile" className="profile-image" onError={handleImageError} />
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
                        {showTooltip && <div className="tooltip message-tooltip">New chat</div>}
                    </button>
                </div>
            </nav>
            <div className={`intro ${conversationStarted ? 'hidden' : ''}`}>
                <h1 className="greeting">Hello, {user ? user.first_name : '[Your Name]'}</h1>
                <h1 className="help">How can I help you today?</h1>
                <div className="example-prompts">
                    <div className="example-prompt" onClick={() => handleExampleClick("Explain what is a Call Option.")}>
                        Explain what is a Call Option.
                    </div>
                    <div className="example-prompt" onClick={() => handleExampleClick("Where do you see $SPX closing today?")}>
                        Where do you see $SPX closing today?
                    </div>
                    <div className="example-prompt" onClick={() => handleExampleClick("Is $SPX currently bearish?")}>
                        Is $SPX currently bearish?
                    </div>
                    <div className="example-prompt" onClick={() => handleExampleClick("What is the next major move you see with $SPX?")}>
                        What is the next major move you see with $SPX?
                    </div>
                </div>
            </div>
            <div className={`chat-container ${conversationStarted ? 'active' : ''}`} ref={chatContainerRef}>
            {conversation.map((msg, index) => (
                <div key={index} className={`chat-message ${msg.role}`}>
                    <div className={`message-bubble ${msg.role}`}>
                        {msg.content}
                    </div>
                </div>
            ))}
        </div>
        <div className="message-input-container">
            <textarea
                className="message-input"
                placeholder="Message Lumen"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                ref={textareaRef}
            ></textarea>
            <button className="submit-button" onClick={handleSendMessage}>
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