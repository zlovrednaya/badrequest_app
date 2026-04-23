import React, { createContext, useState, useEffect} from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    console.log('auth reinit');
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = async (userData) => {
        try {
            const res = await axios( window.location.href + 'login', {
                method: 'POST', 
                data: JSON.stringify(userData),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }),
            });
            if(res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setUser(res.data.user);

                return {
                    success: true, 
                };
            } else {
                return {
                    success: false, 
                    text: 'Incorrect login or password',
                };
            }
        } catch (err) {
            return {
                success: false, 
                text: err.response?.data?.message || 'Something went wrong' 
            }
        }
    }

    const logout = () => {
        console.log("logout");
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const getUser = async () => {
        await axios.get('/user')
        .then(res => {
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
        })
        .catch(() => {
            logout();
        })
    };

    useEffect(() => {
        if(localStorage.getItem("token")) {
            getUser();
            console.log('getuser');
        }
    }, []);

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}