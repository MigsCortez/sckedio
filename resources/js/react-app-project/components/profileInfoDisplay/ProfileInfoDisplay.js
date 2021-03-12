import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    accounts: {
        marginTop: theme.spacing(2)
    },
    backgroundColor: {
        backgroundColor: 'blue'
    },
    bold: {
        fontWeight: 500
    },
    profileImage: {
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(2)
        }
    },
    root: {
        flexGrow: 1
    }

}));

const ProfileInfoDisplay = (props) => {
    const classes = useStyles();
    const { username, firstName, lastName, email, street, city, state, postalCode, country, profilePhoto, roles } = props.userInfo;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const convertRoles = () => {
        let rolesString = '';
        for (let i=0;i<roles.length;i++) {
            const roleCapitalize = roles[i].charAt(0).toUpperCase() + roles[i].slice(1);
            if (i<(roles.length-1)) {
                rolesString=rolesString+roleCapitalize + ', ';
            } else {
                rolesString=rolesString+roleCapitalize;
            }
        }
        return rolesString;
    };


    return (
        <div className={classes.root}>
            {isMobile ? (
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <img className={classes.profileImage} src={profilePhoto} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h4' gutterBottom>
                            {firstName} {lastName}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            variant='h6'
                            color='textSecondary'
                        >
                            ACCOUNT TYPE
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            {convertRoles()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant='h6' color='textSecondary'>
                            INFORMATION
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.bold}>
                            Username:
                        </Typography>
                        <Typography>
                            {username}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.bold}>
                            Email:
                        </Typography>
                        <Typography>
                            {email}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.bold}>
                            Address:
                        </Typography>
                        <Typography>
                            {street}<br />{city==='' ? city : city + ','} {state}<br />{postalCode}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.bold}>
                            Country:
                        </Typography>
                        <Typography>
                            {country}
                        </Typography>
                    </Grid>
                    {/* <Grid container item xs={12}>
                        <Grid item xs={4} sm={3}>
                            <Typography>
                                Username:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} md={9}>
                            <Typography>
                                {username}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4} sm={3}>
                            <Typography>
                                Email:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} md={9}>
                            <Typography>
                                {email}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4} sm={3}>
                            <Typography>
                                Address:
                                    </Typography>
                        </Grid>
                        <Grid item xs={8} md={9}>
                            <Typography>
                                {street}<br />{city}, {state}<br />{postalCode}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12}>
                        <Grid item xs={4} sm={3}>
                            <Typography>
                                Country:
                            </Typography>
                        </Grid>
                        <Grid item xs={8} md={9}>
                            <Typography>
                                {country}
                            </Typography>
                        </Grid>
                    </Grid> */}
                </Grid>
            ) : (
                    <Grid container spacing={4}>
                        <Grid container item xs={4}>
                            <Grid item xs={12}>
                                <img className={classes.profileImage} src={profilePhoto} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h6' color='textSecondary'>ACCOUNT TYPE</Typography>
                                <Divider />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography className={classes.accounts}>{convertRoles()}</Typography>
                            </Grid>
                        </Grid>
                        <Grid container item xs={8} >
                            <Grid item xs={12}>
                                <Typography variant='h4' gutterBottom>
                                    {firstName} {lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant='h6' color='textSecondary'>
                                    INFORMATION
                                </Typography>
                                <Divider />
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} sm={3}>
                                    <Typography>
                                        Username:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <Typography>
                                        {username}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} sm={3}>
                                    <Typography>
                                        Email:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <Typography>
                                        {email}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} sm={3}>
                                    <Typography>
                                        Address:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <Typography>
                                        {street}<br />{city && city + ','} {state}<br />{postalCode}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12}>
                                <Grid item xs={4} sm={3}>
                                    <Typography>
                                        Country:
                                    </Typography>
                                </Grid>
                                <Grid item xs={8} md={9}>
                                    <Typography>
                                        {country}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
        </div>
    );

};

export default ProfileInfoDisplay;