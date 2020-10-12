import React, {
    useState,
    useCallback,
    useEffect,
    useRef,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers';

import CheckboxGroup from '../../components/form/checkboxgroup';

import ValidationSchema from './utils/validation-schema-intake';
import LayoutStyles from '../../styles/layouts';

const CheckBoxOptions = [
    { id: '1', name: 'I did not report any income to the I.R.S. for 2019' },
    { id: '2', name: 'I did not report any income to the I.R.S. for 2019' },
];

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
        if (getValues('email') !== '') setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues]);
    // END form setup


    return (
        <form className={`container ${classes.containerWrapper}`}>
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
                            <CheckboxGroup
                                name="checkbox-demo"
                                options={CheckBoxOptions}
                                errors={errors}
                                control={control}
                            />
                        </div>
                    </div>
                    <div className="row mt-5 mb-3">
                        <div className="col text-right">
                            <Button variant="outlined" className="mr-3">
                                Previous
                            </Button>
                            <Button variant="contained" color="primary" disabled={!continueActive}>
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(Home);
