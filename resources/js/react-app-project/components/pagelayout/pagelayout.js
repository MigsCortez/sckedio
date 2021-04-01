import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FeedbackForm from '../feedbackform/feedbackform';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import { useHistory } from "react-router-dom";


const PageLayout = ({ pageData }) => {
    let history = useHistory();
    const theme = useTheme();
    const useStyles = makeStyles((theme) => ({
        title: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                fontSize: 34,
            },
        },
        subtitle: {
            backgroundColor: 'rgba(247,247,242, 0.40)',
            padding: theme.spacing(1),
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                fontSize: 18,
            },
        },
        sectionTitle: {
            marginRight: theme.spacing(3),
            marginLeft: theme.spacing(3),
            color: '#f7f7f2',

            [theme.breakpoints.down('xs')]: {
                marginRight: theme.spacing(1),
                marginLeft: theme.spacing(1),
            },
        },
        sectionSubtitle: {
            marginRight: theme.spacing(3),
            marginLeft: theme.spacing(3),
            color: '#f7f7f2',
            [theme.breakpoints.down('md')]: {
                fontSize: 18,
            },
            [theme.breakpoints.down('sm')]: {
                fontSize: 16,
                marginRight: theme.spacing(1),
                marginLeft: theme.spacing(1),
            },
        },
        sectionText: {
            marginTop: theme.spacing(0),
            padding: theme.spacing(4),
        },

        middleSection: {
            [theme.breakpoints.down('xs')]: {
                spacing: 3,
            },
            backgroundColor: '#232227',
        },

        uploadButton: {
            marginTop: theme.spacing(2)
        },
        topSectionBackground: {
            height: 600,
            backgroundImage: `url(${pageData.header.image})`,
            backgroundSize: 'cover',
            // backgroundPosition: 'top-center',
            backgroundRepeat: 'no-repeat',
            width: `calc(100vw + 40px)`,
            // width: "100%",
            // margin: 0,
            padding: 70,
            paddingBottom: 0,
        },
    }))


    const classes = useStyles();


    return (
        <Grid container spacing={0} direction='row' justify='center' >{/*All page content */}

            {/*Top section */}
            <Grid item className={classes.topSectionBackground} xs={12}>{/*Photo background and container of top panel of marketplace text+smaller image*/}
                <Grid container direction='row' justify='center'>{/*Container of "The marketplace..." text and image on right */}
                    <Grid item xs={12} md={6}>{/*The marketplace for ideas...+Sckedio connects... */}
                        <Typography variant='h2' align='center' className={classes.title}>{pageData.header.title}</Typography>
                        <Typography variant='h5' align='center' className={classes.subtitle}>{pageData.header.subtitle}</Typography>
                        <Box align="center">
                            <Button variant="contained" onClick={() => history.push(pageData.header.url)}>{pageData.header.button}</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            {/*Middle section*/}
            <Grid container item justify='center' className={classes.middleSection}>
                {pageData.main.map((section, i) => (
                    <Grid item key={i} xs={12} md={6}>
                        { section.image ?
                            <Hidden only={['sm', 'xs']}>
                                <Grid container item >{/* Image of artisan drawing on whiteboard*/}
                                    <Grid item xs={12} >
                                        <img src={section.image} id="artisan-image" width="100%" alt="artisan-image" />
                                    </Grid>
                                </Grid>
                            </Hidden>
                            :
                            <Grid container item  >{/* Image of artisan drawing on whiteboard*/}
                                <Grid item container md={12} className={classes.sectionText}>
                                    <Typography variant='h4' gutterBottom className={classes.sectionTitle}>{section.title}</Typography>
                                    <Typography variant='h6' className={classes.sectionSubtitle}>{section.subtitle}</Typography>
                                    {section.buttons &&
                                    <Grid item container md={12}>
                                        <Grid item xs={12} sm={6}>
                                            <Box align="center">
                                                <Button variant="contained" className={classes.uploadButton} onClick={() => history.push('/get-started')}>Upload Design</Button>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box align="center">
                                                <Button variant="contained" className={classes.uploadButton} onClick={() => history.push('/login')}>Login</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                    }
                                </Grid>
                            </Grid>
                        }
                    </Grid>
                ))}
            </Grid>
            <FeedbackForm mt={20} />
        </Grid>
    );
};

export default PageLayout;
