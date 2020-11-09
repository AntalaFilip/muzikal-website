import React, { createContext, Component } from "react";
import axios from 'axios'
export const AuthContext = createContext();

// Define the base URL
const Axios = axios.create({
    baseURL: 'https://backend.felixmuzikal.sk/',
});

class AuthContextProvider extends Component {
    constructor() {
        super();
        this.auth();
    }
    state = {
        isAuth: false,
        data: null,
    }
    logout = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth: false
        })
    }
    login = async (user) => {
        Axios.post('login', {
            user: user.user,
            pass: user.pass,
        }).then(result => {
            if (result.status === 200) {
                localStorage.setItem('loginToken', result.data.token);
                this.auth();
                return result.data;
            }
            else {
                console.log(`Login failed: ${user}`)
            }
        })
    }
    auth = async () => {
        const token = localStorage.getItem('loginToken');

        if (token) {
            Axios.defaults.headers.common['Authorization'] = token;
            Axios.post('auth')
                .then(result => {
                    if (result.status === 200) {
                        this.setState({
                            ...this.state,
                            isAuth: true,
                            data: result.data
                        });
                        // console.log(`Logged in as ${this.state.user.user}`);
                    }
                })
        }
        return false;
    }

    render() {
        const contextValue = {
            state: this.state,
            auth: this.auth,
            login: this.login,
            logout: this.logout
        }
        return (
            <AuthContext.Provider value={contextValue}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

}

export default AuthContextProvider;