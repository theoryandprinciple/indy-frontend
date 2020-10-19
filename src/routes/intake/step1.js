import React, {
    useState,
    useCallback,
    useEffect,
} from 'react';
import { includes, remove } from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { SaveAnswers, UpdateIntakeStep } from '../../actions/intake';
import { getAnswers } from '../../selectors/intake';

import CheckboxGroup from '../../components/form/checkboxgroup';
import LayoutStyles from '../../styles/layouts';
import Questions from './questions';

const IntakeStep1 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentAnswers = useSelector(getAnswers);
    const {
        handleSubmit,
        watch,
        getValues,
        errors,
        control,
        setValue,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            income: currentAnswers.income,
        },
    });
    const onSubmit = useCallback((values) => {
        dispatch(SaveAnswers(values));
        if (values.income[0] === '3') history.push('/intake/noqualify');
        else {
            dispatch(UpdateIntakeStep(1));
            history.push('/intake/2');
        }
    }, [dispatch, history]);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);
    const [incomePrevValues, setIncomePrevValues] = useState(currentAnswers.income);


    useEffect(() => {
        const incomingValues = getValues('income');
        // logic to manage 'None' option in list
        if (incomingValues !== incomePrevValues) {
            let newValues = [];
            // infinite loop preventer
            if (
                // if selecting something other than 'none' and 'none' is currently selected, deselect it
                incomingValues.length >= 1
                && includes(incomingValues, '3')
                && includes(incomePrevValues, '3')) {
                // newValues are selections minus "none"
                newValues = remove(incomingValues, choice => choice !== '3');
                setValue('income', newValues);
            } else if (
                // if selecting "none" and others are already selected, deselect them
                incomingValues.length > 1
                && includes(incomingValues, '3')
                && !includes(incomePrevValues, '3')) {
                // newValues = 'none'
                newValues = ['3'];
                setValue('income', newValues);
            } else newValues = incomingValues;
            setIncomePrevValues(newValues);
        }

        if (getValues('income').length > 0) setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues, setValue, incomePrevValues]);

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
                            <Typography variant="body1" className="mt-3">Check all that apply</Typography>
                            <CheckboxGroup
                                name="income"
                                label={Questions.step1.income.label}
                                hiddenLabel
                                options={Questions.step1.income.options}
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
                                onClick={() => history.push('/intake/getstarted')}
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

IntakeStep1.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(IntakeStep1);
