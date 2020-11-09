import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import * as serviceWorker from './serviceWorker';

import Home from './home';
import About from './about';
import Sponsors from './sponsors';
import Registration from './registration';
import Contact from './contact';
import Team from './team';
import Admin, { Login } from './admin';
import AuthContextProvider, { AuthContext } from './authcontext';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default function App() {
  const { state, logout } = useContext(AuthContext);
  const { isAuth, data } = state;
  return (
    <Router>
      <nav className="nav">
        <Link to="/">Domov</Link>
        <Link to="/about">O muzikáli</Link>
        <Link to="/sponsors">Sponzori</Link>
        <Link to="/registration">Lístky</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/admin" style={{ float: "right" }}>{isAuth ? `${data.fname} ${data.lname}` : "Admin"}</Link>
        {/* <Link to="/logout">Logout</Link> */}
        <Link to="/contact" style={{ float: "right" }}>Kontakt</Link>
        <Link to="/team" style={{ float: "right" }}>Náš team</Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/sponsors">
          <Sponsors />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        <Route path="/blog" render={() => window.location.replace("http://blog-sovy.felixmuzikal.sk")} />
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/team">
          <Team />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  )
}
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
