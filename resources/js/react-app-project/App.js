import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';

import Build from './pages/build/Build';
import Buy from './pages/buy/Buy';
import CreateAccount from './pages/createAccount/CreateAccount';
import GetStarted from './pages/getStarted/GetStarted';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import PasswordForgotRequest from './pages/passwordForgetRequest/PasswordForgotRequest';
import PasswordReset from './pages/passwordReset/PasswordReset';
import Product from './pages/product/Product';
import Profile from './pages/profile/Profile';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import Sell from './pages/sell/Sell';

import auth from './auth';
import axios from 'axios';

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
    const [currentRoleType, setCurrentRoleType] = React.useState('buyer');
    const [userInfo, setUserInfo] = React.useState({
        username: null,
        firstName: null,
        lastName: null,
        bio: null,
        email: null,
        street: null,
        city: null,
        state: null,
        postalCode: null,
        country: null,
        roles: [],
        profilePhoto: 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg'
    });

    // setTimeout variable
    let timeFunc;

    // JWT checks
    useEffect(() => {
        runRefresh(() => {
            const jwToken = auth.getToken();
            getUserInfo(jwToken);
        });
    }, []);

    const getUserInfo = (newToken) => {
        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${newToken}`
            }
        });
        authAxios.get('/api/auth/user')
            .then(res => {
                // console.log(res);
                setUserInfo({
                    ...userInfo,
                    username: res.data[0].username,
                    email: res.data[0].email,
                    firstName: res.data[1].first_name,
                    lastName: res.data[1].last_name,
                    bio: res.data[1].bio,
                    street: res.data[1].street,
                    city: res.data[1].city,
                    state: res.data[1].state,
                    postalCode: res.data[1].postal_code,
                    country: res.data[1].country,
                    roles: res.data[2],
                    profilePhoto: res.data[0].display_picture ? res.data[0].display_picture : 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg'
                });
            })
            .catch(err => {
                console.log(err);
            })
            .then(() => {
                setLoading(false);
            });
    };

    const runRefresh = (callback) => {
        axios.get('/api/auth/refresh')
            .then(res => {
                // console.log(res);

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
                });
            })
            .catch(err => {
                console.log(err);
                clearTimeout(timeFunc);
                // Log out via auth, flip logged in state, remove token from storage
                auth.logout(() => {
                    setLoggedIn(false);
                });
            })
            .then(() => {
                callback();
            });
    };

    const handleLogout = () => {
        clearTimeout(timeFunc);

        const jwToken = auth.getToken();
        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${jwToken}`
            }
        });

        authAxios.get('/api/auth/logout')
            .then(res => {
                // console.log(res);

                // Log out via auth, flip logged in state, remove token from storage
                auth.logout(() => {
                    setLoggedIn(false);
                });

            })
            .catch(err => {
                console.log(err);
                handleLogout();
            });
    };

    const tokenTimeKeeper = (numOfSeconds) => {
        timeFunc = setTimeout(runRefresh, (numOfSeconds - 10) * 1000);
    };

    const handleRoleType = (type) => {
        setCurrentRoleType(type);
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
                        <Route exact path='/' component={() => <Home loggedIn={loggedIn} handleLogout={handleLogout} roles={userInfo.roles} currentRoleType={currentRoleType} handleRoleType={handleRoleType} />} />
                        <Route exact path='/sell' component={() => <Sell loggedIn={loggedIn} handleLogout={handleLogout} roles={userInfo.roles} currentRoleType={currentRoleType} handleRoleType={handleRoleType} />} />
                        <Route exact path='/buy' component={() => <Buy loggedIn={loggedIn} handleLogout={handleLogout} roles={userInfo.roles} currentRoleType={currentRoleType} handleRoleType={handleRoleType} />} />
                        <Route exact path='/build' component={() => <Build loggedIn={loggedIn} handleLogout={handleLogout} roles={userInfo.roles} currentRoleType={currentRoleType} handleRoleType={handleRoleType} />} />
                        <Route exact path='/get-started' component={() => <GetStarted loggedIn={loggedIn} handleLogout={handleLogout} roles={userInfo.roles} currentRoleType={currentRoleType} handleRoleType={handleRoleType} />} />
                        <ProtectedRoute exact path='/profile' component={() => <Profile loggedIn={loggedIn} handleLogout={handleLogout} userInfo={userInfo} getUserInfo={getUserInfo} roles={userInfo.roles} currentRoleType={currentRoleType} handleRoleType={handleRoleType} />} />
                        <Route exact path='/create-account' component={CreateAccount} />
                        <Route exact path='/login' component={() => <Login setLoggedIn={setLoggedIn} tokenTimeKeeper={tokenTimeKeeper} getUserInfo={getUserInfo} />} />
                        <Route exact path='/forgot-password' component={PasswordForgotRequest} />
                        <Route path='/password-reset/:token'>
                            <PasswordReset />
                        </Route>
                        <Route path='/product/:id'>
                            <Product loggedIn={loggedIn} handleLogout={handleLogout} roles={userInfo.roles} currentRoleType={currentRoleType} handleRoleType={handleRoleType} />
                        </Route>

                        <Route path='*' component={() => '404 NOT FOUND'} />
                    </Switch>
                </Router>
            </React.Fragment>
    );
};

export default App;
