import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import ErrorIcon from '@material-ui/icons/Error';
import MaskedInput from 'react-text-mask';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { useForm, Controller } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers';

import ValidationSchema from './utils/validation-schema-intake';

import LayoutStyles from '../../styles/layouts';

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
const Home = ({ classes }) => {
    // form setup
    const errorRef = useRef(null);
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        errors,
        control,
    } = useForm({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        resolver: yupResolver(ValidationSchema.step1),
        defaultValues: {
            dob: '',
            firstName: '',
            lastName: '',
        },
    });
    const onSubmit = useCallback((values) => {
        console.log('submit', values);
    }, []);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);
    const [errorScrolled, setErrorScrolled] = useState(false);

    const executeScroll = (ref) => {
        setTimeout(() => {
            scrollToRef(ref);
            setErrorScrolled(true);
        }, 500);
    };
    useEffect(() => {
        if (Object.keys(errors).length !== 0 && !errorScrolled) executeScroll(errorRef);
    }, [errors, errorScrolled, errorRef]);
    useEffect(() => {
        if (getValues('dob') !== '' && getValues('lastName') !== '' && getValues('firstName') !== '') setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues]);
    // END form setup

    const [state, setState] = useState({
        box1: true,
        box2: false,
    });
    const [radioValue, setRadioValue] = useState('');
    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };
    const { box1, box2 } = state;
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <>
            <div className={`container ${classes.containerWrapper}`}>
                <div className={`row ${classes.sectionWrapper}`}>
                    <div className="col">
                        <div className="row mt-3">
                            <div className="col text-center">
                                <Typography variant="body1" color="primary">Qualification 1 of 5</Typography>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col">
                                <Typography variant="h1" color="primary">Income Qualification</Typography>
                                <Typography variant="body1">Check all that apply</Typography>
                                <FormGroup>
                                    <FormControlLabel
                                        data-checked={box1}
                                        control={(
                                            <Checkbox
                                                checked={box1}
                                                onChange={handleChange}
                                                name="box1"
                                                color="primary"
                                            />
                                        )}
                                        label="I did not report any income to the I.R.S. for 2019"
                                    />
                                    <FormControlLabel
                                        data-checked={box2}
                                        control={(
                                            <Checkbox
                                                checked={box2}
                                                onChange={handleChange}
                                                name="box2"
                                                color="primary"
                                            />
                                        )}
                                        label="I did not report any income to the I.R.S. for 2019"
                                    />
                                </FormGroup>
                                <RadioGroup aria-label="quiz" name="quiz" value={radioValue} onChange={handleRadioChange}>
                                    <FormControlLabel data-checked={radioValue === 'best'} value="best" control={<Radio color="primary" />} label="The best!" />
                                    <FormControlLabel data-checked={radioValue === 'worst'} value="worst" control={<Radio color="primary" />} label="The worst." />
                                </RadioGroup>
                            </div>
                        </div>
                        <div className="row mt-5 mb-3">
                            <div className="col text-right">
                                <Button variant="outlinedPrimary" className="mr-3">
                                    Previous
                                </Button>
                                <Button variant="contained" color="primary">
                                    Next
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container ${classes.containerWrapper}`}>
                <div className={`row ${classes.sectionWrapper}`}>
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <Typography variant="h1" color="primary">Title</Typography>
                            </div>
                        </div>
                        <div className="row d-none d-lg-block">
                            <div className="col">
                                <div className={classes.descriptionWrapper}>
                                    <Typography variant="body1">Description</Typography>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                            <div className="row">
                                <div className={`col-md ${classes.inputWrapper}`}>
                                    <Typography variant="body1" id="firstName" className={classes.inputLabel}>First Name</Typography>
                                    <InputBase
                                        autoFocus
                                        variant="outlined"
                                        inputRef={register}
                                        name="firstName"
                                        error={errors.firstName !== undefined}
                                        inputProps={{
                                            'aria-labelledby': 'firstName',
                                            'aria-invalid': errors.firstName ? 'true' : 'false',
                                            'aria-describedby': errors.firstName && 'firstName-error',
                                        }}
                                    />
                                    <div className={classes.errorMessage} role="alert" aria-live="polite" id="firstName-error">
                                        {errors.firstName && errors.firstName}
                                    </div>
                                </div>
                                <div className={`col-md ${classes.inputWrapper}`}>
                                    <Typography variant="body1" id="lastName" className={classes.inputLabel}>Last Name</Typography>
                                    <InputBase
                                        variant="outlined"
                                        inputRef={register}
                                        name="lastName"
                                        error={errors.lastName !== undefined}
                                        inputProps={{
                                            'aria-labelledby': 'lastName',
                                            'aria-invalid': errors.lastName ? 'true' : 'false',
                                            'aria-describedby': errors.lastName && 'lastName-error',
                                        }}
                                    />
                                    <div className={classes.errorMessage} role="alert" aria-live="polite" id="lastName-error">
                                        {errors.lastName && errors.lastName}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className={`col ${classes.inputWrapper}`}>
                                    <Typography variant="body1" id="dob" className={classes.inputLabel}>Date of Birth</Typography>
                                    <Controller
                                        as={MaskedInput}
                                        control={control}
                                        name="dob"
                                        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
                                        placeholder="MM/DD/YYYY"
                                        className={`${classes.textInputRoot} ${classes.maskedInput} ${errors.dob && classes.textInputError}`}
                                        style={{ width: 206 }}
                                        guide={false}
                                        showMask
                                        keepCharPositions
                                        aria-labelledby="dob"
                                        aria-invalid={errors.dob ? 'true' : 'false'}
                                        aria-describedby={errors.dob && 'dob-error'}
                                    />

                                    <div className={classes.errorMessage} role="alert" aria-live="polite" id="dob-error">
                                        {errors.dob && errors.dob}
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col text-right">
                                    <Button
                                        aria-disabled={!continueActive}
                                        disableRipple={!continueActive}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>
                            <div ref={errorRef} className="row" style={{ display: Object.keys(errors).length !== 0 ? 'block' : 'none' }}>
                                <div className="col">
                                    <div className={classes.genericErrorMessageWrapper} role="alert" aria-live="polite">
                                        <ErrorIcon className={classes.genericErrorIcon} />
                                        Please fix the errors above
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(Home);
