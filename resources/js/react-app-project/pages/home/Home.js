import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Footer from '../../components/footer/Footer';
import Infographic from '../../components/infographic/Infographic';
import NavBar from '../../components/navBar/NavBar';

import axios from 'axios';
import notebookImage from '../../../../assets/notebook.jpg'
import stayTunedImage from '../../images/pexels-andrea-piacquadio-842554.jpg'

const useStyles = makeStyles((theme) => ({
    blackTextBackground: {
        backgroundColor: 'rgba(0,0,0, 0.30)',
        paddingLeft: 5,
        paddingRight: 5
    },
    circleGrid: {
        fontSize: 80,
        [theme.breakpoints.down('xs')]: {
            fontSize: 40,
        },
    },
    forms: {
        direction: 'column',
        [theme.breakpoints.up('xs')]: {
            direction: 'row'
        },
    },
    formSubtitle: {
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2),
            fontSize: 16,
        },
    },
    root: {
        marginTop: theme.spacing(3)
    },
    stepGrid: {
        marginTop: 100,
        marginBottom: 100,
    },
    stepGridIcon: {
        [theme.breakpoints.down('xs')]: {
            width: 50,
            height: 50
        },
    },
    stepGridText: {
        [theme.breakpoints.down('xs')]: {
            fontSize: 18,
        },
    },
    subscribe: {
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(4),
        },
    },
    topSectionBackground: {
        height: 'calc(100vh - 66px)',
        backgroundImage: `url(${notebookImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top-center',
        backgroundRepeat: 'no-repeat',
        padding: 0,
        color: 'white'
    },
}));

const Home = (props) => {
    const classes = useStyles();
    let history = useHistory();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'), { noSsr: true });

    const [formName, setFormName] = React.useState('');
    const [formEmail, setFormEmail] = React.useState('');
    const [formButtonText, setFormButtonText] = React.useState('Subscribe');
    const [emailHelper, setEmailHelper] = React.useState('');
    const [nameHelper, setNameHelper] = React.useState('');

    const handleSendForm = () => {
        const formObj = {
            name: formName,
            email: formEmail
        };

        const isValid = validateInputs();

        if (isValid) {
            axios.post('/api/subscriber/create', formObj)
                .then(res => {
                    // console.log(res);
                })
                .catch(err => console.log(err))
                .then(() => {
                    setFormButtonText('Success!');
                    setFormName('');
                    setFormEmail('');
                });
        }

    };

    const validateInputs = () => {

        const emailIsValid = /\S+@\S+\.\S+/.test(formEmail);

        const nameIsValid = formName.length > 0;

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

        if (nameIsValid && emailIsValid) {
            return true;
        } else {
            return false;
        }
    };

    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} roles={props.roles} currentRoleType={props.currentRoleType} handleRoleType={props.handleRoleType} />
            <div className={classes.root}>
                <Grid container justify='center'>
                    <Grid item container xs={12} justify='center' spacing={3}>
                        <Grid item container xs={12} justify='center' spacing={3} className={classes.topSectionBackground}>

                            <Grid item xs={12}>
                                <Typography variant='h2' align='center'><span className={classes.blackTextBackground}>The Marketplace for Ideas</span></Typography>
                            </Grid>

                            <Grid item container xs={12} sm={10} md={6} spacing={3}>
                                <Typography variant='h5' align='center'><span className={classes.blackTextBackground}>Sckedio connects people who have an idea for a product with people who want to build and buy their idea</span></Typography>

                                {isMobile ?
                                    <Grid item container xs={12}>
                                        <Grid item xs={12}>
                                            <Box align="center">
                                                <Button variant='contained' color='primary' onClick={() => history.push('/sell')} >Submit an Idea</Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box align="center">
                                                <Button variant='contained' color='primary' onClick={() => history.push('/build')}>Build</Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Box align="center">
                                                <Button variant='contained' color='primary' onClick={() => history.push('/buy')}>Buy New Products</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    :
                                    <Grid item container xs={12} justify='space-between' >
                                        <Grid item>

                                            <Button variant='contained' color='primary' onClick={() => history.push('/sell')} >Submit an Idea</Button>
                                        </Grid>
                                        <Grid item>

                                            <Button variant='contained' color='primary' onClick={() => history.push('/build')}>Build</Button>
                                        </Grid>
                                        <Grid item>

                                            <Button variant='contained' color='primary' onClick={() => history.push('/buy')}>Buy New Products</Button>
                                        </Grid>
                                    </Grid>
                                }

                            </Grid>
                        </Grid>

                        <Grid item xs={12}>
                            <Infographic />
                        </Grid>

                        <Grid item container xs={12} justify='space-between' spacing={1}>
                            <Grid item xs={12} sm={6} md={5}>
                                <img src={stayTunedImage} width='100%' />
                            </Grid>
                            <Grid item container xs={12} sm={6} md={7} justify='space-around'>
                                <Typography variant='h4' align='center' gutter="true">Stay tuned in</Typography>
                                <Typography variant='h5' align='center' gutter="true" className={classes.formSubtitle}>Sckedio embraces the spirit of innovation, so make sure to keep up to date on our big changes</Typography>
                                <Grid item container xs={12} spacing={1} align='center' className="forms">
                                    <Grid item xs={12} sm={12} md={4}>
                                        <TextField
                                            id="form-name"
                                            label="Name"
                                            variant="outlined"
                                            size='small'
                                            value={formName}
                                            onChange={event => setFormName(event.target.value)}
                                            error={nameHelper === '' ? false : true}
                                            helperText={nameHelper}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={4}>
                                        <TextField
                                            id="form-email"
                                            label="Email"
                                            variant="outlined"
                                            size='small'
                                            value={formEmail}
                                            onChange={event => setFormEmail(event.target.value)}
                                            error={emailHelper === '' ? false : true}
                                            helperText={emailHelper}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={4}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.subscribe}
                                            onClick={handleSendForm}
                                        >{formButtonText}</Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
