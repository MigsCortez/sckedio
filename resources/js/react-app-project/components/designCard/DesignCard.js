import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
    root: {
        maxWidth: 225,
    },
    media: {
        height: 280,
        width: 225,
        borderBottom: '1px solid lightgrey',
        backgroundSize: 'contain'
    }
})

const DesignCard = (props) => {
    const classes = useStyles();
    let history = useHistory();
    
    const designer = props.product.username;
    const productTitle = props.product.idea_name;
    const interest = props.product.interests;
    const itemNum = props.product.design_id;
    const image = props.product.images[0];
    const category = props.product.category_id;
    const interestBool = props.product.is_interested;
    const {
        handleInterest,
        loggedIn
    } = props;

    const displayInterestButton = () => {
        if (loggedIn) {
            if (interestBool) {
                return (
                    <Typography variant='button' color='textSecondary' component='p'>
                        Interested!
                    </Typography>
                );
            } else {
                return (
                    <Button size='small' color='primary' onClick={() => handleInterest(itemNum)}>
                        Interested?
                    </Button>
                );
            }
        }
    };


    return (
        <Card className={classes.root}>
            <CardActionArea onClick={() => history.push(`/product/${itemNum}`)}>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={productTitle}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                        {productTitle}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {designer}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        {category}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        Interest: {interest}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {displayInterestButton()}
                <Button size='small' color='primary' onClick={() => history.push(`/product/${itemNum}`)}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default DesignCard;