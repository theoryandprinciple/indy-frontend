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
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { includes, remove } from 'lodash';

import { SaveAnswers, UpdateIntakeStep } from '../../actions/intake';
import { getAnswers, getIntakeStepCleared } from '../../selectors/intake';

import CheckboxGroup from '../../components/form/checkboxgroup';
import LayoutStyles from '../../styles/layouts';
import Questions from './questions';

const IntakeStep4 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentAnswers = useSelector(getAnswers);
    const intakeStepCleared = useSelector(getIntakeStepCleared);
    const [continueActive, setContinueActive] = useState(false);
    const [evictionHealthRisksPrevValues, setEvictionHealthRisksPrevValues] = useState(currentAnswers.evictionHealthRisks);
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
            evictionHealthRisks: currentAnswers.evictionHealthRisks,
        },
    });
    const watchAll = watch();
    const onSubmit = useCallback((values) => {
        dispatch(SaveAnswers(values));
        if (values.evictionHealthRisks[0] === '5') history.push('/intake/noqualify');
        else {
            dispatch(UpdateIntakeStep(4));
            history.push('/intake/5');
        }
    }, [dispatch, history]);

    useEffect(() => {
        if (intakeStepCleared < 3) history.push(`/intake/${intakeStepCleared}`);
    }, [intakeStepCleared, history]);

    useEffect(() => {
        const incomingValues = getValues('evictionHealthRisks');
        const noneSelection = '5';
        // logic to manage 'None' option in list
        if (incomingValues !== evictionHealthRisksPrevValues) {
            let newValues = [];
            // infinite loop preventer
            if (
                // if selecting something other than 'none' and 'none' is currently selected, deselect it
                incomingValues.length >= 1
                && includes(incomingValues, noneSelection)
                && includes(evictionHealthRisksPrevValues, noneSelection)) {
                // newValues are selections minus "none"
                newValues = remove(incomingValues, choice => choice !== noneSelection);
                setValue('evictionHealthRisks', newValues);
            } else if (
                // if selecting "none" and others are already selected, deselect them
                incomingValues.length > 1
                && includes(incomingValues, noneSelection)
                && !includes(evictionHealthRisksPrevValues, noneSelection)) {
                // newValues = 'none'
                newValues = [noneSelection];
                setValue('evictionHealthRisks', newValues);
            } else newValues = incomingValues;
            setEvictionHealthRisksPrevValues(newValues);
        }

        if (getValues('evictionHealthRisks').length > 0) setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues, setValue, evictionHealthRisksPrevValues]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Qualification 4 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Would an eviction result in a health risk to you by placing you in unsafe living conditions?</Typography>
                            <Typography variant="body1" className="mt-3">Check all that apply</Typography>
                            <CheckboxGroup
                                name="evictionHealthRisks"
                                label={Questions.step4.evictionHealthRisks.label}
                                hiddenLabel
                                options={Questions.step4.evictionHealthRisks.options}
                                errors={errors}
                                control={control}
                            />
                        </div>
                    </div>
                    <div className="row no-gutters mt-3 mt-sm-5 mb-3">
                        <div className="col d-none d-sm-flex" />
                        <div className="col-12 col-sm-auto text-right mt-3 mt-sm-0 mr-0 mr-sm-3 order-12 order-sm-1">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/intake/3')}
                            >
                                Previous
                            </Button>
                        </div>
                        <div className="col-12 col-sm-auto text-right order-1 order-sm-12">
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

IntakeStep4.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(IntakeStep4);
