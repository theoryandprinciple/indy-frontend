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

import { SaveAnswers, UpdateIntakeStep } from '../../actions/intake';
import { getAnswers, getIntakeStepCleared } from '../../selectors/intake';

import RadioGroup from '../../components/form/radiogroup';
import RadioButton from '../../components/form/radiobutton';
import CombineStyles from '../../utils/combine-styles';
import LayoutStyles from '../../styles/layouts';
import Questions from './questions';

const IntakeStep5 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentAnswers = useSelector(getAnswers);
    const intakeStepCleared = useSelector(getIntakeStepCleared);
    const {
        handleSubmit,
        watch,
        getValues,
        errors,
        control,
    } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            tryingToPay: currentAnswers.tryingToPay,
        },
    });
    const onSubmit = useCallback((values) => {
        dispatch(SaveAnswers(values));
        if (values.tryingToPay === 'No') history.push('/intake/noqualify');
        else {
            dispatch(UpdateIntakeStep(5));
            history.push('/intake/qualify');
        }
    }, [dispatch, history]);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);

    useEffect(() => {
        if (intakeStepCleared < 4) history.push(`/intake/${intakeStepCleared}`);
    }, [intakeStepCleared, history]);

    useEffect(() => {
        if (getValues('tryingToPay') !== '') setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Qualification 5 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">I am doing my best to pay as much rent as I can, given my circumstances</Typography>
                            <RadioGroup
                                name="tryingToPay"
                                label={Questions.step5.tryingToPay.label}
                                errors={errors}
                                required
                                hiddenLabel
                                control={control}
                            >
                                {Questions.step5.tryingToPay.options.map(option => (
                                    <RadioButton
                                        key={`${Questions.step5.tryingToPay.id}-${option}`}
                                        value={option}
                                        label={option}
                                        buttonStyle
                                    />
                                ))}
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="row no-gutters mt-3 mt-sm-5 mb-3">
                        <div className="col d-none d-sm-flex" />
                        <div className="col-12 col-sm-auto text-right mt-3 mt-sm-0 mr-0 mr-sm-3 order-12 order-sm-1">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/intake/4')}
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

IntakeStep5.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(LayoutStyles);
export default withStyles(combinedStyles)(IntakeStep5);
