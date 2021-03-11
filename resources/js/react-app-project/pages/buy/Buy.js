import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import NavBar from '../../components/navBar/NavBar';
import DesignCard from '../../components/designCard/DesignCard';
import Typography from '@material-ui/core/Typography';
import fakeProducts from './fakeProducts';
import auth from '../../auth';
import axios from 'axios';

const Buy = (props) => {
    const [productArray, setProductArray] = React.useState([]);

    useEffect(() => {
        const jwToken = auth.getToken();

        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${jwToken}`
            }
        });

        if (props.loggedIn) {

            authAxios.get('/api/designer/auth/list')
                .then(res => {
                    console.log(res);
                    setProductArray(res.data.designs);
                })
                .catch(err => console.log(err));
        } else {
            axios.get('/api/designer/list')
            .then(res=>{
                console.log(res);
                setProductArray(res.data.designs);
            })
            .catch(err=>console.log(err));
        }

    }, []);

    const getDesigns = () => {
        const jwToken = auth.getToken();

        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${jwToken}`
            }
        });

        if (props.loggedIn) {

            authAxios.get('/api/designer/auth/list')
                .then(res => {
                    console.log(res);
                    setProductArray(res.data.designs);
                })
                .catch(err => console.log(err));
        } else {
            axios.get('/api/designer/list')
            .then(res=>{
                console.log(res);
                setProductArray(res.data.designs);
            })
            .catch(err=>console.log(err));
        }
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
                getDesigns();
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} roles={props.roles} currentRoleType={props.currentRoleType} handleRoleType={props.handleRoleType} />
            <Container>
                <Box my={3}>
                    <Typography variant='h2'>Shop</Typography>
                </Box>
                <Grid container spacing={3}>
                    {/* {fakeProducts.map((product, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i} align='center'>
                            <DesignCard
                                product={product}
                            />
                        </Grid>
                    ))} */}
                    {productArray.map((product, i) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={i} align='center'>
                            <DesignCard
                                handleInterest={handleInterest}
                                loggedIn={props.loggedIn}
                                product={product}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default Buy;
