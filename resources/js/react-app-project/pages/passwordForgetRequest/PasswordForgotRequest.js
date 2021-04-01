import React from 'react';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import PasswordForgotRequestForm from '../../components/passwordForgotRequestForm/PasswordForgotRequestForm';

const PasswordForgotRequest = () => {
    const [forgotPasswordEmail,setForgotPasswordEmail] = React.useState('');
    const [emailHelper,setEmailHelper] = React.useState('');

    const handleSubmit = () => {
        const emailObj = {
            email: forgotPasswordEmail
        };

        const isValid = validateInputs();

        if (isValid) {
            // console.log('submit');
            // console.log(emailObj);
            axios.post('api/guest/forgot-password', emailObj)
                .then(res => {
                    console.log(res);
                })
                .catch(err=>console.log(err));
        }
    };

    const validateInputs = () => {
        const emailIsValid = /\S+@\S+\.\S+/.test(forgotPasswordEmail);
        if (!emailIsValid) {
            setEmailHelper('Please enter a valid email');
            return false;
        } else {
            setEmailHelper('');
            return true;
        }
    };

    return (
        <div>
            <Container>
                <PasswordForgotRequestForm
                    forgotPasswordEmail={forgotPasswordEmail}
                    setForgotPasswordEmail={setForgotPasswordEmail}
                    emailHelper={emailHelper}
                    handleSubmit={handleSubmit} 
                />
            </Container>
        </div>
    );

};

export default PasswordForgotRequest;