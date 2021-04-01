import React from 'react';
import { useParams } from 'react-router-dom';

import Container from '@material-ui/core/Container';

import PasswordResetForm from '../../components/passwordResetForm/PasswordResetForm';

import axios from 'axios';

const PasswordReset = () => {
    const { token } = useParams();
    const [resetEmail,setResetEmail] = React.useState('');
    const [resetPassword,setResetPassword] = React.useState('');
    const [resetPasswordCon,setResetPasswordCon] = React.useState('');
    const [emailHelper,setEmailHelper] = React.useState('');
    const [passwordHelper,setPasswordHelper] = React.useState('');
    const [passwordMatchHelper,setPasswordMatchHelper] = React.useState('');

    const handleSubmit = () => {
        const userData = {
            email: resetEmail,
            password: resetPassword,
            password_confirmation: resetPasswordCon,
            token: token
        };

        const isValid = validateInputs();

        if (isValid) {
            axios.post('/api/guest/reset-password', userData)
                .then(res=>{
                    // console.log(res);
                })
                .catch(err=>console.log(err))
        }
    };

    const validateInputs = () => {
        const emailIsValid = /\S+@\S+\.\S+/.test(resetEmail);

        const passwordIsLength = stringLengthTest(resetPassword, 7, 200);

        const passwordIsMatch = passwordMatchTest();  
        
        if (!emailIsValid) {
            setEmailHelper('Please enter a valid email');
        } else {
            setEmailHelper('');
        }

        if (!passwordIsLength) {
            setPasswordHelper('Must be between 7 and 200 characters');
        } else {
            setPasswordHelper('');
        }

        if (!passwordIsMatch) {
            setPasswordMatchHelper('Password does not match');
        } else {
            setPasswordMatchHelper('');
        }

        if (emailIsValid && passwordIsLength && passwordIsMatch) {
            return true;
        } else {
            return false;
        }
    };

    const passwordMatchTest = () => {
        if (resetPassword === resetPasswordCon) {
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
            <Container>
                <PasswordResetForm 
                    resetEmail={resetEmail}
                    setResetEmail={setResetEmail}
                    resetPassword={resetPassword}
                    setResetPassword={setResetPassword}
                    resetPasswordCon={resetPasswordCon}
                    setResetPasswordCon={setResetPasswordCon}
                    handleSubmit={handleSubmit}
                    emailHelper={emailHelper}
                    passwordHelper={passwordHelper}
                    passwordMatchHelper={passwordMatchHelper}
                />
            </Container>
        </div>
    );
};

export default PasswordReset;