import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../utilities/UserContext';
import { sendMessageToAI, fetchChatHistoryAPI, fetchMessagesAPI, saveMessagesToDatabase } from '../services/apiService';

const PromptPage = () => {
    const user = useUser();
    const [menuOpen, setMenuOpen] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [showMenuTooltip, setShowMenuTooltip] = useState(false);
    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const [selectedModel, setSelectedModel] = useState("Lumen-1");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [chatHistory, setChatHistory] = useState([]);
    const [conversationStarted, setConversationStarted] = useState(false);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [currentConversationId, setCurrentConversationId] = useState(null);
    const [loading, setLoading] = useState(false);
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
    
    const handleRefresh = () => {
        window.location.reload();
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
            }, 150);
        }
    };

    const fetchChatHistoryData = async (userId) => {
        try {
            const response = await fetchChatHistoryAPI(userId);
            console.log('Fetched chat history:', response);
            return response;
        } catch (error) {
            console.error('Error fetching chat history:', error);
            throw error;
        }
    };

    const fetchMessages = async (conversationId) => {
        try {
            const messages = await fetchMessagesAPI(conversationId);
            console.log('Fetched messages:', messages);
            return messages;
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
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
        const fetchHistoryAndMessages = async () => {
            if (user) {
                console.log("Fetching chat history for user:", user.id);
                try {
                    const chatHistory = await fetchChatHistoryData(user.id);
                    console.log("Fetched chat history:", chatHistory);

                    if (Array.isArray(chatHistory) && chatHistory.length > 0) {
                        const uniqueConversations = chatHistory.filter(
                            (value, index, self) =>
                                index === self.findIndex((t) => t.id === value.id)
                        );

                        setChatHistory(uniqueConversations);
                        const firstConversation = uniqueConversations[0];
                        setCurrentConversation(firstConversation);
                        setCurrentConversationId(firstConversation.id);
                        console.log("Fetching messages for conversation:", firstConversation.id);

                        const messages = await fetchMessagesAPI(firstConversation.id);
                        console.log("Fetched messages:", messages);

                        if (messages) {
                            setMessages(messages);
                        }
                    } else {
                        console.warn("No chat history found for user:", user.id);
                    }
                } catch (error) {
                    console.error('Error fetching chat history or messages:', error);
                }
            }
        };

        fetchHistoryAndMessages();
    }, [user]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    const handleConversationSelect = async (conversation) => {
        setCurrentConversation(conversation);
        try {
            const fetchedMessages = await fetchMessagesAPI(conversation.id);
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleImageError = (e) => {
        console.error("Image failed to load:", e.target.src);
        e.target.onerror = null;
        e.target.src = "path/to/default-profile-picture";
    };

    const handleExampleClick = async (prompt) => {
        setMessage(prompt);
    
        // Clear previous conversation and messages
        setCurrentConversation(null);
        setCurrentConversationId(null);
        setMessages([]);
        setConversationStarted(false);
    
        // Set the new prompt as a message
        setTimeout(() => handleSendMessage(), 100);
    };

    const handleSendMessage = async () => {
        if (message.trim() === "") return;
    
        if (!user) {
            console.error('User is not authenticated');
            return;
        }
    
        setConversationStarted(true); // Set conversation started to true
    
        const userMessage = { role: 'user', content: message };
        let newConversationId = currentConversationId;
    
        // Create a new conversation if one doesn't exist
        if (!currentConversationId) {
            try {
                console.log("Creating new conversation with userId:", user.id);
    
                const response = await fetch('https://lumen-0q0f.onrender.com/api/conversations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId: user.id })
                });
    
                console.log("Server response status:", response.status);
                console.log("Server response status text:", response.statusText);
    
                if (!response.ok) {
                    const errorText = await response.text();
                    console.error('Failed to create a new conversation. Server responded with:', errorText);
                    throw new Error('Failed to create a new conversation');
                }
    
                const data = await response.json();
                newConversationId = data.id;
                setCurrentConversationId(newConversationId);
    
                // Add the new conversation to the chat history
                setChatHistory(prevChatHistory => [
                    ...prevChatHistory,
                    { id: newConversationId, created_at: new Date(), user_id: user.id }
                ]);
    
                // Set the new conversation as the current conversation
                setCurrentConversation({ id: newConversationId, messages: [] });
    
                // Clear previous messages
                setMessages([userMessage]);
            } catch (error) {
                console.error('Error creating new conversation:', error);
                return;
            }
        } else {
            setMessages(prev => [...prev, userMessage]);
        }
    
        setMessage("");
    
        // Send the message to the backend and handle the response
        try {
            const aiResponse = await sendMessageToAI(message, selectedModel); // Pass selected model here
            console.log("Full AI Response from API:", aiResponse);
    
            // Extracting content based on possible structures
            const aiMessageContent = aiResponse.response || aiResponse.content || JSON.stringify(aiResponse);
            console.log("Extracted AI Message Content:", aiMessageContent);
    
            if (typeof aiMessageContent !== 'string') {
                console.error('AI Message Content is not a string:', aiMessageContent);
                throw new Error('AI response is not a valid string');
            }
    
            const aiMessage = { role: 'ai', content: aiMessageContent };
            console.log("AI Message Object:", aiMessage);
    
            // Save user message and AI response to the database
            await saveMessagesToDatabase(newConversationId, userMessage, aiMessage);
    
            // Type AI response gradually
            typeResponse(aiMessageContent);
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
            { speed: 35, duration: 3000 },
        ];
    
        let currentSpeed = typingSpeeds[0].speed;
        let currentDuration = typingSpeeds[0].duration;
        let elapsed = 0;
    
        const initializeResponse = () => {
            setMessages(prev => {
                const newConversation = [...prev, { role: 'ai', content: '', typing: true }];
                return newConversation;
            });
        };
    
        const typeNextChar = () => {
            if (index < response.length) {
                setMessages(prev => {
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
                setMessages(prev => {
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
    
        if (response && typeof response === 'string') {
            initializeResponse();
            setTimeout(() => typeNextChar(), 1000); // Introduce a 1-second delay before starting the typing
        } else {
            console.error('Response is not a valid string:', response);
        }
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
                        <div className="dropdown-heading lumen">
                            <Link to="/" className="dropdown-item">
                                <i className="fas fa-lightbulb"></i>
                                <span className="home-link-text">Lumen</span>
                            </Link>
                        </div>
                        <div className="dropdown-heading">Conversations</div>
                        <div className="dropdown-section">
                            {chatHistory.map(conv => (
                                <div key={conv.id} className="dropdown-item" onClick={() => handleConversationSelect(conv)}>
                                    Conversation started at {new Date(conv.created_at).toLocaleString()}
                                </div>
                            ))}
                        </div>
                        <div className="user-section">
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
                onClick={handleRefresh}
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
            {messages.map((msg, index) => (
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