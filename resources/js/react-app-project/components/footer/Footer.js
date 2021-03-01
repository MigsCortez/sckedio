import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography,
    BottomNavigation,
    BottomNavigationAction
} from '@material-ui/core';

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Rowing, ViewColumn } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        gridDirection: Rowing,
        [theme.breakpoints.up('md')]: {
            gridDirection: ViewColumn,
        },
    },
    action: {
        marginTop: theme.spacing(2)
    }
}));
const Footer = () => {

    const classes = useStyles();
    const [value, setValue] = React.useState("recents");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }


    return (
        <footer >
            <BottomNavigation
                value={value}
                onChange={handleChange}
                className={classes.root}
            >
                <BottomNavigationAction
                    className={classes.action}
                    label="Favorites"
                    value="favorites"
                    icon={<FavoriteIcon />}
                />

                <BottomNavigationAction
                    className={classes.action}
                    label="LinkedIn"
                    value="linkedIn"
                    icon={<LinkedInIcon />}
                />
                <BottomNavigationAction
                    className={classes.action}
                    label="Facebook"
                    value="facebook"
                    icon={<FacebookIcon />}
                />
                <BottomNavigationAction
                    className={classes.action}
                    label="Instagram"
                    value="instagram"
                    icon={<InstagramIcon />}
                />
            </BottomNavigation>
            <Typography align="center" color="textSecondary" component="p" variant="subtitle1">Sell your ideas</Typography>
        </footer>
    );
};
export default Footer;
