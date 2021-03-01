import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import auth from '../../auth';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = (props) => {
    const classes = useStyles();
    const { history, location, handleLogout, loggedIn, roles } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {noSsr:true});
    const [currentLocationURL, setCurrentLocationURL] = React.useState(location.pathname);
    const [currentAccountType, setCurrentAccountType] = React.useState('Buyer');
    // const roles = ['Buyer', 'Designer', 'Manufacturer'];
    // const loggedIn = props.loggedIn;

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
        {
            itemName: 'About',
            itemPath: '/about'
        }
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

    return (
        <div className={classes.root}>
            <AppBar
                // position="fixed"
                // color="#ffffff"
                position="static"
                color="transparent"
            >
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Sckedio
                    </Typography>
                    <div>
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
                                                <Typography>{currentAccountType}</Typography>
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
                                        <MenuItem onClick={() => handleLogout()}>
                                            <Typography
                                                color='error'
                                            >
                                                Log Out
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
                                <div>
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
                                            onClick={() => handleLogout()}
                                        >
                                            <Typography
                                                color='error'
                                            >
<<<<<<< HEAD
                                                Log Out
                                            </Typography>
                                        </Button>
=======
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
>>>>>>> a2d8a44789525341a6dc6ff52def7723a2fd79a1
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
                                </div>
                            )
                        }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default withRouter(NavBar);