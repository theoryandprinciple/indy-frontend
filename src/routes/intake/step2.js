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
import CombineStyles from '../../utils/combine-styles';
import LayoutStyles from '../../styles/layouts';
import ButtonStyles from '../../styles/buttons';
import Questions from './questions';

const IntakeStep2 = ({ classes }) => {
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
            governmentAsst: currentAnswers.governmentAsst,
        },
    });
    const onSubmit = useCallback((values) => {
        dispatch(SaveAnswers(values));
        if (values.governmentAsst === 'No') history.push('/intake/noqualify');
        else history.push('/intake/3');
    }, [dispatch, history]);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);

    useEffect(() => {
        if (getValues('governmentAsst') !== '') setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues]);

    useEffect(() => {
        if (open) document.getElementById('intake2More').focus();
    }, [open]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Qualification 2 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Did you do your best to get government help to pay the rent?</Typography>
                            <Typography variant="body1">If you do not qualify for any help from the government, or if applications were closed, your application was waitlisted, or assistance programs were no longer available or if you applied and you were denied, answer ‘Yes.’</Typography>
                            <RadioGroup
                                name="governmentAsst"
                                label={Questions.step2.governmentAsst.label}
                                errors={errors}
                                required
                                control={control}
                            >
                                {Questions.step2.governmentAsst.options.map(option => (
                                    <RadioButton
                                        key={`${Questions.step2.governmentAsst.id}-${option}`}
                                        value={option}
                                        label={option}
                                        buttonStyle
                                    />
                                ))}
                            </RadioGroup>

                            <button
                                type="button"
                                className={`mt-4 ${classes.textLink}`}
                                onClick={() => setOpen(!open)}
                                aria-expanded={open}
                                aria-controls="intake2More"
                            >
                                <Typography variant="body1">What are &quot;best efforts&quot; and &quot;government help&quot;?</Typography>
                            </button>
                            <div id="intake2More" tabIndex="-1" role="region" className={`${classes.expandableContentRow} ${open ? classes.expandableOpened : classes.expandableClosed}`}>
                                <Typography variant="body1" className="mt-3">
                                    &quot;Best efforts,&quot; while not defined by the Order, means that you should attempt to apply for assistance at indyrent.org if a resident of Marion County or https://www.indianahousingnow.org/ if you live anywhere else in Indiana. You should document whether your application was successful.
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    &quot;Government help&quot; means any governmental rental or housing payment benefits available to the individual or any household member.
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 mb-3">
                        <div className="col text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                className="mr-3"
                                onClick={() => history.push('/intake/1')}
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

const combinedStyles = CombineStyles(LayoutStyles, ButtonStyles);
export default withStyles(combinedStyles)(IntakeStep2);
