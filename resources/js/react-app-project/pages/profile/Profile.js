import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { useLocation } from "react-router-dom";

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import NavBar from '../../components/navBar/NavBar';
import ProfileEditModal from '../../components/profileEditModal/ProfileEditModal';
import ProfileInfoDisplay from '../../components/ProfileInfoDisplay/ProfileInfoDisplay';

import auth from '../../auth';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    editButton: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2)
    },

}));

const Profile = (props) => {
    // const location = useLocation();
    const classes = useStyles();

    const { userInfo, getUserInfo } = props;

    // for modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = (modalType) => {
        setModalType(modalType);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setModalType('');
        setNewProfileImage({});
    };

    const [usernameHelper, setUsernameHelper] = React.useState('');
    const [emailHelper, setEmailHelper] = React.useState('');
    const [newProfileImage, setNewProfileImage] = React.useState({});
    const [modalType, setModalType] = React.useState('');
    const [newUserInfo, setNewUserInfo] = React.useState({
        newUsername: null,
        newFirstName: null,
        newLastName: null,
        newBio: null,
        newSocialMedia: null,
        newEmail: null,
        newStreet: null,
        newCity: null,
        newState: null,
        newPostalCode: null,
        newCountry: null,
        newDesigner: null,
        newManufacturer: null,
    });

    useEffect(() => {
        setNewUserInfo({
            ...newUserInfo,
            newUsername: userInfo.username,
            newEmail: userInfo.email,
            newFirstName: userInfo.firstName,
            newLastName: userInfo.lastName,
            newBio: userInfo.bio,
            newSocialMedia: userInfo.socialMedia,
            newStreet: userInfo.street,
            newCity: userInfo.city,
            newState: userInfo.state,
            newPostalCode: userInfo.postalCode,
            newCountry: userInfo.country,
            newDesigner: userInfo.roles.includes('designer'),
            newManufacturer: userInfo.roles.includes('manufacturer')
        });


    }, [userInfo]);


    const handleUpdateUserSubmit = () => {
        const userUpdateInfo = {
            first_name: newUserInfo.newFirstName,
            last_name: newUserInfo.newLastName,
            bio: newUserInfo.newBio,
            social_medias: [
                "facebooke",
                "twitter"
            ],
            social_links: [
                "facebook.com/someone",
                "twitter.com/someone"
            ],
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

        if (isValid) {
            const jwToken = auth.getToken();
            const authAxios = axios.create({
                headers: {
                    Authorization: `Bearer ${jwToken}`
                }
            });

            authAxios.post('/api/auth/update-user-information', userUpdateInfo)
                .then(res => {
                    // console.log(res);
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

        setModalType('');
    };

    const handleProfilePicUpdate = () => {
        const formData = new FormData();
        formData.append('display_picture', newProfileImage[0]);
        const jwToken = auth.getToken();
        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${jwToken}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        authAxios.post('/api/auth/update-user-information', formData)
            .then(res => {
                // console.log(res);
                const jwToken = auth.getToken();
                getUserInfo(jwToken);
            })
            .catch(err => console.log(err))
            .then(() => {
                handleClose();
            });
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
                <ProfileInfoDisplay userInfo={userInfo} handleOpen={handleOpen} />
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <Button className={classes.editButton} variant='contained' onClick={() => handleOpen('info')}>Edit</Button>
                    </Grid>
                </Grid>
                <ProfileEditModal
                    open={open}
                    modalType={modalType}
                    handleClose={handleClose}
                    handleUpdateUserSubmit={handleUpdateUserSubmit}
                    newUserInfo={newUserInfo}
                    setNewUserInfo={setNewUserInfo}
                    usernameHelper={usernameHelper}
                    emailHelper={emailHelper}
                    setNewProfileImage={setNewProfileImage}
                    handleProfilePicUpdate={handleProfilePicUpdate}
                />
            </Container>
        </div>
    );
};

export default Profile;
