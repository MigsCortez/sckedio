import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import About from './pages/about/About';
import Build from './pages/build/Build';
import Buy from './pages/buy/Buy';
import CircularProgress from '@material-ui/core/CircularProgress';
import CreateAccount from './pages/createAccount/CreateAccount';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import PasswordForgotRequest from './pages/passwordForgetRequest/PasswordForgotRequest';
import PasswordReset from './pages/passwordReset/PasswordReset';
import Product from './pages/product/Product';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Sell from './pages/sell/Sell';
import GetStarted from './pages/getStarted/GetStarted';
import auth from './auth';
import jwt from 'jsonwebtoken';
import axios from 'axios';

/* Anything that has register is temporary */
import Register from './pages/register/Register';

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    }
}));

const App = () => {
    const classes = useStyles();
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const [tokenExpired, setTokenExpired] = React.useState(false);
    // const [timeoutVar, setTimeoutVar] = React.useState();

    // setTimeout variable
    let timeFunc;

    // JWT checks
    useEffect(() => {
        console.log('app load');

        runRefresh(()=>{
            setLoading(false);
        });

        // // Get JWT from localStorage (if it exists)
        // const jwToken = localStorage.getItem('token');

        // // for deployment JWT logic
        // // const jwToken = auth.getToken();

        // // If JWT exists in localStorage
        // if (jwToken) {

        //     // Decode JWT (to get expire time)
        //     const decodedToken = jwt.decode(jwToken);
        //     console.log('token expire: ' + decodedToken.exp);

        //     // Get current time to compare
        //     const dateNow = new Date();
        //     console.log('current time: ' + (dateNow.getTime() / 1000));

        //     // Check if JWT expire time is less than current time (/1000 to convert)
        //     if (decodedToken.exp < (dateNow.getTime() / 1000)) {
        //         // not currently using this, might need in future
        //         setTokenExpired(true);

        //         handleLogout();
        //         // If JWT is NOT expired
        //     } else {
        //         // Log in via auth, flip logged in state
        //         auth.login(() => {
        //             setLoggedIn(true);
        //         });
        //     }
        // } 
        // setLoading(false);
    }, []);

    const runRefresh = (callback) => {
        console.log('refresh');
        axios.get('/api/auth/refresh')
            .then(res => {
                console.log(res);
                // JWT token
                const jwToken = res.data.access_token;
                // seconds to JWT expire
                const secondsToExpire = res.data.expires_in;

                // for deployment JWT logic
                auth.setToken(jwToken);

                // flips authenticated to true
                auth.login(() => {
                    setLoggedIn(true);
                    tokenTimeKeeper(secondsToExpire);
                    // history.push({
                    //     pathname: '/'
                    // });
                });
            })
            .catch(err => {
                console.log(err);
                clearTimeout(timeFunc);
                // Log out via auth, flip logged in state, remove token from storage
                auth.logout(() => {
                    // localStorage.removeItem('token');
                    setLoggedIn(false);
                });
            })
            .then(()=>{
                callback();
            });
    };

    // let timeoutVar;
    const handleLogout = () => {
        console.log('logged out');
        // clearTimeout(timeoutVar);
        clearTimeout(timeFunc);

        const jwToken = auth.getToken();

        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${jwToken}`
            }
        });

        authAxios.get('/api/auth/logout')
            .then(res => {
                console.log(res);
                // Log out via auth, flip logged in state, remove token from storage
                auth.logout(() => {
                    // localStorage.removeItem('token');
                    setLoggedIn(false);
                });

            })
            .catch(err => {
                console.log(err);
                handleLogout();
            });


    };


    const tokenTimeKeeper = (numOfSeconds) => {
        // numOfSeconds = 30;
        console.log('timer started');
        // setTimeoutVar(setTimeout(runRefresh, numOfSeconds * 1000));
        timeFunc = setTimeout(runRefresh, (numOfSeconds-10) * 1000);
    };

    return (
        loading ? 
            <div className={classes.center}>
                <CircularProgress /> 
            </div> :
            <React.Fragment>
                <CssBaseline />
                <Router>
                    <Switch>
                        <Route exact path='/' component={() => <Home loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/sell' component={() => <Sell loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/buy' component={() => <Buy loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/build' component={() => <Build loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/about' component={() => <About loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/get-started' component={() => <GetStarted loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <ProtectedRoute exact path='/profile' component={() => <Profile loggedIn={loggedIn} handleLogout={handleLogout} />} />
                        <Route exact path='/create-account' component={CreateAccount} />
                        <Route exact path='/login' component={() => <Login setLoggedIn={setLoggedIn} tokenTimeKeeper={tokenTimeKeeper} />} />
                        <Route exact path='/forgot-password' component={PasswordForgotRequest} />
                        {/* <Route exact path='/password-reset' component={PasswordReset} /> */}
                        <Route path='/password-reset/:token'>
                            <PasswordReset />
                        </Route>
                        <Route path='/product/:id'>
                            <Product loggedIn={loggedIn} handleLogout={handleLogout} />
                        </Route>

                        <Route exact path='/register' component={Register} />

                        <Route path='*' component={() => '404 NOT FOUND'} />
                    </Switch>
                </Router>
            </React.Fragment>
    );
};

export default App;