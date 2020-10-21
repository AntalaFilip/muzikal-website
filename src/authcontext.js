import React, { createContext,Component } from "react";
import axios from 'axios'
export const AuthContext = createContext();

// Define the base URL
const Axios = axios.create({
    baseURL: 'https://backend.muzikalvrazdapodlaobete.sk/',
});

class AuthContextProvider extends Component{
    constructor(){
        super();
        this.isLoggedIn();
    }

    // Root State
    state = {
        showLogin:true,
        isAuth:false,
        theUser:null,
    }
    
    // Toggle between Login & Signup page
    toggleNav = () => {
        const showLogin = !this.state.showLogin;
        this.setState({
            ...this.state,
            showLogin
        })
    }

    // On Click the Log out button
    logoutUser = () => {
        localStorage.removeItem('loginToken');
        this.setState({
            ...this.state,
            isAuth:false
        })
    }

    registerUser = async (user) => {

        // Sending the user registration request
        const register = await Axios.post('register',{
            name:user.name,
            email:user.email,
            password:user.password 
        });

        return register.data;
    }


    loginUser = async (user) => {

        // Sending the user Login request
        Axios.post('login', user)
        .then(result => {
            if (result.status === 200) {
                localStorage.setItem('loginToken', result.data.token);
                this.isLoggedIn();
                return result.data;
            }
            else {
                console.log(`Login failed: ${user}`)
            }
        })
    }

    // Checking user logged in or not
    isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');

        // If inside the local-storage has the JWT token
        if(loginToken){

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['Authorization'] = loginToken;

            // Fetching the user information
            Axios.post('auth')
            .then(result => {
                if(result.status === 200){
                    this.setState({
                        ...this.state,
                        isAuth:true,
                        theUser:result.data.user
                    });
                    console.log(`Logged in as ${this.state.theUser}`);
                }
                console.log(`Auth failed`);
            })
        }
    }

    render(){
        const contextValue = {
            rootState:this.state,
            toggleNav:this.toggleNav,
            isLoggedIn:this.isLoggedIn,
            registerUser:this.registerUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser
        }
        return(
            <AuthContext.Provider value={contextValue}>
                {this.props.children}
            </AuthContext.Provider>
        )
    }

}

export default AuthContextProvider;