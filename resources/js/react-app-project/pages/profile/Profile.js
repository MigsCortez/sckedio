import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NavBar from '../../components/navBar/NavBar';
import ProfileEditModal from '../../components/profileEditModal/ProfileEditModal';
import ProfileInfoDisplay from '../../components/ProfileInfoDisplay/ProfileInfoDisplay';
import { useLocation } from "react-router-dom";
import auth from '../../auth';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    editButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },

}));

const Profile = (props) => {
    const location = useLocation();
    const classes = useStyles();

    const { userInfo, getUserInfo } = props;

    // for modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [usernameHelper, setUsernameHelper] = React.useState('');
    const [emailHelper, setEmailHelper] = React.useState('');

    // const [userInfo, setUserInfo] = React.useState({
    //     username: null,
    //     firstName: null,
    //     lastName: null,
    //     email: null,
    //     street: null,
    //     city: null,
    //     state: null,
    //     postalCode: null,
    //     country: null,
    //     profilePhoto: 'https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-picture-default-avatar-photo-placeholder-profile-picture-eps-file-easy-to-edit-125707135.jpg'
    // });

    const [newUserInfo, setNewUserInfo] = React.useState({
        newUsername: null,
        newFirstName: null,
        newLastName: null,
        newEmail: null,
        newStreet: null,
        newCity: null,
        newState: null,
        newPostalCode: null,
        newCountry: null,
        newDesigner: null,
        newManufacturer: null
    });

    useEffect(() => {
        setNewUserInfo({
            ...newUserInfo,
            newUsername: userInfo.username,
            newEmail: userInfo.email,
            newFirstName: userInfo.firstName,
            newLastName: userInfo.lastName,
            newStreet: userInfo.street,
            newCity: userInfo.city,
            newState: userInfo.state,
            newPostalCode: userInfo.postalCode,
            newCountry: userInfo.country,
            newDesigner: userInfo.roles.includes('designer'),
            newManufacturer: userInfo.roles.includes('manufacturer')
        });

    }, [userInfo]);

    // useEffect(() => {
    //     console.log('profile reload');
    //     // const jwToken = localStorage.getItem('token');
    //     const jwToken = auth.getToken();
    //     getUserInfo(jwToken);
    // }, []);

    // const getUserInfo = (newToken) => {
    //     const authAxios = axios.create({
    //         headers: {
    //             Authorization: `Bearer ${newToken}`
    //         }
    //     });
    //     authAxios.get('/api/auth/user')
    //         .then(res => {
    //             console.log(res);
    //             setUserInfo({
    //                 ...userInfo,
    //                 username: res.data[0].username,
    //                 email: res.data[0].email,
    //                 firstName: res.data[1].first_name,
    //                 lastName: res.data[1].last_name,
    //                 street: res.data[1].street,
    //                 city: res.data[1].city,
    //                 state: res.data[1].state,
    //                 postalCode: res.data[1].postal_code,
    //                 country: res.data[1].country
    //             });
    //             setNewUserInfo({
    //                 ...newUserInfo,
    //                 newUsername: res.data[0].username,
    //                 newEmail: res.data[0].email,
    //                 newFirstName: res.data[1].first_name,
    //                 newLastName: res.data[1].last_name,
    //                 newStreet: res.data[1].street,
    //                 newCity: res.data[1].city,
    //                 newState: res.data[1].state,
    //                 newPostalCode: res.data[1].postal_code,
    //                 newCountry: res.data[1].country
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         });
    // };

    const handleUpdateUserSubmit = () => {
        console.log('submit');
        const userUpdateInfo = {
            first_name: newUserInfo.newFirstName,
            last_name: newUserInfo.newLastName,
            state: newUserInfo.newState,
            city: newUserInfo.newCity,
            street: newUserInfo.newStreet,
            postal_code: newUserInfo.newPostalCode,
            country: newUserInfo.newCountry,
            username: newUserInfo.newUsername,
            email: newUserInfo.newEmail,
            designer: newUserInfo.newDesigner,
            manufacturer: newUserInfo.newManufacturer

        };

        const isValid = validateInputs();
        console.log('is valid: ' + isValid);

        if (isValid) {
            // const jwToken = localStorage.getItem('token');
            const jwToken = auth.getToken();
            const authAxios = axios.create({
                headers: {
                    Authorization: `Bearer ${jwToken}`
                }
            });

            console.log(userUpdateInfo);
            authAxios.post('/api/auth/update-user-information', userUpdateInfo)
                // authAxios.post('/api/auth/create-user-information', userUpdateInfo)
                .then(res => {
                    console.log(res);
                    // const jwToken = localStorage.getItem('token');
                    const jwToken = auth.getToken();
                    getUserInfo(jwToken);
                })
                .catch(err => {
                    console.log(err);
                })
                .then(() => {
                    handleClose();
                });
        };
    };

    const validateInputs = () => {
        const usernameIsValid = /^[a-zA-Z0-9]+$/.test(newUserInfo.newUsername);
        const usernameIsLength = stringLengthTest(newUserInfo.newUsername, 4, 25);

        const emailIsValid = /\S+@\S+\.\S+/.test(newUserInfo.newEmail);

        if (!usernameIsValid) {
            setUsernameHelper('Can only contain letters and numbers');
        } else {
            setUsernameHelper('');
            if (!usernameIsLength) {
                setUsernameHelper('Must be between 4 and 25 characters');
            } else {
                setUsernameHelper('');
            }
        }

        if (!emailIsValid) {
            setEmailHelper('Please enter a valid email');
        } else {
            setEmailHelper('');
        }

        if (usernameIsValid && usernameIsLength && emailIsValid) {
            return true;
        } else {
            return false;
        }
    };

    const stringLengthTest = (string, min, max) => {
        const stringLength = string.length;

        if (stringLength < min || stringLength > max) {
            return false;
        } else {
            return true;
        }
    };

    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} roles={props.roles} currentRoleType={props.currentRoleType} handleRoleType={props.handleRoleType} />
            <Container >
                <Box my={3}>
                    <Typography variant='h2'>Profile</Typography>
                </Box>
                <ProfileInfoDisplay userInfo={userInfo} />
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Button className={classes.editButton} variant='contained' onClick={handleOpen}>Edit</Button>
                    </Grid>
                </Grid>
                <ProfileEditModal
                    open={open}
                    handleClose={handleClose}
                    handleUpdateUserSubmit={handleUpdateUserSubmit}
                    newUserInfo={newUserInfo}
                    setNewUserInfo={setNewUserInfo}
                    usernameHelper={usernameHelper}
                    emailHelper={emailHelper}
                />
            </Container>
        </div>
    );
};

export default Profile;