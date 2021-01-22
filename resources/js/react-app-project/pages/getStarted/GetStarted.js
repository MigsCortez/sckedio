import React, { useEffect } from 'react';
import NavBar from '../../components/navBar/NavBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import GetStartedForm from '../../components/getStartedForm/GetStartedForm';
import axios from 'axios';

const GetStarted = (props) => {
    useEffect(() => {
    }, []);

    const styles = {
        topSectionBackground: {
            height: 500,
            backgroundImage: `url(${"../../images/pexels-lisa-fotios-1090638.jpg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top-center',
            backgroundRepeat: 'no-repeat',
            width: `calc(100vw + 40px)`,
            // width: "100%",
            // margin: 0,
            padding: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white'
        }
    }

    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} />
            <div>
                <Container style={{ margin: 0, padding: 0 }}>

                    <Grid container spacing={0} direction="column" >{/*All page content */}

                        {/*Top section */}
                        <Grid item style={styles.topSectionBackground}>
                            <Box m={4} alignItems='center' justifyContent='center'>
                                <Grid item container xs={12} >
                                    <Grid item xs={false} md={3}>

                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant='h2'>Share your idea with the world</Typography>
                                        <Typography variant='h5'>Follow the quick steps below to get your idea onto Sckedio.</Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Grid>

                        {/* Bottom section */}
                        <Grid item container>

                            <Grid item xs={12} md={4}>
                                <Box margin={5}>
                                    <Typography variant='h3'>Get your idea into the world!</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={8}>
                                <Box m={10}>
                                    <Grid item container>
                                        <GetStartedForm />
                                    </Grid>
                                </Box>

                            </Grid>

                        </Grid>

                    </Grid>

                </Container>

            </div>
        </div>
    );
};

export default GetStarted;