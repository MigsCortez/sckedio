import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    bigCircle: {
        height: 700,
        width: 350,
        backgroundColor: '#232227',
        borderRadius: '500px 0 0 500px',
        position: 'absolute',
        top: '50%',
        left: '57%',
        transform: 'translate(-50%, -50%)'
    },
    infoContainer: {
        width: '100%',
        height: 1200,
        margin: '0 auto',
        overflow: 'hidden',
        position: 'relative'
    },
    mediumCircle: {
        height: 280,
        width: 280,
        backgroundColor: '#3f51b5',
        borderRadius: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)'
    },
    mediumCircleBottom: {
        top: '97%',
        left: '31%',
    },
    mediumCircleTop: {
        top: '3%',
        left: '31%',
    },
    numCircle: {
        height: 32,
        width: 32,
        borderRadius: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    numCircleOne: {
        top: '31%',
        left: '3%',
        backgroundColor: '#232227',
    },
    numCircleTwo: {
        top: '6%',
        left: '29%',
        backgroundColor: '#232227',
    },
    numCircleThree: {
        top: '5%',
        left: '24%',
        backgroundColor: '#232227',
    },
    numCircleFour: {
        top: '11%',
        left: '81%',
        backgroundColor: '#232227',
    },
    numCircleFive: {
        top: '3%',
        left: '67%',
        backgroundColor: '#3f51b5',
    },
    numCircleSix: {
        top: '-1%',
        left: '47%',
        backgroundColor: '#3f51b5',
    },
    numCircleSeven: {
        top: '3%',
        left: '33%',
        backgroundColor: '#3f51b5',
    },
    numCircleEight: {
        top: '16%',
        left: '12%',
        backgroundColor: '#3f51b5',
    },
    numCircleNine: {
        top: '20%',
        left: '8%',
        backgroundColor: '#232227',
    },
    numCircleTen: {
        top: '13%',
        left: '87%',
        backgroundColor: '#232227',
    },
    numText: {
        color: 'white'
    },
    smallCircle: {
        height: 110,
        width: 110,
        borderRadius: '50%',
        backgroundColor: 'white',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
    },
    smallCircleOne: {
        top: '8%',
        left: '78%',
        border: '#3f51b5 3px solid'
    },
    smallCircleTwo: {
        top: '49%',
        left: '104%',
        border: '#232227 3px solid'
    },
    smallCircleThree: {
        top: '93%',
        left: '81%',
        border: '#232227 3px solid'
    },
    smallCircleFour: {
        top: '98%',
        left: '29%',
        border: '#3f51b5 3px solid'
    },
    smallCircleFive: {
        top: '40%',
        left: '1%',
        border: '#232227 3px solid'
    },
    smallCircleSix: {
        top: '60%',
        left: '1%',
        border: '#232227 3px solid'
    },
    smallCircleSeven: {
        top: '2%',
        left: '29%',
        border: '#3f51b5 3px solid'
    },
    smallCircleEight: {
        top: '7%',
        left: '81%',
        border: '#232227 3px solid'
    },
    smallCircleNine: {
        top: '51%',
        left: '104%',
        border: '#232227 3px solid'
    },
    smallCircleTen: {
        top: '92%',
        left: '78%',
        border: '#3f51b5 3px solid'
    },
    stepText: {
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
    },
    stepTextOne: {
        width: 235,
        top: '50%',
        left: '230%',
    },
    stepTextTwo: {
        width: 233,
        top: '50%',
        left: '-105%',
        color: 'white'
    },
    stepTextThree: {
        width: 235,
        top: '50%',
        left: '230%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        color: 'white',
        padding: '4px 7px',
        borderRadius: 4,
    },
    stepTextFour: {
        width: 235,
        top: '50%',
        left: '-120%',
    },
    stepTextFive: {
        width: 235,
        top: '50%',
        left: '-116%',
    },
    stepTextSix: {
        width: 235,
        top: '50%',
        left: '-116%',
    },
    stepTextSeven: {
        width: 235,
        top: '50%',
        left: '-91%',
    },
    stepTextEight: {
        width: 235,
        top: '50%',
        left: '230%',
        backgroundColor: 'rgba(0,0,0,0.9)',
        color: 'white',
        padding: '4px 7px',
        borderRadius: 4,
    },
    stepTextNine: {
        width: 233,
        top: '50%',
        left: '-94%',
        color: 'white'
    },
    stepTextTen: {
        width: 235,
        top: '50%',
        left: '230%',
    },

}));

