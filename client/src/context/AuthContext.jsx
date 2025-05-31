import {createContext, useCallback, useEffect, useState} from 'react';
import { postRequest } from '../utils/services';
import { baseUrl } from '../utils/services';

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    console.log("User",user);
    console.log("loginInfo",loginInfo);
    useEffect(() => {
        const user = localStorage.getItem('User');
        setUser(JSON.parse(user));
    }, []);

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);

    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo));
        setIsRegisterLoading(false);
        if (response.error) {
            return setRegisterError(response);
        }
        localStorage.setItem('User', JSON.stringify(response));
        setUser(response);
    }, [registerInfo]);

    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        console.log("Sending login info:", loginInfo); // 👈 Add this

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo));
        console.log("Response from login:", response); // 👈 Add this

        setIsLoginLoading(false);
        if (response.error) {
            console.log("Login error:", response); 
            return setLoginError(response);
        }

        localStorage.setItem('User', JSON.stringify(response));
        return setUser(response);
    }, [loginInfo])


    const logoutUser = useCallback(() => { 
        localStorage.removeItem('User');
        setUser(null);
    }, [])

    return <AuthContext.Provider value ={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isLoginLoading
    }}>{children}</AuthContext.Provider>
}