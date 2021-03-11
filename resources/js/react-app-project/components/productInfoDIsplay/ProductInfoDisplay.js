import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
    // accounts: {
    //     marginTop: theme.spacing(2)
    // },
    // backgroundColor: {
    //     backgroundColor: 'blue'
    // },
    // bold: {
    //     fontWeight: 500
    // },
    currentProductThumbnail: {
        maxWidth: 50,
        marginRight: theme.spacing(1),
        cursor: 'pointer',
        border: '1px solid blue'
    },
    infoSection: {
        minHeight: 350,
    },
    productImage: {
        maxWidth: '100%',
        border: '1px solid lightgrey',
        [theme.breakpoints.up('sm')]: {
            marginBottom: theme.spacing(2)
        }
    },
    productThumbnail: {
        maxWidth: 50,
        marginRight: theme.spacing(1),
        cursor: 'pointer',
        border: '1px solid lightgrey'
    },
    root: {
        flexGrow: 1
    }

}));

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

const ProductInfoDisplay = (props) => {
    const classes = useStyles();
    const {
        currentImage,
        setCurrentImage,
        imageArr,
        handleImageClick,
        loggedIn
    } = props;
    // const {
    //     designer,
    //     productTitle,
    //     interest,
    //     image,
    //     itemNum,
    //     category,
    //     description
    // } = props.product;
    const designer = props.product.username;
    const productTitle = props.product.idea_name;
    const interest = props.product.interests;
    const itemNum = props.product.design_id;
    const category = props.product.category_id;
    const description = props.product.description;
    const interestBool = props.product.is_interested;
    const {
        handleInterest
    } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

    const displayInterestButton = () => {
        if (loggedIn) {
            if (interestBool) {
                return (
                    <Typography variant='body1' gutterBottom>
                        You are interested in this product!
                    </Typography>
                );
            } else {
                return (
                    <Button variant='contained' color='primary' onClick={() => handleInterest(itemNum)}>Interested</Button>
                );
            }
        } else {
            return (
                <Typography variant='body1' gutterBottom>
                    Log in to show interest
                </Typography>
            );
        }
    };

    return (
        <div className={classes.root}>
            <div>
                <Box my={3}>
                    <Typography variant='h3'>{convertCategory(category)}</Typography>
                </Box>
                <Grid container spacing={4}>
                    <Grid container item xs={12} md={4} justify='center'>
                        <Grid item xs={12} sm={8} md={12}>
                            <img className={classes.productImage} src={currentImage} />
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} md={5} className={classes.infoSection}>
                        {/* <div className={classes.infoSection}> */}
                        <Grid item xs={12}>
                            <Typography variant='h4' gutterBottom>
                                {productTitle}
                            </Typography>
                            <Typography variant='h6' >
                                {designer}
                            </Typography>
                            <Typography variant='h6' >
                                Interest: {interest}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='h5' gutterBottom>
                                Description
                                    </Typography>
                            <Typography variant='body1'>
                                {description}
                            </Typography>
                            <Divider />
                        </Grid>
                        <Grid item>
                            {imageArr.map((individualImage, i) => (
                                <img className={individualImage.active ? classes.currentProductThumbnail : classes.productThumbnail} src={individualImage.src} key={i} data-key={i} onClick={event => handleImageClick(event.target)} />
                            ))}
                        </Grid>
                        {/* </div> */}
                    </Grid>
                    <Grid container item xs={12} md={3} justify='center'>
                        <Box border={1} width={400} height={200} borderRadius='borderRadius' borderColor='grey.500' p={2}>
                            <Grid container spacing={2}>
                                <Grid item container xs={12} justify='center'>
                                    <Typography variant='h5' gutterBottom>
                                        Buy Now
                                        </Typography>
                                </Grid>
                                <Grid item container xs={12} justify='center'>
                                    {displayInterestButton()}
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </div>
        </div>
    );

};

export default ProductInfoDisplay;