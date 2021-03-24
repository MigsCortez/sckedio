import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import NavBar from '../../components/navBar/NavBar';
import fakeProducts from '../buy/fakeProducts';
import ProductInfoDisplay from '../../components/productInfoDIsplay/ProductInfoDisplay';
import auth from '../../auth';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
    }
}));

const Product = (props) => {
    const classes = useStyles();
    const { id } = useParams();
    console.log(props)
    const [product, setProduct] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [currentImage, setCurrentImage] = React.useState();
    const [imageArr, setImageArr] = React.useState();

    const catConvert = (design, arr) => {
        let newDesign = design;
        arr.forEach(catIndex => {
            if (design.category_id === catIndex.id) {
                newDesign.category_id = catIndex.category;
            }
        })
        // console.log(newDesign);
        return newDesign;
    };

    useEffect(() => {
        axios.get('/api/categories')
            .then(resOne => {
                const jwToken = auth.getToken();
                const authAxios = axios.create({
                    headers: {
                        Authorization: `Bearer ${jwToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (props.loggedIn) {
                    console.log('role type:' + props.currentRoleType);
                    authAxios.get('/api/designer/auth/show/' + id)
                        .then(res => {
                            console.log(res);
                            const convertedProduct = catConvert(res.data.design, resOne.data);
                            setProduct(convertedProduct);
                            setCurrentImage(res.data.design.images[0]);
                            const newImageArr = res.data.design.images.map((individualImage, i) => {
                                return {
                                    src: individualImage,
                                    active: i === 0
                                }
                            });

                            if (res.data.design.private_images) {
                                // console.log(res.data.design.private_images);
                                res.data.design.private_images.forEach((individualImage) => {
                                    const newArrEntry = {
                                        src: individualImage,
                                        active: false
                                    };
                                    newImageArr.push(newArrEntry);
                                });
                            }

                            setImageArr(newImageArr);

                            setLoading(false);
                        })
                        .catch(err => console.log(err));

                } else {

                    axios.get('/api/designer/show-design/' + id)
                        .then(res => {
                            console.log(res);
                            const convertedProduct = catConvert(res.data.design[0], resOne.data);
                            setProduct(convertedProduct);
                            setCurrentImage(res.data.design[0].images[0]);
                            const newImageArr = res.data.design[0].images.map((individualImage, i) => {
                                return {
                                    src: individualImage,
                                    active: i === 0
                                }
                            });
                            setImageArr(newImageArr);
                            setLoading(false);
                        })
                        .catch(err => console.log(err));
                }

            })
            .catch(err => console.log(err));

    }, [props.currentRoleType]);

    const getDesign = () => {
        axios.get('/api/categories')
            .then(resOne => {
                const jwToken = auth.getToken();
                const authAxios = axios.create({
                    headers: {
                        Authorization: `Bearer ${jwToken}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (props.loggedIn) {
                    authAxios.get('/api/designer/auth/show/' + id)
                        .then(res => {
                            console.log(res);
                            const convertedProduct = catConvert(res.data.design, resOne.data);
                            setProduct(convertedProduct);
                            setCurrentImage(res.data.design.images[0]);
                            const newImageArr = res.data.design.images.map((individualImage, i) => {
                                return {
                                    src: individualImage,
                                    active: i === 0
                                }
                            });

                            if (res.data.design.private_images) {
                                // console.log(res.data.design.private_images);
                                res.data.design.private_images.forEach((individualImage) => {
                                    const newArrEntry = {
                                        src: individualImage,
                                        active: false
                                    };
                                    newImageArr.push(newArrEntry);
                                });
                            }

                            setImageArr(newImageArr);
                            // setLoading(false);
                        })
                        .catch(err => console.log(err));
                } else {
                    axios.get('/api/designer/show-design/' + id)
                        .then(res => {
                            console.log(res);
                            const convertedProduct = catConvert(res.data.design[0], resOne.data);
                            setProduct(convertedProduct);
                            setCurrentImage(res.data.design[0].images[0]);
                            const newImageArr = res.data.design[0].images.map((individualImage, i) => {
                                return {
                                    src: individualImage,
                                    active: i === 0
                                }
                            });
                            setImageArr(newImageArr);
                            // setLoading(false);
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));


    };

    const handleImageClick = (eventTarget) => {
        setCurrentImage(eventTarget.src);
        let allImages = product.images;
        if (product.private_images) {
            allImages = allImages.concat(product.private_images);
        };
        const newImageArr = allImages.map((individualImage, i) => {
            return {
                src: individualImage,
                active: i == eventTarget.dataset.key
            }
        });

        setImageArr(newImageArr);
    };

    const handleInterest = (designId) => {
        console.log('interest: ' + designId);
        const jwToken = auth.getToken();

        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${jwToken}`
            }
        });

        authAxios.post('/api/buyer/create/' + designId)
            .then(res => {
                console.log(res);
                getDesign();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} roles={props.roles} currentRoleType={props.currentRoleType} handleRoleType={props.handleRoleType} />
            {loading ?
                <div className={classes.center}>
                    <CircularProgress />
                </div> :
                <Container>
                    <ProductInfoDisplay
                        currentImage={currentImage}
                        handleImageClick={handleImageClick}
                        handleInterest={handleInterest}
                        imageArr={imageArr}
                        loggedIn={props.loggedIn}
                        product={product}
                        setCurrentImage={setCurrentImage}
                        currentRoleType={props.currentRoleType}
                    />
                </Container>}
        </div>
    );
};

export default Product;