import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                console.log("Attempting to fetch user data...");
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log("No token found in local storage");
                    setUser(null);
                    return;
                }

                console.log("Token found:", token);

                const response = await axios.get('https://lumen-0q0f.onrender.com/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });
                console.log("User data fetched successfully:", response.data);
                setUser(response.data.user);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
                if (error.response) {
                    // Server responded with a status other than 200 range
                    console.error("Error response data:", error.response.data);
                    console.error("Error response status:", error.response.status);
                    console.error("Error response headers:", error.response.headers);
                } else if (error.request) {
                    // Request was made but no response was received
                    console.error("Error request data:", error.request);
                } else {
                    // Something happened in setting up the request
                    console.error("Error message:", error.message);
                }
                setUser(null);
            }
        };

        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={user}>
            {children}
        </UserContext.Provider>
    );
};