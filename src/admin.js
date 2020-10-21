import React, {useContext, useState} from 'react';
import './admin.css'
import {AuthContext} from './authcontext'
require('dotenv').config({path: '/var/www/backend/.env'})

function Admin() {
    
    const {rootState} = useContext(AuthContext);
    const {isAuth} = rootState;

    if (isAuth) {
        return(
            <div className="admin">
                <h2>Ahoj, !</h2>
            </div>
        )
    } 
    else return(<Login/>)
}

function Login() {

    const {loginUser} = useContext(AuthContext);
    
    const initialState = {
        userInfo:{
            user:'',
            pass:'',
        },
        errorMsg: null,
        successMsg: null,
    }

    const [state,setState] = useState(initialState);

    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (event.target.checkValidity) {
            if (await loginUser(state.userInfo)) {

            }
            else setState({...state, errorMsg: 'Invalid password'})
        }
    }
    return(
        <div className="login">
            <h1>Login</h1>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="text" id="user" name="username" placeholder="Username..."
                        value={state.user}
                        onChange={e => onChangeValue}
                        required
                    />
                    <input type="password" id="pass" name="password" placeholder="Password..."
                        value={state.pass}
                        onChange={e => onChangeValue}
                        required
                    />
                    <input type="submit" id="submit" name="login" value="Login"/>
                </form>
            </div>
            {state.errorMsg && 
            <div>
                <p>Invalid password!</p>
            </div>}
        </div>
    )
}

export default Admin;