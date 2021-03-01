import React, { useEffect } from 'react';
import NavBar from '../../components/navBar/NavBar';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import GetStartedForm from '../../components/getStartedForm/GetStartedForm';
import auth from '../../auth';
import axios from 'axios';

const GetStarted = (props) => {
    const [ideaName, setIdeaName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [productCategory, setProductCategory] = React.useState('1');
    const [totalCost, setTotalCost] = React.useState('');
    const [stockType, setStockType] = React.useState('');
    const [ideaType, setIdeaType] = React.useState('1');
    const [publicFiles, setPublicFiles] = React.useState({});
    const [privateFiles, setPrivateFiles] = React.useState({});
    useEffect(() => {
        console.log('public: ' + publicFiles);
        // console.log(Object.keys(publicFiles).length === 0);
        console.log(privateFiles);
    }, [publicFiles, privateFiles]);

    const styles = {
        topSectionBackground: {
            height: 500,
            backgroundImage: `url(${"../../images/pexels-lisa-fotios-1090638.jpg"})`,
            backgroundSize: 'cover',
            backgroundPosition: 'top-center',
            backgroundRepeat: 'no-repeat',
            // width: `calc(100vw + 40px)`,
            // width: "100%",
            // margin: 0,
            padding: 0,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'white'
        }
    }

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('idea_name', ideaName);
        formData.append('category', parseInt(productCategory));
        formData.append('description', description);
        formData.append('design_cost', parseFloat(totalCost));
        // formData.append('idea_type', parseInt(ideaType));
        formData.append('idea_type', ideaType);
        if (Object.keys(publicFiles).length !== 0) {
            publicFiles.forEach(function(publicFile){
                formData.append('public_files[]', publicFile);
            })
            console.log('public');
        } 

        if (Object.keys(privateFiles).length !== 0) {
            privateFiles.forEach(function(privateFile){
                formData.append('private_files[]', privateFile);
            })
            console.log('private');
        } 

        console.log(formData);

        const jwToken = auth.getToken();
        const authAxios = axios.create({
            headers: {
                Authorization: `Bearer ${jwToken}`,
                'Content-Type': 'multipart/form-data' 
            }
        })

        authAxios.post('/api/designer/auth/create', formData)
            .then (res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <div>
            <NavBar loggedIn={props.loggedIn} handleLogout={props.handleLogout} roles={props.roles} />
            <div>

                <Grid container spacing={0} direction="column" >{/*All page content */}

                    {/*Top section */}
                    <Grid item style={styles.topSectionBackground}>
                        <Box m={4} alignItems='center' justifyContent='center'>
                            <Grid item container xs={12} >
                                <Grid item xs={false} md={3}>

                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant='h2'>Share your idea with the world</Typography>
                                    <Typography variant='h5'>Follow the quick steps below to get your idea onto Sckedio.</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                    </Grid>

                    {/* Bottom section */}
                    <Grid item container>

                        <Grid item xs={12} md={4}>
                            <Box margin={5}>
                                <Typography variant='h3'>Get your idea into the world!</Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Box m={10}>
                                <Grid item container>
                                    <GetStartedForm 
                                        ideaName={ideaName}
                                        setIdeaName={setIdeaName}
                                        description={description}
                                        setDescription={setDescription}
                                        productCategory={productCategory}
                                        setProductCategory={setProductCategory}
                                        totalCost={totalCost}
                                        setTotalCost={setTotalCost}
                                        stockType={stockType}
                                        setStockType={setStockType}
                                        ideaType={ideaType}
                                        setIdeaType={setIdeaType}
                                        publicFiles={publicFiles}
                                        setPublicFiles={setPublicFiles}
                                        privateFiles={privateFiles}
                                        setPrivateFiles={setPrivateFiles}
                                        handleSubmit={handleSubmit}
                                    />
                                </Grid>
                            </Box>

                        </Grid>

                    </Grid>

                </Grid>

            </div>
        </div>
    );
};

export default GetStarted;