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

import CheckboxGroup from '../../components/form/checkboxgroup';
import LayoutStyles from '../../styles/layouts';
import Questions from './questions';

const IntakeStep4 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
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
            evictionHealthRisks: currentAnswers.evictionHealthRisks,
        },
    });
    const onSubmit = useCallback((values) => {
        dispatch(SaveAnswers(values));
        if (values.evictionHealthRisks === '5') history.push('/intake/noqualify');
        else history.push('/intake/5');
    }, [dispatch, history]);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);

    useEffect(() => {
        if (getValues('evictionHealthRisks').length > 0) setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues]);

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
                    <div className="row mt-5 mb-3">
                        <div className="col text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                className="mr-3"
                                onClick={() => history.push('/intake/3')}
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

IntakeStep4.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(IntakeStep4);
