import React, { useEffect } from 'react';
import NavBar from '../../components/navBar/NavBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Home = (props) => {

    useEffect(() => {
    }, []);

    let history = useHistory();

    const styles = {
        topSectionBackground: {
            height: 1000,
            backgroundImage: `url(${"../../images/pexels-christina-morillo-1181345.jpg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top-center',
            backgroundRepeat: 'no-repeat',
            width: `calc(100vw + 40px)`,
            // width: "100%",
            // margin: 0,
            padding: 0,
        },
        smallWhiteboardImage: {
            borderColor: 'transparent'
        },
        middleSectionBackground: {
            padding: 50,
        },
        artisanWhiteboardImage: {
            maxWidth: 600
        },
        bottomSectionBackground: {
            height: 600,
            maxHeight: 1000,
            backgroundImage: `url(${"../../images/pexels-andreea-ch-1166644.jpg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'bottom-center',
            backgroundRepeat: 'no-repeat',
            width: `calc(100vw + 40px)`,
            padding: 0,
        }
    }

    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} />
            {/* <h1>Home Page</h1> */}
            <div>
                <Container style={{ margin: 0, padding: 0 }}>

                    <Grid container spacing={0} direction="column" >{/*All page content */}

                        {/*Top section */}
                        <Grid item style={styles.topSectionBackground}>{/*Photo background and container of top panel of marketplace text+smaller image*/}
                            <Box m={4}>
                                <Grid item container xs={12}>{/*Container of "The marketplace..." text and image on right */}
                                    <Grid item xs={12} md={6}>{/*The marketplace for ideas...+Sckedio connects... */}
                                        <Typography variant='h2'>The marketplace for ideas</Typography>
                                        <Typography variant='h5'>Sckedio connects people who have an idea for a product with people who want to build and buy their idea.</Typography>
                                        <Box align="center">
                                            <Button variant="contained" color="primary" onClick={()=>history.push('/get-started')}>Submit an idea</Button>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>{/* Small image of man at whiteboard*/}
                                        <Box display="flex" justifyContent="center" alignItems="center" backgroundSize="contain">
                                            <img src={require("../../images/pexels-christina-morillo-1181345.jpg")} style={styles.smallWhiteboardImage} id="whiteboard-small-image" width="100%" border="100px" alt="whiteboard-small-image" />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Box m={4}>
                                <Grid item container xs={12} >
                                    <Grid item xs={12} md={6}>
                                        <Typography variant='h3'>Your ideas into action.</Typography>
                                        <Typography variant='h5'>Sckedio connects people who have an idea for a product with people who want to build and buy their idea.</Typography>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>

                        {/*Middle section*/}
                        <Grid item style={styles.middleSectionBackground}>

                            <Grid item container>

                                <Grid item xs={12} md={6}>{/* Image of artisan drawing on whiteboard*/}
                                    <Box display="flex" justifyContent="center" alignItems="center" backgroundSize="contain">
                                        <img src={require("../../images/artisan.jpg")} style={styles.artisanWhiteboardImage} id="artisan-image" width="100%" alt="artisan-image" />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Typography variant='h2'>Turn your idea into a reality and make money in the process.</Typography>
                                    <Typography variant='h5'>Any idea — fully developed or a shower thought— gives you a chance to make money</Typography>
                                    <Typography variant='h5'>Follow a few easy steps to change the world with your idea</Typography>
                                    <Button variant="contained" color="primary" onClick={()=>history.push('/get-started')}>Upload your idea now</Button>
                                    <Grid item container>
                                        <Grid item xs={4}>
                                            <Typography variant='h5' align='center'>Easy upload process</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant='h5' align='center'>Free to submit</Typography>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography variant='h5' align='center'>All ideas welcome</Typography>
                                        </Grid>

                                    </Grid>

                                </Grid>

                            </Grid>

                        </Grid>

                        {/* Bottom section */}
                        <Grid item container style={styles.bottomSectionBackground}>

                            <Grid item xs={false} md={6}>

                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box m={10}>
                                    <Grid item container>
                                        <Grid item xs={6} md={12}>
                                            <Typography variant='h4'>Stay tuned in.</Typography>
                                            <Typography variant='h6'>Sckedio embraces the spirit of innovation, so make sure to keep up to date on our big changes</Typography>
                                        </Grid>

                                        <Grid item xs={6} md={12}>
                                            <TextField id="form-name" label="Name" variant="outlined" />
                                            <TextField id="form-email" label="Email" variant="outlined" />
                                            <Button variant="contained" color="primary">Subscribe</Button>
                                        </Grid>
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

export default Home;