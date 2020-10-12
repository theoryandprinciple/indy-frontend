import React, {
    useState,
    useCallback,
    useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SaveAnswers } from '../../actions/intake';
import CheckboxGroup from '../../components/form/checkboxgroup';

import LayoutStyles from '../../styles/layouts';

const CheckBoxOptions = [
    { id: '4', name: 'I did not report any income to the I.R.S. for 2019' },
    { id: '5', name: 'I did not report any income to the I.R.S. for 2019' },
];

const IntakeStep2 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        handleSubmit,
        watch,
        getValues,
        errors,
        control,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            checkboxDemo2: [],
        },
    });
    const onSubmit = useCallback((values) => {
        dispatch(SaveAnswers(values));
        history.push('/intake/3');
    }, []);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);

    useEffect(() => {
        console.log(getValues('checkboxDemo2'))
        if (getValues('checkboxDemo2').length > 0) setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues]);
    // END form setup


    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`container ${classes.containerWrapper}`}>
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
                                name="checkboxDemo2"
                                options={CheckBoxOptions}
                                errors={errors}
                                control={control}
                            />
                        </div>
                    </div>
                    <div className="row mt-5 mb-3">
                        <div className="col text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                className="mr-3"
                                onClick={() => history.goBack()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={!continueActive}
                                type="submit"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

IntakeStep2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(IntakeStep2);
