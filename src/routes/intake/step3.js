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

import RadioGroup from '../../components/form/radiogroup';
import RadioButton from '../../components/form/radiobutton';
import CheckboxGroup from '../../components/form/checkboxgroup';
import ConditionalQuestions from '../../components/form/conditional-questions';

import CombineStyles from '../../utils/combine-styles';
import LayoutStyles from '../../styles/layouts';
import ButtonStyles from '../../styles/buttons';
import Questions from './questions';

const IntakeStep3 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentAnswers = useSelector(getAnswers);
    const intakeStepCleared = useSelector(getIntakeStepCleared);
    const [open, setOpen] = useState(false);
    const [continueActive, setContinueActive] = useState(false);
    const [affordRentProblemsPrevValues, setAffordRentProblemsPrevValues] = useState(currentAnswers.affordRentProblems);

    const {
        handleSubmit,
        watch,
        getValues,
        setValue,
        errors,
        control,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            affordRent: currentAnswers.affordRent,
            affordRentProblems: currentAnswers.affordRentProblems,
        },
    });
    const onSubmit = useCallback((values) => {
        dispatch(SaveAnswers(values));
        if (values.affordRent === 'Yes') history.push('/intake/noqualify');
        else if (values.affordRent === 'No' && values.affordRentProblems[0] === '5') history.push('/intake/noqualify');
        else {
            dispatch(UpdateIntakeStep(3));
            history.push('/intake/4');
        }
    }, [dispatch, history]);
    const watchAll = watch();
    const watchAffordRent = watch('affordRent');

    useEffect(() => {
        if (intakeStepCleared < 2) history.push(`/intake/${intakeStepCleared}`);
    }, [intakeStepCleared, history]);

    useEffect(() => {
        const incomingValues = getValues('affordRentProblems');
        // logic to manage 'None' option in list
        if (incomingValues !== affordRentProblemsPrevValues) {
            let newValues = [];
            // infinite loop preventer
            if (
                // if selecting something other than 'none' and 'none' is currently selected, deselect it
                incomingValues.length >= 1
                && includes(incomingValues, '5')
                && includes(affordRentProblemsPrevValues, '5')) {
                // newValues are selections minus "none"
                newValues = remove(incomingValues, choice => choice !== '5');
                setValue('affordRentProblems', newValues);
            } else if (
                // if selecting "none" and others are already selected, deselect them
                incomingValues.length > 1
                && includes(incomingValues, '5')
                && !includes(affordRentProblemsPrevValues, '5')) {
                // newValues = 'none'
                newValues = ['5'];
                setValue('affordRentProblems', newValues);
            } else newValues = incomingValues;
            setAffordRentProblemsPrevValues(newValues);
        }

        if (getValues('affordRent') === 'Yes') setContinueActive(true);
        else if (getValues('affordRent') === 'No' && getValues('affordRentProblems').length > 0) setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues, setValue, affordRentProblemsPrevValues]);

    useEffect(() => {
        if (open) document.getElementById('intake3More').focus();
    }, [open]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Qualification 3 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Can you afford your rent?</Typography>
                            <RadioGroup
                                name="affordRent"
                                label={Questions.step3.affordRent.label}
                                errors={errors}
                                required
                                hiddenLabel
                                control={control}
                            >
                                {Questions.step3.affordRent.options.map(option => (
                                    <RadioButton
                                        key={`${Questions.step3.affordRent.id}-${option}`}
                                        value={option}
                                        label={option}
                                        buttonStyle
                                    />
                                ))}
                            </RadioGroup>

                            <ConditionalQuestions condition={watchAffordRent === 'No'}>
                                <Typography variant="body1" className="mt-3">Check all that apply</Typography>
                                <CheckboxGroup
                                    name="affordRentProblems"
                                    values={getValues('affordRentProblems')}
                                    label={Questions.step3.affordRentProblems.label}
                                    hiddenLabel
                                    options={Questions.step3.affordRentProblems.options}
                                    errors={errors}
                                    control={control}
                                />
                                <button
                                    type="button"
                                    className={`mt-4 ${classes.textLink}`}
                                    onClick={() => setOpen(!open)}
                                    aria-expanded={open}
                                    aria-controls="intake3More"
                                >
                                    <Typography variant="body1">What are “extraordinary medical costs”?</Typography>
                                </button>
                                <div id="intake3More" tabIndex="-1" role="region" className={`${classes.expandableContentRow} ${open ? classes.expandableOpened : classes.expandableClosed}`}>
                                    <Typography variant="body1" className="mt-3">
                                        An “extraordinary” medical expense is any unreimbursed medical expense likely to exceed 7.5% of one’s adjusted gross income for the year.
                                    </Typography>
                                </div>
                            </ConditionalQuestions>
                        </div>
                    </div>
                    <div className="row no-gutters mt-3 mt-sm-5 mb-3">
                        <div className="col d-none d-sm-flex" />
                        <div className="col-12 col-sm-auto text-right mt-3 mt-sm-0 mr-0 mr-sm-3 order-12 order-sm-1">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/intake/2')}
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

IntakeStep3.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(LayoutStyles, ButtonStyles);
export default withStyles(combinedStyles)(IntakeStep3);
