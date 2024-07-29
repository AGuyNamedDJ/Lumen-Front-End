import axios from 'axios';

const API_URL = 'https://lumen-0q0f.onrender.com';
const AI_BACKEND_URL = 'https://lumen-back-end-flask.onrender.com';

// Test function to classify a message
const classifyMessage = async (message) => {
    try {
        const response = await axios.post(`${AI_BACKEND_URL}/classify`, { message });
        console.log('Classify Response:', response.data);
    } catch (error) {
        console.error('Error classifying message:', error);
    }
};

// Test function to send a message to AI
const sendMessageToAI = async (message) => {
    try {
        const response = await axios.post(`${AI_BACKEND_URL}/conversation`, { message });
        console.log('AI Response:', response.data);
    } catch (error) {
        console.error('Error sending message to AI:', error);
    }
};

// Test function to call Lumen prediction API
const callLumenPredictionAPI = async (message) => {
    try {
        const response = await axios.post(`${API_URL}/api/lumen_1/predict`, { message });
        console.log('Lumen Prediction Response:', response.data);
    } catch (error) {
        console.error('Error calling the prediction API:', error);
    }
};

// Test classifyMessage
classifyMessage('Test message for classification');

// Test sendMessageToAI
sendMessageToAI('Test message for AI conversation');

// Test callLumenPredictionAPI
callLumenPredictionAPI('Test message for prediction');