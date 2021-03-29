import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const FeedbackForm = () => {
    const [formName, setFormName] = React.useState('');
    const [formEmail, setFormEmail] = React.useState('');
    const [formMessage, setFormMessage] = React.useState('');
    const [formButtonText, setFormButtonText] = React.useState('Send');
    const [emailHelper, setEmailHelper] = React.useState('');

    const [nameHelper, setNameHelper] = React.useState('');
    const [messageHelper, setMessageHelper] = React.useState('');

    const classes = useStyles();

    const handleSendForm = () => {
        const formObj = {
            name: formName,
            email: formEmail,
            message: formMessage
        };

        const isValid = validateInputs();

        if (isValid) {
            console.log(formObj);
            axios.post('/api/feedback/create')
                .then(res => {
                    console.log(res);
                    setFormButtonText('Success!');
                    setFormName('');
                    setFormEmail('');
                    setFormMessage('');
                })
                .catch(err => console.log(err));

        }

    };

    const validateInputs = () => {

        const emailIsValid = /\S+@\S+\.\S+/.test(formEmail);

        const nameIsValid = formName.length > 0;

        const messageIsValid = formMessage.length > 0;

        if (!emailIsValid) {
            setEmailHelper('Please enter a valid email');
        } else {
            setEmailHelper('');
        }

        if (!nameIsValid) {
            setNameHelper('Please enter a name');
        } else {
            setNameHelper('');
        }

        if (!messageIsValid) {
            setMessageHelper('Please enter a message');
        } else {
            setMessageHelper('');
        }

        if (nameIsValid && emailIsValid && messageIsValid) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <Container maxWidth='md' style={{ marginTop: 50, marginBottom: 50 }}>
            <Typography variant='h5' gutterBottom>Questions or Feedback? Let us know!</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} lg={6}>
                    <TextField
                        fullWidth
                        id="name-input"
                        label="name"
                        variant="outlined"
                        value={formName}
                        onChange={event => setFormName(event.target.value)}
                        error={nameHelper === '' ? false : true}
                        helperText={nameHelper}
                    />
                </Grid>
                <Grid item xs={12} sm={6} lg={6}>
                    <TextField
                        fullWidth
                        id="email-input"
                        label="email"
                        variant="outlined"
                        value={formEmail}
                        onChange={event => setFormEmail(event.target.value)}
                        error={emailHelper === '' ? false : true}
                        helperText={emailHelper}
                    />
                </Grid>
                <Grid item xs={12} lg={12}>
                    <TextField
                        fullWidth
                        id="message-input"
                        label="message"
                        variant="outlined"
                        multiline
                        rows={4}
                        value={formMessage}
                        onChange={event => setFormMessage(event.target.value)}
                        error={messageHelper === '' ? false : true}
                        helperText={messageHelper}
                    />
                </Grid>
            </Grid>
            <Grid container direction='row' justify='flex-end' style={{ marginTop: 15 }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendForm}
                >
                    {formButtonText}
                </Button>
            </Grid>
        </Container>
    );
}

export default FeedbackForm;
