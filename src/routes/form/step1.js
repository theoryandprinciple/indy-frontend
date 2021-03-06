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

import { SaveAnswers, UpdateFormStep } from '../../actions/form';
import { getAnswers } from '../../selectors/form';
import StateOptions from './wiring/state-list';

import LayoutStyles from '../../styles/layouts';

const FormStep1 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const currentAnswers = useSelector(getAnswers);
    const {
        register,
        handleSubmit,
        watch,
        errors,
        control,
        formState,
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        resolver: yupResolver(ValidationSchema.step1),
        defaultValues: {
            firstName: currentAnswers.tenant.firstName,
            lastName: currentAnswers.tenant.lastName,
            address: currentAnswers.tenant.address,
            address2: currentAnswers.tenant.address2,
            city: currentAnswers.tenant.city,
            state: currentAnswers.tenant.state,
            zip: currentAnswers.tenant.zip,
        },
    });
    const onSubmit = useCallback((values) => {
        dispatch(UpdateFormStep(1));
        dispatch(SaveAnswers({ tenant: { ...currentAnswers.tenant, ...values } }));
        history.push('/form/2');
    }, [dispatch, history, currentAnswers]);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);

    useEffect(() => {
        if (formState.isValid) setContinueActive(true);
        else setContinueActive(false);
    }, [watchAll, formState.isValid]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Step 1 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Enter your information</Typography>
                            <Typography variant="body1" className="mt-1">We need this information to complete a cover letter to your landlord as well as to ensure that you qualify to use this self-help tool.</Typography>
                            <div className="row mt-4">
                                <div className="col-md">
                                    <TextInput
                                        name="firstName"
                                        label="First Name"
                                        errors={errors}
                                        required
                                        inputRef={register()}
                                        showError={false}
                                    />
                                </div>
                                <div className="col-md mt-3 mt-md-0">
                                    <TextInput
                                        name="lastName"
                                        label="Last Name"
                                        errors={errors}
                                        required
                                        inputRef={register()}
                                        showError={false}
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md-8">
                                    <TextInput
                                        name="address"
                                        label="Current Address"
                                        errors={errors}
                                        required
                                        inputRef={register()}
                                        showError={false}
                                    />
                                </div>
                                <div className="col-md-4 mt-3 mt-md-0">
                                    <TextInput
                                        name="address2"
                                        label="Unit (optional)"
                                        errors={errors}
                                        inputRef={register()}
                                        showError={false}
                                    />
                                </div>
                            </div>

                            <div className="row mt-3">
                                <div className="col-md">
                                    <TextInput
                                        name="city"
                                        label="City"
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
                                        name="state"
                                        label="State"
                                        errors={errors}
                                        required
                                        control={control}
                                        displayEmpty
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select</em>
                                        </MenuItem>
                                        {StateOptions.map(option => (
                                            <MenuItem
                                                key={option.key}
                                                value={option.key}
                                            >
                                                {option.value}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </div>
                                <div className="col-md mt-3 mt-md-0">
                                    <TextInput
                                        name="zip"
                                        label="Zip"
                                        errors={errors}
                                        required
                                        inputRef={register()}
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row no-gutters mt-3 mt-sm-5 mb-3">
                        <div className="col d-none d-sm-flex" />
                        <div className="col-12 col-sm-auto text-right mt-3 mt-sm-0 mr-0 mr-sm-3 order-12 order-sm-1">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/intake/qualify')}
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

FormStep1.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(FormStep1);
