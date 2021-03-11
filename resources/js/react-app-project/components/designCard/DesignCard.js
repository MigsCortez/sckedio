import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";
import jacketImage from "../../../../assets/products/jacket/jacket-1.jpg";
// import jacketImage from "../../../../../storage/app/images/jarrett2/idea_1/public/IMG_7295.jpg";

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

const convertCategory = (number) => {
    if (number === 1) {
        return 'Clothing/Accessories'
    } else if (number === 2) {
        return 'Toys/Games'
    } else if (number == 3) {
        return 'Technology'
    } else if (number === 4) {
        return 'Transport'
    } else if (number === 5) {
        return 'Furniture/Interior Design'
    } else if (number === 6) {
        return 'Art'
    } else if (number === 7) {
        return 'Home Goods'
    } else if (number === 8) {
        return 'Everyday Use'
    } else if (number === 9) {
        return 'Other'
    }
};

const DesignCard = (props) => {
    const classes = useStyles();
    let history = useHistory();
    // const {
    //     designer,
    //     productTitle,
    //     interest,
    //     image,
    //     itemNum,
    //     category
    // } = props.product;
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
                        {convertCategory(category)}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' component='p'>
                        Interest: {interest}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {displayInterestButton()}
                {/* <Typography variant='button' color='textSecondary' component='p'>
                    Interested!
                    </Typography>
                {!interestBool && loggedIn &&
                    <Button size='small' color='primary' onClick={() => handleInterest(itemNum)}>
                        Interested?
                    </Button>
                } */}
                <Button size='small' color='primary' onClick={() => history.push(`/product/${itemNum}`)}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
};

export default DesignCard;