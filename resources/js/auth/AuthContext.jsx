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
        await axios( window.location.href + 'login', {
            method: 'POST', 
            data: JSON.stringify(userData),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
        })
        .then(res => {
            console.log(res.data);
            if(res.data.token) {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data.user));
                setUser(res.data.user);
            } else {
                setServerMessage({
                    success: false, 
                    text: 'Incorrect login or password' 
                });
            }
        })
        .catch(err => {
            console.log(err);
            let errors = err.response.data.errors;
            let errorText = err.response.data.message;
            setServerMessage({ 
                success: false, 
                text: err.response?.data?.message || 'Something went wrong' 
            });
        });
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