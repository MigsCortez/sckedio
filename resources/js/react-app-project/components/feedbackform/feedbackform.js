import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Grid, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

const FeedbackForm = () => {
    const classes = useStyles();

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
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={6}>
                        <TextField
                            fullWidth
                            id="email-input"
                            label="email"
                            variant="outlined"
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
                        />
                    </Grid>
                </Grid>
                <Grid container direction='row' justify='flex-end' style={{ marginTop: 15 }}>
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        Send
                    </Button>
                </Grid>
        </Container>
    );
}

export default FeedbackForm;