const Infographic = () => {
    const classes = useStyles();
    return (
        <div className={classes.infoContainer}>
            <div className={classes.bigCircle}>
                <div className={`${classes.mediumCircleTop} ${classes.mediumCircle}`} >
                    <div className={`${classes.smallCircle} ${classes.smallCircleOne}`}>
                        <Typography className={`${classes.stepText} ${classes.stepTextOne}`}>Anyone comes up with an idea for a new product</Typography>
                        <div className={`${classes.numCircle} ${classes.numCircleOne}`}>
                            <Typography className={classes.numText} variant='h6'>1</Typography>
                        </div>
                    </div>
                    <div className={`${classes.smallCircle} ${classes.smallCircleTwo}`}>
                        <Typography className={`${classes.stepText} ${classes.stepTextTwo}`}>The designer uploads their idea onto the site using our quick, easy, and secure submission portal</Typography>
                        <div className={`${classes.numCircle} ${classes.numCircleTwo}`}>
                            <Typography className={classes.numText} variant='h6'>2</Typography>
                        </div>
                    </div>
                    <div className={`${classes.smallCircle} ${classes.smallCircleThree}`}>
                        <Typography className={`${classes.stepText} ${classes.stepTextThree}`}>People indicate their interest in buying or building the product</Typography>
                        <div className={`${classes.numCircle} ${classes.numCircleThree}`}>
                            <Typography className={classes.numText} variant='h6'>3</Typography>
                        </div>
                    </div>
                    <div className={`${classes.smallCircle} ${classes.smallCircleFour}`}>
                        <Typography className={`${classes.stepText} ${classes.stepTextFour}`}>People who want to make money building products place manufacturing bids on designs</Typography>
                        <div className={`${classes.numCircle} ${classes.numCircleFour}`}>
                            <Typography className={classes.numText} variant='h6'>4</Typography>
                        </div>
                    </div>
                </div>
                <div className={`${classes.smallCircle} ${classes.smallCircleFive}`}>
                    <Typography className={`${classes.stepText} ${classes.stepTextFive}`}>Anyone who wants to buy a product purchases the design and the bid</Typography>
                    <div className={`${classes.numCircle} ${classes.numCircleFive}`}>
                        <Typography className={classes.numText} variant='h6'>5</Typography>
                    </div>
                </div>
                <div className={`${classes.smallCircle} ${classes.smallCircleSix}`}>
                    <Typography className={`${classes.stepText} ${classes.stepTextSix}`}>The designer receives payment</Typography>
                    <div className={`${classes.numCircle} ${classes.numCircleSix}`}>
                        <Typography className={classes.numText} variant='h6'>6</Typography>
                    </div>
                </div>
                <div className={`${classes.mediumCircleBottom} ${classes.mediumCircle}`} >
                    <div className={`${classes.smallCircle} ${classes.smallCircleSeven}`}>
                        <Typography className={`${classes.stepText} ${classes.stepTextSeven}`}>The buyer and builder work together to customize the design</Typography>
                        <div className={`${classes.numCircle} ${classes.numCircleSeven}`}>
                            <Typography className={classes.numText} variant='h6'>7</Typography>
                        </div>
                    </div>
                    <div className={`${classes.smallCircle} ${classes.smallCircleEight}`}>
                        <Typography className={`${classes.stepText} ${classes.stepTextEight}`}>The builder makes the product based on the customized design</Typography>
                        <div className={`${classes.numCircle} ${classes.numCircleEight}`}>
                            <Typography className={classes.numText} variant='h6'>8</Typography>
                        </div>
                    </div>
                    <div className={`${classes.smallCircle} ${classes.smallCircleNine}`}>
                        <Typography className={`${classes.stepText} ${classes.stepTextNine}`}>The buyer receives finished product from the builder</Typography>
                        <div className={`${classes.numCircle} ${classes.numCircleNine}`}>
                            <Typography className={classes.numText} variant='h6'>9</Typography>
                        </div>
                    </div>
                    <div className={`${classes.smallCircle} ${classes.smallCircleTen}`}>
                        <Typography className={`${classes.stepText} ${classes.stepTextTen}`}>The builder receives payment</Typography>
                        <div className={`${classes.numCircle} ${classes.numCircleTen}`}>
                            <Typography className={classes.numText} variant='h6'>10</Typography>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Infographic;