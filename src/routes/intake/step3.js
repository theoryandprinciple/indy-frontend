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

import { SaveAnswers } from '../../actions/intake';
import { getAnswers } from '../../selectors/intake';

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
    const [open, setOpen] = useState(false);
    const currentAnswers = useSelector(getAnswers);
    const {
        handleSubmit,
        watch,
        getValues,
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
        else history.push('/intake/4');
    }, [dispatch, history]);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);

    useEffect(() => {
        if (getValues('affordRent') === 'Yes') setContinueActive(true);
        if (getValues('affordRent') === 'No' && getValues('affordRentProblems').length > 0) setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues]);

    const watchAffordRent = watch('affordRent');

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
                                >
                                    <Typography variant="body1">What are “extraordinary medical costs”?</Typography>
                                </button>
                                <div className={`${classes.expandableContentRow} ${open ? classes.expandableOpened : classes.expandableClosed}`}>
                                    <Typography variant="body1" className="mt-3">
                                        Stuff
                                    </Typography>
                                </div>
                            </ConditionalQuestions>
                        </div>
                    </div>
                    <div className="row mt-5 mb-3">
                        <div className="col text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                className="mr-3"
                                onClick={() => history.push('/intake/2')}
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

IntakeStep3.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(LayoutStyles, ButtonStyles);
export default withStyles(combinedStyles)(IntakeStep3);
