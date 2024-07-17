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

                const response = await axios.get('https://lumen-0q0f.onrender.com/api/user/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("User data fetched successfully:", response.data);
                setUser(response.data.user);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
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