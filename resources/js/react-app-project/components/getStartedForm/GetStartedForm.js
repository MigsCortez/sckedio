import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { DropzoneArea } from 'material-ui-dropzone';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50ch'
        }
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));



function getSteps() {
    return ['Describe', 'Share', 'Cost'];
}

function getStepContent(step, props) {
    const {
        ideaName,
        setIdeaName,
        description,
        setDescription,
        productCategory,
        setProductCategory,
        totalCost,
        setTotalCost,
        stockType,
        setStockType,
        ideaType,
        setIdeaType,
        publicFiles,
        setPublicFiles,
        privateFiles,
        setPrivateFiles
    } = props;

    // const [categoryValue, setCategory] = React.useState('clothing-accessories');

    // const handleCategoryChange = (event) => {
    //     setCategory(event.target.value);
    // };

    // const [includedValue, setIncluded] = React.useState('idea');

    // const handleIncludedChange = (event) => {
    //     setIncluded(event.target.value);
    // };

    // const [ideaLimitValue, setIdeaLimit] = React.useState('unlimited');

    // const handleIdeaLimitChange = (event) => {
    //     setIdeaLimit(event.target.value);
    // };

    switch (step) {

        case 0: {/* Idea section*/ }

            return (
                <div>
                    <Grid container>
                        <form className={useStyles.root} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    required
                                    id="form-idea-name"
                                    label="Name of Idea"
                                    helperText="ex.: Electric Tricycle"
                                    variant="outlined"
                                    value={ideaName}
                                    onChange={event => setIdeaName(event.target.value)}
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Describe what the finished product is/does"
                                    multiline
                                    rows={4}
                                    helperText="ex.: This is a fast-charging electric tricycle available in custom skins. It can reach speeds of 30 mph and run continuously for 4 hours on a single charge..."
                                    variant="outlined"
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                />
                            </div>
                            <div>
                                <FormControl component="fieldset" >
                                    <FormLabel component="legend">Category</FormLabel>
                                    <RadioGroup 
                                    aria-label="category" 
                                    name="category1" 
                                    value={productCategory} 
                                    onChange={event => setProductCategory(event.target.value)}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Clothing/Accessories" />
                                        {/* <FormControlLabel value="Fashion" control={<Radio />} label="Fashion" /> */}
                                        <FormControlLabel value="2" control={<Radio />} label="Toys/Games" />
                                        <FormControlLabel value="3" control={<Radio />} label="Technology" />
                                        <FormControlLabel value="4" control={<Radio />} label="Transport" />
                                        <FormControlLabel value="5" control={<Radio />} label="Furniture/Interior Design" />
                                        <FormControlLabel value="6" control={<Radio />} label="Art" />
                                        <FormControlLabel value="7" control={<Radio />} label="Home Goods" />
                                        <FormControlLabel value="8" control={<Radio />} label="Everyday Use" />
                                        <FormControlLabel value="9" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </form>
                    </Grid>
                </div>
            )


        case 1: {/* Share section*/ }
            return (
                <div>
                    <Grid container>
                        <form className={useStyles.root} noValidate autoComplete="off">
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">What is included in your upload?</FormLabel>
                                    <RadioGroup 
                                        aria-label="included" 
                                        name="included1" 
                                        value={ideaType} 
                                        onChange={event => setIdeaType(event.target.value)}
                                    >
                                        <FormControlLabel value="1" control={<Radio />} label="Just an idea" />
                                        <FormControlLabel value="2" control={<Radio />} label="A few sketches" />
                                        <FormControlLabel value="3" control={<Radio />} label="Some detailed drawings" />
                                        <FormControlLabel value="4" control={<Radio />} label="Factory-ready design" />
                                        <FormControlLabel value="5" control={<Radio />} label="I'll make my idea myself" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <br />
                            <div>
                                <Box display='flex'>
                                    <Box border={1}>
                                        <Box>
                                            <Typography border={5}>Upload any publicly available files</Typography>
                                        </Box>
                                        {/* <input 
                                            type='file'
                                            id='public-files'
                                            name='public-files'
                                            onChange={event=> {
                                                setPublicFiles(event.target.files);
                                            }}
                                        /> */}

                                        <DropzoneArea
                                            // dropzoneText={'Upload any publicly available files'}
                                            // onChange={(files) => console.log('Files:', files)}
                                            onChange={files => setPublicFiles(files)}
                                        />
                                    </Box>
                                </Box>
                            </div>
                            <br />
                            <div>
                                <Box display='flex'>
                                    <Box border={1}>
                                        <Box>
                                            <Typography border={5}>Upload any private files</Typography>
                                        </Box>
                                        <DropzoneArea
                                            // dropzoneText={'Upload any private files'}
                                            // onChange={(files) => console.log('Files:', files)}
                                            onChange={files => setPrivateFiles(files)}
                                        />
                                    </Box>
                                </Box>
                            </div>
                            <br />
                        </form>
                    </Grid>
                </div>
            )

        case 2: {/*Idea cost step */ }
            return (
                <div>
                    <Grid container>
                        <form className={useStyles.root} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    required
                                    id="form-idea-cost"
                                    label="How much does your idea cost?"
                                    helperText="ex.: $50,000"
                                    variant="outlined"
                                    type="number"
                                    value={totalCost}
                                    onChange={event => setTotalCost(event.target.value)}
                                />
                            </div>
                            {/* <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">How many times can your idea be bought?</FormLabel>
                                <RadioGroup aria-label="idea-limit" name="idea-limit1" value={ideaLimitValue} onChange={handleIdeaLimitChange}>
                                    <FormControlLabel value="unlimited" control={<Radio />} label="Unlimited" />
                                    <FormControlLabel value="limited" control={<Radio />} label="A limited number" />
                                </RadioGroup>
                            </FormControl>
                        </div> */}
                        </form>
                    </Grid>
                </div>
            )
        default:
            return 'Unknown step';
    }
}

const GetStartedForm = (props) => {
    const { handleSubmit } = props;
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        console.log('active step: ' + activeStep);
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        if (activeStep===steps.length-1) {
            handleSubmit();
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        // labelProps.optional = <Typography variant="caption">Optional</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            All steps completed - you&apos;re finished
                        </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Reset
                        </Button>
                    </div>
                ) : (
                        <div>
                            {/* <Typography className={classes.instructions}> */}
                            {getStepContent(activeStep, props)}
                            {/* </Typography> */}
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Back
                                </Button>
                                {isStepOptional(activeStep) && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSkip}
                                        className={classes.button}
                                    >
                                        Skip
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
};

export default GetStartedForm;