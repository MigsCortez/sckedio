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

const Product = (props)=> {
    const classes = useStyles();
    const { id } = useParams();
    console.log(props)
    const [product,setProduct] = React.useState();
    const [loading, setLoading] = React.useState(true);
    const [currentImage, setCurrentImage] = React.useState();
    const [imageArr, setImageArr] = React.useState();

    useEffect(()=>{
        const jwToken = auth.getToken();
        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${jwToken}`,
                'Content-Type': 'multipart/form-data' 
            }
        }); 

        authAxios.get('/api/designer/auth/show/'+id)
        .then(res=>{
            console.log(res);
            setProduct(res.data.design);
            setCurrentImage(res.data.design.images[0]);
            const newImageArr = res.data.design.images.map((individualImage,i)=>{
                return {
                    src: individualImage,
                    active: i===0
                }
            });
            setImageArr(newImageArr);
            setLoading(false);
        })
        .catch(err=>console.log(err));

        // axios.get('/api/designer/show-design/'+id)
        // .then(res=>{
        //     console.log(res);
        //     setProduct(res.data.design);
        //     setCurrentImage(res.data.design.images[0]);
        //     const newImageArr = res.data.design.images.map((individualImage,i)=>{
        //         return {
        //             src: individualImage,
        //             active: i===0
        //         }
        //     });
        //     setImageArr(newImageArr);
        //     setLoading(false);
        // })
        // .catch(err=>console.log(err));

        // for (let i=0;i<fakeProducts.length;i++) {
        //     if (fakeProducts[i].itemNum==id) {           
        //         setProduct(fakeProducts[i]);
        //         setCurrentImage(fakeProducts[i].image[0]);
        //         const newImageArr = fakeProducts[i].image.map((individualImage,j)=>{
        //             return {
        //                 src: individualImage,
        //                 active: j===0
        //             }
        //         });
        //         setImageArr(newImageArr);
        //         setLoading(false);
        //     }
        // }
    },[]);

    const getDesign = () => {
        const jwToken = auth.getToken();
        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${jwToken}`,
                'Content-Type': 'multipart/form-data' 
            }
        }); 

        authAxios.get('/api/designer/auth/show/'+id)
        .then(res=>{
            console.log(res);
            setProduct(res.data.design);
            setCurrentImage(res.data.design.images[0]);
            const newImageArr = res.data.design.images.map((individualImage,i)=>{
                return {
                    src: individualImage,
                    active: i===0
                }
            });
            setImageArr(newImageArr);
            // setLoading(false);
        })
        .catch(err=>console.log(err));
    };

    const handleImageClick = (eventTarget)=> {
        setCurrentImage(eventTarget.src);
        const newImageArr = product.images.map((individualImage,i)=>{
            return {
                src: individualImage,
                active: i==eventTarget.dataset.key
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
            .then (res => {
                console.log(res);
                getDesign();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} roles={props.roles} />
            {loading ? 
            <div className={classes.center}>
                <CircularProgress /> 
            </div> :
            <Container>
                <ProductInfoDisplay 
                    product={product}
                    currentImage={currentImage}
                    setCurrentImage={setCurrentImage}
                    handleImageClick={handleImageClick}
                    imageArr={imageArr}
                    handleInterest={handleInterest}
                />
            </Container> }
        </div>
    );
};

export default Product;