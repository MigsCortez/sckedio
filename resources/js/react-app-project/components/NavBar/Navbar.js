import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import AppBar from '@material-ui/core/AppBar';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import auth from '../../auth';
import logo from '../../images/sckedio-logo.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,

    },
    menuButton: {
        marginLeft: theme.spacing(0),
    },
    mobileRoleButton: {
        textTransform: 'none'
    },
    mobileToolbar: {
        [theme.breakpoints.down('xs')]: {
            paddingLeft: theme.spacing(1),
            paddingRight: theme.spacing(1)
        }
    },
    logo: {
        alignItems: 'center',
        flexGrow: 1,
    },
    menu: {
        whiteSpace: 'nowrap',
        justifyContent: "flex-end",
    },
    title: {
        marginLeft: theme.spacing(1),
    }
}));

const NavBar = (props) => {
    const classes = useStyles();
    const { history, location, handleLogout, loggedIn, roles, currentRoleType, handleRoleType } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElAccount, setAnchorElAccount] = React.useState(null);
    const open = Boolean(anchorEl);
    const openAccount = Boolean(anchorElAccount);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true });
    const [currentLocationURL, setCurrentLocationURL] = React.useState(location.pathname);

    const navItems = [
        {
            itemName: 'Home',
            itemPath: '/'
        },
        {
            itemName: 'Sell',
            itemPath: '/sell'
        },
        {
            itemName: 'Buy',
            itemPath: '/buy'
        },
        {
            itemName: 'Build',
            itemPath: '/build'
        },
    ];

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClick = (pageURL) => {
        history.push(pageURL);
        setAnchorEl(null);
    };

    const handleButtonClick = (pageURL) => {
        history.push(pageURL);
    };

    const handleAccountType = (event) => {
        setAnchorElAccount(event.currentTarget);
    };

    const handleAccountClick = (type) => {
        handleRoleType(type);
        setAnchorElAccount(null);
    };

    const capFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Grid container className={classes.root}>
            <AppBar
                position="static"
                color="transparent"
            >
                <Toolbar
                    className={classes.mobileToolbar}
                >
                    <Grid container className={classes.logo} align="center">
                        <Box>
                            <img src={logo} width='60' height='60' />
                        </Box>
                        <Hidden only='xs'>
                            <Typography variant="h5" className={classes.title}>
                                Sckedio
                            </Typography>
                        </Hidden>

                    </Grid>
                    <Grid container className={classes.menu}>
                        {isMobile ? (
                            <div>
                                {loggedIn &&
                                    (<>
                                        <Button
                                            onClick={handleAccountType}
                                            className={classes.mobileRoleButton}
                                        >
                                            <Box
                                                width={130}
                                                display='flex'
                                                border={1}
                                                justifyContent='flex-end'
                                            >
                                                <Typography>{capFirstLetter(currentRoleType)}</Typography>
                                                <ArrowDropDownIcon />
                                            </Box>
                                        </Button>
                                        <Menu
                                            id="account-dropdown"
                                            anchorEl={anchorElAccount}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={openAccount}
                                            onClose={() => setAnchorElAccount(null)}
                                        >
                                            {roles.map((item, i) => (
                                                <MenuItem key={i} onClick={() => handleAccountClick(item)}>
                                                    <Typography>
                                                        {item.charAt(0).toUpperCase() + item.slice(1)}
                                                    </Typography>
                                                </MenuItem>
                                            ))}
                                            <MenuItem
                                                onClick={() => handleLogout()}
                                            >
                                                <Typography
                                                    color='error'
                                                >
                                                    Log Out
                                                    </Typography>
                                            </MenuItem>
                                        </Menu>
                                    </>)
                                }
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={handleMenu}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={() => setAnchorEl(null)}
                                >
                                    {navItems.map((item, i) => (
                                        <MenuItem key={i} onClick={() => handleMenuClick(item.itemPath)}>
                                            <Typography
                                                color={currentLocationURL === item.itemPath ? 'primary' : 'initial'}
                                            >
                                                {item.itemName}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                    {loggedIn ?
                                        (
                                            <div>
                                                <MenuItem onClick={() => handleMenuClick('/profile')}>
                                                    <Typography
                                                        color={currentLocationURL === '/profile' ? 'primary' : 'initial'}
                                                    >
                                                        Profile
                                            </Typography>
                                                </MenuItem>
                                            </div>
                                        ) :
                                        (<MenuItem onClick={() => handleMenuClick('/login')}>
                                            <Typography
                                                color={'initial'}
                                            >
                                                Login
                                            </Typography>
                                        </MenuItem>)
                                    }
                                </Menu>
                            </div>
                        ) :
                            (
                                <Grid item >
                                    {navItems.map((item, i) => (
                                        <Button
                                            key={i}
                                            onClick={() => handleButtonClick(item.itemPath)}
                                        >
                                            <Typography
                                                color={currentLocationURL === item.itemPath ? 'primary' : 'initial'}
                                            >
                                                {item.itemName}
                                            </Typography>
                                        </Button>
                                    ))}
                                    {loggedIn ? (
                                        <>
                                            <Button
                                                onClick={() => handleButtonClick('/profile')}
                                            >
                                                <Typography
                                                    color={currentLocationURL === '/profile' ? 'primary' : 'initial'}
                                                >
                                                    Profile
                                            </Typography>
                                            </Button>

                                            <Button
                                                onClick={handleAccountType}
                                            >
                                                <Box
                                                    width={160}
                                                    display='flex'
                                                    border={1}
                                                    justifyContent='flex-end'
                                                >
                                                    <Typography>{currentRoleType}</Typography>
                                                    <ArrowDropDownIcon />
                                                </Box>
                                            </Button>
                                            <Menu
                                                id="account-dropdown"
                                                anchorEl={anchorElAccount}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                keepMounted
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={openAccount}
                                                onClose={() => setAnchorElAccount(null)}
                                            >
                                                {roles.map((item, i) => (
                                                    <MenuItem key={i} onClick={() => handleAccountClick(item)}>
                                                        <Typography>
                                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                                        </Typography>
                                                    </MenuItem>
                                                ))}
                                                <MenuItem
                                                    onClick={() => handleLogout()}
                                                >
                                                    <Typography
                                                        color='error'
                                                    >
                                                        Log Out
                                                    </Typography>
                                                </MenuItem>
                                            </Menu>
                                        </>
                                    ) :
                                        (
                                            <Button
                                                onClick={() => handleButtonClick('/login')}
                                            >
                                                <Typography
                                                    color={'initial'}
                                                >
                                                    Login
                                            </Typography>
                                            </Button>
                                        )}

                                </Grid>
                            )
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </Grid>
    );
}

export default withRouter(NavBar);
