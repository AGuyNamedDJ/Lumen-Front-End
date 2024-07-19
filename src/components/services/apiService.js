import axios from 'axios';

const API_URL = 'http://localhost:8000';

// http://localhost:8000/
// https://lumen-0q0f.onrender.com

export const sendMessageToAI = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/conversation`, { message });
    return response.data.response;
  } catch (error) {
    console.error('Error sending message to AI:', error);
    throw error;
  }
};