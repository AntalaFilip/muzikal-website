import React from 'react';
import axios from 'axios';
import { auth } from '../api/auth';
require('dotenv').config('/var/www/backend/.env');

const Axios = axios.create({
    baseURL: 'https://backend.muzikalvrazdapodlaobete.sk/'
})

class AuthContextProvider extends React.Component {
    constructor() {
        super();
        this.checkSession();
        this.state = {
            isAuth: true,
            userData: null
        }
    }
    auth = async () => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            Axios.defaults.headers.common['Authentication'] = authToken;
            Axios.get('auth')
            .then(result => {
                if (result.status === 200) {
                    return result.data;
                }
            })
            .catch(error => {
                console.log(error);
            })
        }
        return false;
    }
    checkSession = () => {
        const auth = this.auth();
        if (auth) {
            this.setState({
                ...this.state,
                isAuth: true,
                userData: auth
            })
            return true;
        } else {
            this.setState({
                ...this.state,
                isAuth: false,
                userData: null
            })
            return false;
        }
    }
    login = async (data) => {
        Axios.post('login', data)
        .then(result => {
            if (result.status === 200) {
                localStorage.setItem('authToken', result.token);
                return this.checkSession();
            }
            return false;
        })
        .catch(err => console.log(err))
    }
    logout = () => {
        localStorage.removeItem('authToken');
        this.checkSession();
    }

    render() {
        const contextValue = {
            rootState: this.state,
            auth: this.auth,
            checkSession: this.checkSession,
            login: this.login,
            logout: this.logout
        }
        return(
            <Auth.Provider value={contextValue}>
            </Auth.Provider>
        )
    }
}

export const Auth = React.createContext(auth);
export const CheckSession = React.createContext(auth);
export default AuthContextProvider;