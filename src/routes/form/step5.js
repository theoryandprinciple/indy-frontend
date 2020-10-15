import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import GenderOptions from './wiring/gender-list';
import RaceOptions from './wiring/race-list';
import Select from '../../components/form/select';

import { SaveAnswers, UpdateFormStep, PostForm } from '../../actions/form';
import { getAnswers, getFormStepCleared } from '../../selectors/form';

import CombineStyles from '../../utils/combine-styles';
import LayoutStyles from '../../styles/layouts';
import ButtonStyles from '../../styles/buttons';

const FormStep5 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const currentAnswers = useSelector(getAnswers);
    const formStepCleared = useSelector(getFormStepCleared);
    const {
        handleSubmit,
        errors,
        control,
    } = useForm({
        reValidateMode: 'onChange',
        defaultValues: {
            race: currentAnswers.tenant.race,
            gender: currentAnswers.tenant.gender,
        },
    });
    const onSubmit = useCallback((values) => {
        const saveValues = {
            ...currentAnswers,
            tenant: {
                ...currentAnswers.tenant,
                race: values.race,
                gender: values.gender,
            },
        };
        dispatch(UpdateFormStep(5));
        dispatch(SaveAnswers(saveValues));
        let onSuccess;
        if (saveValues.sendMethod === 'usps') onSuccess = () => history.push('/form/done');
        else onSuccess = () => history.push('/form/download');
        // TODO: we have no requirements for error handling so for now just log the error
        const onError = (error) => { console.error(error); };
        dispatch(PostForm(saveValues, onSuccess, onError));
    }, [dispatch, history, currentAnswers]);

    useEffect(() => {
        if (formStepCleared < 4) history.push(`/form/${formStepCleared}`);
    }, [formStepCleared, history]);

    useEffect(() => {
        if (open) document.getElementById('form5More').focus();
    }, [open]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Step 5 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Race, ethnicity and gender</Typography>
                            <Typography variant="body1" className="mt-1">We rely on your voluntary participation for this data.</Typography>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md">
                            <Select
                                name="race"
                                label="Race and Ethnicity (optional)"
                                errors={errors}
                                control={control}
                                displayEmpty
                            >
                                <MenuItem disabled value="">
                                    <em>Select</em>
                                </MenuItem>
                                {RaceOptions.map(option => (
                                    <MenuItem
                                        key={option.key}
                                        value={option.value}
                                    >
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-md">
                            <Select
                                name="gender"
                                label="Gender (optional)"
                                errors={errors}
                                control={control}
                                displayEmpty
                            >
                                <MenuItem disabled value="">
                                    <em>Select</em>
                                </MenuItem>
                                {GenderOptions.map(option => (
                                    <MenuItem
                                        key={option.key}
                                        value={option.value}
                                    >
                                        {option.value}
                                    </MenuItem>
                                ))}
                            </Select>

                            <button
                                type="button"
                                className={`mt-4 ${classes.textLink}`}
                                onClick={() => setOpen(!open)}
                                aria-expanded={open}
                                aria-controls="form5More"
                            >
                                <Typography variant="body1">Why are we asking this?</Typography>
                            </button>
                            <div id="form5More" tabIndex="-1" role="region" className={`${classes.expandableContentRow} ${open ? classes.expandableOpened : classes.expandableClosed}`}>
                                <Typography variant="body1" className="mt-3">
                                    We ask this information for general program administrative and grant reporting purposes, as well as for civil rights and other compliance reporting. This data will help us to understand whether the COVID-19 pandemic and eviction crisis is disproportionately impacting particular communities of people.
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
                                onClick={() => history.push('/form/4')}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
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

FormStep5.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(LayoutStyles, ButtonStyles);
export default withStyles(combinedStyles)(FormStep5);
