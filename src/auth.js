import React from 'react';
import axios from 'axios';
require('dotenv').config('/var/www/backend/.env');
export const AuthContext = React.createContext();

const Axios = axios.create({
    baseURL: 'https://backend.muzikalvrazdapodlaobete.sk/'
})

class AuthContextProvider extends React.Component {
    constructor() {
        super();
        this.checkSession();
    }
    state = {
        isAuth: false,
        userData: null
    }
    auth = async () => {
        const authToken = localStorage.getItem('authToken');
        if (authToken) {
            Axios.defaults.headers.common['Authentication'] = authToken;
            Axios.post('auth')
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
        const Auth = this.auth();
        if (Auth) {
            this.setState({
                ...this.state,
                isAuth: true,
                userData: Auth
            })
            return true;
        } /* else {
            this.setState({
                ...this.state,
                isAuth: false,
                userData: null
            })
            return false;
        } */
    }
    login = async (data) => {
        Axios.post('login', data)
        .then(result => {
            if (result.status === 200) {
                localStorage.setItem('authToken', result.data.token);
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
            <AuthContext.Provider value={contextValue}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}
export default AuthContextProvider;