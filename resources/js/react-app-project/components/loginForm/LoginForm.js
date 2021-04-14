import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}));

const LoginForm = (props) => {
    const classes = useStyles();
    const {
        setLoginUsername,
        loginUsername,
        loginPassword,
        setLoginPassword,
        handleSubmit,
        usernameHelper,
        passwordHelper
    } = props;

    const errorTest = false;

    return (
        <div className={classes.flexGrow}>
            <Grid container justify='center'>
                <Grid item container xs={12} justify='center'>
                    <Typography variant='h2'>Sckedio</Typography>
                </Grid>
                <Box border={1} width={380} borderRadius='borderRadius' borderColor='grey.500' p={3} mt={2}>
                    <Grid container spacing={3}>
                        <Grid item container xs={12} justify='center'>
                            <Typography variant='h5'>Login</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='username-input'
                                label='Username'
                                variant='outlined'
                                fullWidth
                                value={loginUsername}
                                onChange={event => setLoginUsername(event.target.value)}
                                error={usernameHelper === '' ? false : true}
                                helperText={usernameHelper}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id='password-input'
                                label='Password'
                                type='password'
                                variant='outlined'
                                fullWidth
                                value={loginPassword}
                                onChange={event => setLoginPassword(event.target.value)}
                                error={passwordHelper === '' ? false : true}
                                helperText={passwordHelper}
                            />
                        </Grid>
                        <Grid item container xs={12} justify='center'>
                            <Button
                                variant="contained" color="primary"
                                onClick={handleSubmit}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item container xs={12} justify='center'>
                            <Typography variant='body2'><Link href='/forgot-password' onClick={() => console.log('clicked')}>Forgot your password?</Link></Typography>
                        </Grid>
                        <Grid item container xs={12} justify='center'>
                            <Typography variant='body2'>First time here? <Link href='/create-account'>Create an account</Link></Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        </div>
    );
};

export default LoginForm;