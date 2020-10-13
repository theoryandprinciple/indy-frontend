import React, {
    useState,
    useCallback,
    useEffect,
} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { useForm } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { yupResolver } from '@hookform/resolvers';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import ValidationSchema from './utils/validation-schema';
import TextInput from '../../components/form/textinput';
import Select from '../../components/form/select';

import { SaveAnswers } from '../../actions/form';
import { getAnswers } from '../../selectors/form';
import SendOptions from './wiring/send-options-list';

import LayoutStyles from '../../styles/layouts';

const FormStep1 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentAnswers = useSelector(getAnswers);
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        errors,
        control,
        formState,
    } = useForm({
        mode: 'onChange',
        reValidateMode: 'onChange',
        resolver: yupResolver(ValidationSchema.step2),
        defaultValues: {
            landlordCompany: currentAnswers.landlordCompany,
            landlordFullName: currentAnswers.landlordFullName,
            landlordSendMethod: currentAnswers.landlordSendMethod,
        },
    });
    const onSubmit = useCallback((values) => {
        dispatch(SaveAnswers(values));
        history.push('/form/3');
    }, [dispatch, history]);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);

    useEffect(() => {
        if (formState.isDirty && formState.isValid) setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, getValues]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Step 2 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Enter your information</Typography>
                            <Typography variant="body1" className="mt-1">We need this information to complete a cover letter to your landlord as well as to ensure that you qualify to use this self-help tool.</Typography>
                            <div className="row mt-4">
                                <div className="col">
                                    <TextInput
                                        name="landlordCompany"
                                        label="Company (optional)"
                                        errors={errors}
                                        inputRef={register()}
                                        showError={false}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col">
                                    <TextInput
                                        name="landlordFullName"
                                        label="Full Name"
                                        errors={errors}
                                        required
                                        inputRef={register()}
                                        showError={false}
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md">
                                    <Select
                                        name="landlordSendMethod"
                                        label="How do you want to send the form?"
                                        errors={errors}
                                        required
                                        control={control}
                                        displayEmpty
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select</em>
                                        </MenuItem>
                                        {SendOptions.map(option => (
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

                        </div>
                    </div>
                    <div className="row mt-5 mb-3">
                        <div className="col text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                className="mr-3"
                                onClick={() => history.push('/form/1')}
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

FormStep1.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(FormStep1);
