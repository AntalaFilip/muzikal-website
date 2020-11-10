import React, { createContext, Component } from "react";
import axios from 'axios';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
export const AuthContext = createContext();

// Define the base URL
const Axios = axios.create({
    baseURL: 'https://backend.felixmuzikal.sk/',
});

class AuthContextProvider extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    constructor(props) {
        super(props);
        this.auth();
    }
    state = {
        isAuth: false,
        data: null,
    }
    logout = () => {
        const { cookies } = this.props;
        cookies.remove('sessionToken');
        this.setState({
            ...this.state,
            isAuth: false
        })
    }
    login = async (user) => {
        const { cookies } = this.props;
        Axios.post('login', {
            user: user.user,
            pass: user.pass,
        }).then(result => {
            if (result.status === 200) {
                cookies.set('sessionToken', result.data.token);
                this.auth();
                return result.data;
            }
            else {
                console.log(`Login failed: ${user}`)
            }
        })
    }
    auth = async () => {
        const { cookies } = this.props;
        const token = cookies.get('sessionToken');

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
                    } else this.logout();
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

export default withCookies(AuthContextProvider);