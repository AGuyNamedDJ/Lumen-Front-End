import axios from 'axios';

export const sendMessageToAI = async (message) => {
    try {
        const response = await axios.post('https://lumen-back-end-flask.onrender.com/conversation', {
            message: message,
        });
        return response.data.response;
    } catch (error) {
        console.error('Error sending message to Lumen:', error);
        throw error;
    }
};