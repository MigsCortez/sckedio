import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import FirstInstruction from '../../images/profile-designer.png';
import SecondInstruction from '../../images/nav-buyer.png';
import ThirdInstruction from '../../images/nav-designer.png';
import oneCircle from '../../images/1circle.png';
import twoCircle from '../../images/2circle.png';
import threeCircle from '../../images/3circle.png';



const useStyles = makeStyles((theme) => ({
}));

const Instructions = () => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <div>

            <Box>
                <List className={classes.root}>
                    <ListItem>

                        <Box>
                            <Box display="flex" flexDirection="row" margin={0} mb={2}>
                                <Box m={0} mb={1} mr={2}>
                                    <img src={oneCircle} width='40' alt="list-number" />
                                </Box>
                                <Typography variant='h6'>If you haven't already, add the Designer role to your profile.</Typography>
                            </Box>
                            <Box mb={2}>
                                <img src={FirstInstruction} width='95%' alt="prntscr" />
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box>
                            <Box display="flex" flexDirection="row" margin={0} mb={2}>
                                <Box m={0} mb={1} mr={2}>
                                    <img src={twoCircle} width='40' alt="list-number" />
                                </Box>
                                <Typography variant='h6'>Find the role box in the navigation bar at the top of the page.</Typography>
                            </Box>
                            <Box mb={2}>
                                <img src={SecondInstruction} width='95%' alt="prntscr" />
                            </Box>
                        </Box>
                    </ListItem>
                    <ListItem>
                        <Box>
                            <Box display="flex" flexDirection="row" margin={0} mb={2}>
                                <Box m={0} mb={1} mr={2}>
                                    <img src={threeCircle} width='40' alt="list-number" />
                                </Box>
                                <Typography variant='h6'>Switch to the Designer role to be able to upload your designs!</Typography>
                            </Box>
                            <Box mb={2}>
                                <img src={ThirdInstruction} width='95%' alt="prntscr" />
                            </Box>
                        </Box>
                    </ListItem>
                </List>
            </Box>



        </div>
    );

};

export default Instructions;
