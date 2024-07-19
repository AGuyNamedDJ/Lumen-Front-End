import axios from 'axios';

const API_URL = 'https://lumen-0q0f.onrender.com';

// http://localhost:3001/api
// http://localhost:8000
// https://lumen-0q0f.onrender.com
// https://lumen-0q0f.onrender.com/api/user/me

// Function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

export const sendMessageToAI = async (message) => {
  try {
      console.log("Attempting to communicate with OpenAI ...");
      // const response = await axios.post(`${API_URL}/conversation`, { message });
      const response = await axios.post(`http://localhost:5001/conversation`, { message });
      return response.data.response;
  } catch (error) {
      console.error('Error sending message to AI:', error);
      throw error;
  }
};

export const fetchChatHistoryAPI = async (userId) => {
  try {
      console.log("Attempting to fetch user conversations...");
      const token = getAuthToken();
      const response = await axios.get(`${API_URL}/api/conversations`, {
          params: { userId },
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      console.log("User conversations fetched successfully:", response.data);
      return response.data; 
  } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
  }
};

export const fetchMessagesAPI = async (conversationId) => {
  try {
    console.log("Attempting to fetch user messages...");
    const token = getAuthToken();
    const response = await axios.get(`${API_URL}/api/messages`, {
      params: { conversationId },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    console.log("User messages fetched successfully:", response.data);
    return response.data; 
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

// Save Messages to Database
const saveMessage = async (conversationId, role, content) => {
  try {
    const response = await axios.post(`${API_URL}/api/messages`, {
      conversationId,
      role,
      content
    });
    return response.data;
  } catch (error) {
    console.error('Error saving message to the database:', error);
    throw error;
  }
};

export const saveMessagesToDatabase = async (conversationId, userMessage, aiMessage) => {
  try {
    await saveMessage(conversationId, userMessage.role, userMessage.content);
    await saveMessage(conversationId, aiMessage.role, aiMessage.content);
  } catch (error) {
    console.error('Error saving messages to the database:', error);
    throw error;
  }
};
