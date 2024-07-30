import axios from 'axios';

const API_URL = 'https://lumen-0q0f.onrender.com';
const AI_BACKEND_URL = 'https://lumen-back-end-flask.onrender.com';

const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const sendMessageToAI = async (message) => {
    try {
        const response = await axios.post(`${AI_BACKEND_URL}/conversation`, { 
            message
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log("Full AI Response from API:", response.data);
        return response.data; // Ensure this returns the correct structure
    } catch (error) {
        console.error('Error communicating with AI:', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const fetchChatHistoryAPI = async (userId) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/api/conversations`, {
            params: { userId },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching conversations:', error);
        throw error;
    }
};

export const fetchMessagesAPI = async (conversationId) => {
    try {
        const token = getAuthToken();
        const response = await axios.get(`${API_URL}/api/messages`, {
            params: { conversationId },
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

export const saveMessagesToDatabase = async (conversationId, userMessage, aiMessage) => {
    try {
        console.log("Saving user message to the database:", { conversationId, role: userMessage.role, content: userMessage.content });
        await axios.post(`${API_URL}/api/messages`, {
            conversationId,
            role: userMessage.role,
            content: userMessage.content
        });

        console.log("Saving AI message to the database:", { conversationId, role: aiMessage.role, content: aiMessage.content });
        await axios.post(`${API_URL}/api/messages`, {
            conversationId,
            role: aiMessage.role,
            content: aiMessage.content
        });
    } catch (error) {
        console.error('Error saving messages to the database:', error.response ? error.response.data : error.message);
        throw error;
    }
};