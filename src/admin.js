import React, { useContext, useState } from 'react';
import './admin.css'
import { AuthContext } from './authcontext'
require('dotenv').config({ path: '/var/www/backend/.env' })

function Admin() {
    const { state, logout } = useContext(AuthContext);
    const { isAuth, data } = state;
    if (isAuth) {
        return (
            <div className="admin">
                <h2>Ahoj, {data.fname}!</h2>
                <button onClick={logout}>Logout</button>
            </div>
        )
    }
    else return (<Login />)
}

function Login() {

    const { login } = useContext(AuthContext);

    const initialState = {
        session: {
            user: '',
            pass: '',
        },
        message: null,
    }

    const [state, setState] = useState(initialState);

    const onChangeValue = (e) => {
        setState({
            ...state,
            session: {
                ...state.session,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (event.target.checkValidity) {
            if (!await login(state.session)) {
                setState({ ...state, message: `Invalid Password` })
            }
        }
    }
    return (
        <div className="login">
            <h1>Login</h1>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="text" id="user" name="user" placeholder="Username..."
                        value={state.session.user}
                        onChange={onChangeValue}
                        required
                    />
                    <input type="password" id="pass" name="pass" placeholder="Password..."
                        value={state.session.pass}
                        onChange={onChangeValue}
                        required
                    />
                    <input type="submit" id="submit" name="login" value="Login" />
                </form>
            </div>
            {state.message &&
                <div>
                    <p>{state.message}</p>
                </div>}
        </div>
    )
}

export default Admin;
export { Login, };