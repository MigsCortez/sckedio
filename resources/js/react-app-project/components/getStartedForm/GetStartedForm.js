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

function getStepContent(step) {

    const [categoryValue, setCategory] = React.useState('fashion');

    const handleCategoryChange = (event) => {
        setCategory(event.target.value);
    };

    const [includedValue, setIncluded] = React.useState('idea');

    const handleIncludedChange = (event) => {
        setIncluded(event.target.value);
    };

    const [ideaLimitValue, setIdeaLimit] = React.useState('unlimited');

    const handleIdeaLimitChange = (event) => {
        setIdeaLimit(event.target.value);
    };

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
                                    defaultValue=""
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Describe what the finished product is/does"
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    variant="outlined"
                                />
                            </div>
                            <div>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">Category</FormLabel>
                                    <RadioGroup aria-label="category" name="category1" value={categoryValue} onChange={handleCategoryChange}>
                                        <FormControlLabel value="fashion" control={<Radio />} label="Fashion" />
                                        <FormControlLabel value="art" control={<Radio />} label="Art" />
                                        <FormControlLabel value="technology" control={<Radio />} label="Technology" />
                                        <FormControlLabel value="toy" control={<Radio />} label="Toy" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
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
                                    <RadioGroup aria-label="included" name="included1" value={includedValue} onChange={handleIncludedChange}>
                                        <FormControlLabel value="idea" control={<Radio />} label="Just an idea" />
                                        <FormControlLabel value="sketches" control={<Radio />} label="A few sketches" />
                                        <FormControlLabel value="drawings" control={<Radio />} label="Some detailed drawings" />
                                        <FormControlLabel value="design" control={<Radio />} label="Factory-ready design" />
                                        <FormControlLabel value="make" control={<Radio />} label="I'll make my idea myself" />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                            <br />
                            <div>
                                <Box display='flex'>
                                    <Box border={1}>
                                        <Box>
                                            <Typography variant='h7' border={5}>Upload any publicly available files</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant='h7' border={5}>(File upload not yet implemented)</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant='h7' border={5}>Add any images, sketches, or files to give people an idea of what your product is and to get them excited!</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                            <br />
                            <div>
                                <Box display='flex'>
                                    <Box border={1}>
                                        <Box>
                                            <Typography variant='h7' border={5}>Upload any private files</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant='h7' border={5}>(File upload not yet implemented)</Typography>
                                        </Box>
                                        <Box>
                                            <Typography variant='h7' border={5}>(Here's where you upload anything that people need to pay to see, whether it's more detailed sketches or a blueprint. Don't worry if you don't have anything to upload here.)</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </div>
                            <br />
                        </form>
                    </Grid>
                </div>
            )

        case 2:{/*Idea cost step */}
        return (
            <div>
                <Grid container>
                    <form className={useStyles.root} noValidate autoComplete="off">
                        <div>
                            <TextField
                                required
                                id="form-idea-cost"
                                label="How much does your idea cost?"
                                defaultValue=""
                                variant="outlined"
                            />
                        </div>
                        <div>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">How many times can your idea be bought?</FormLabel>
                                <RadioGroup aria-label="idea-limit" name="idea-limit1" value={ideaLimitValue} onChange={handleIdeaLimitChange}>
                                    <FormControlLabel value="unlimited" control={<Radio />} label="Unlimited" />
                                    <FormControlLabel value="limited" control={<Radio />} label="A limited number" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </form>
                </Grid>
            </div>
        )
        default:
            return 'Unknown step';
    }
}

const GetStartedForm = (props) => {
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
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
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
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
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