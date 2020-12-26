import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import About from './pages/about/About';
import Build from './pages/build/Build';
import Buy from './pages/buy/Buy';
import CreateAccount from './pages/createAccount/CreateAccount';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Sell from './pages/sell/Sell';
import auth from './auth';
import jwt from 'jsonwebtoken';
import axios from 'axios';

/* Anything that has register is temporary */
import Register from './pages/register/Register';



const App = () => {
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [tokenExpired, setTokenExpired] = React.useState(false);
    const [timeoutVar,setTimeoutVar] = React.useState();

    // JWT checks
    useEffect(() => {
        console.log('app load');

        // Get JWT from localStorage (if it exists)
        const jwToken = localStorage.getItem('token');

        // If JWT exists in localStorage
        if (jwToken) {

            // Decode JWT (to get expire time)
            const decodedToken = jwt.decode(jwToken);
            console.log('token expire: ' + decodedToken.exp);

            // Get current time to compare
            const dateNow = new Date();
            console.log('current time: ' + (dateNow.getTime() / 1000));

            // Check if JWT expire time is less than current time (/1000 to convert)
            if (decodedToken.exp < (dateNow.getTime() / 1000)) {
                // not currently using this, might need in future
                setTokenExpired(true);

                handleLogout();
                // If JWT is NOT expired
            } else {
                // Log in via auth, flip logged in state
                auth.login(() => {
                    setLoggedIn(true);
                });
            }
        }
        setLoading(false);
    });

    // let timeoutVar;
    const handleLogout = () => {
        console.log('logged out');
        clearTimeout(timeoutVar);

        // part of axios log out request
        // const jwToken = localStorage.getItem('token');
        // const authAxios = axios.create({
        //     headers: {
        //         Authorization: `Bearer ${jwToken}`
        //     }
        // });
        
        // Log out via auth, flip logged in state, remove token from storage
        auth.logout(() => {
            localStorage.removeItem('token');
            setLoggedIn(false);

            // authAxios.get('api/auth/logout')
            // .then(res => {
            //     console.log('axios log out');
            //     console.log(res);
            // })
            // .catch(err => {
            //     console.log(err);
            // });
        });
    };

    
    const tokenTimeKeeper = () => {
        console.log('timer started');
        setTimeoutVar(setTimeout(handleLogout, 15 * 60 * 1000));
    };

    return (
        loading ? <h1>loading</h1> :
            <React.Fragment>
                <CssBaseline />
                <Router>
                    <Switch>
                        <Route exact path='/' component={() => <Home loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/sell' component={() => <Sell loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/buy' component={() => <Buy loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/build' component={() => <Build loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/about' component={() => <About loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <ProtectedRoute exact path='/profile' component={() => <Profile loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/create-account' component={CreateAccount} />
                        <Route exact path='/login' component={() => <Login setLoggedIn={setLoggedIn} tokenTimeKeeper={tokenTimeKeeper} />} />

                        <Route exact path='/register' component={Register} />

                        <Route path='*' component={() => '404 NOT FOUND'} />
                    </Switch>
                </Router>
            </React.Fragment>
    );
};

export default App;