import React, {
    useState,
    useCallback,
    useEffect,
    useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { includes } from 'lodash';
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
import ConditionalQuestions from '../../components/form/conditional-questions';

import { SaveAnswers, UpdateFormStep, PostForm } from '../../actions/form';
import { getAnswers, getFormStepCleared } from '../../selectors/form';
import SendOptions from './wiring/send-options-list';
import StateOptions from './wiring/state-list';
import ZipOptions from './wiring/zip-list';

import LayoutStyles from '../../styles/layouts';

const FormStep2 = ({ classes }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const formStepCleared = useSelector(getFormStepCleared);
    const currentAnswers = useSelector(getAnswers);

    const zipInList = useMemo(() => includes(ZipOptions, currentAnswers.tenant.zip), [currentAnswers.tenant.zip]);

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
        resolver: yupResolver(ValidationSchema.step2),
        defaultValues: {
            company: currentAnswers.landlord.company,
            name: currentAnswers.landlord.name,
            sendMethod: currentAnswers.sendMethod,
            address: currentAnswers.landlord.address,
            address2: currentAnswers.landlord.address2,
            city: currentAnswers.landlord.city,
            state: currentAnswers.landlord.state,
            zip: currentAnswers.landlord.zip,
        },
    });
    const onSubmit = useCallback((values) => {
        const saveValues = {
            ...currentAnswers,
            landlord: {
                company: values.company,
                name: values.name,
                address: values.address,
                address2: values.address2,
                city: values.city,
                state: values.state,
                zip: values.zip,
            },
            sendMethod: values.sendMethod,
        };
        dispatch(UpdateFormStep(2));
        dispatch(SaveAnswers(saveValues));
        let onSuccess;
        if (saveValues.sendMethod === 'usps') onSuccess = () => history.push('/form/done');
        else onSuccess = () => history.push('/form/3');
        // TODO: we have no requirements for error handling so for now just log the error
        const onError = (error) => { console.error(error); };
        dispatch(PostForm(saveValues, onSuccess, onError));
    }, [dispatch, history, currentAnswers]);
    const watchAll = watch();
    const [continueActive, setContinueActive] = useState(false);
    const watchSendMethod = watch('sendMethod');

    useEffect(() => {
        if (formStepCleared < 1) history.push(`/form/${formStepCleared}`);
    }, [formStepCleared, history]);

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
                            <Typography variant="body1" color="primary">Step 2 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Enter your landlord&apos;s information</Typography>
                            <Typography variant="body1" className="mt-1">This information will determine where your letter is sent. You can send this information to go to your landlord, the owner of the property where you live, or another person who has the right to have you evicted or removed from where you live. If you are unsure where to send this notice, please look at your lease or ask your landlord where you may send a legal notice.</Typography>
                            <div className="row mt-4">
                                <div className="col">
                                    <TextInput
                                        name="company"
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
                                        name="name"
                                        label="Full Name"
                                        errors={errors}
                                        required
                                        inputRef={register()}
                                        // showError={false}
                                    />
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-md">
                                    <Select
                                        name="sendMethod"
                                        label="How do you want to send the form?"
                                        errors={errors}
                                        required
                                        control={control}
                                        displayEmpty
                                    >
                                        <MenuItem disabled value="">
                                            <em>Select</em>
                                        </MenuItem>
                                        {SendOptions.map((option) => {
                                            if (option.key === 'usps' && !zipInList) return false;
                                            return (
                                                <MenuItem
                                                    key={option.key}
                                                    value={option.key}
                                                >
                                                    {option.value}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ConditionalQuestions condition={watchSendMethod === 'email'}>
                        <div className="row mt-3">
                            <div className="col-md">
                                <TextInput
                                    name="email"
                                    label="Email"
                                    errors={errors}
                                    inputRef={register()}
                                />
                            </div>
                        </div>
                    </ConditionalQuestions>
                    <ConditionalQuestions condition={watchSendMethod === 'usps'}>
                        <div className="row mt-3">
                            <div className="col-md-8">
                                <TextInput
                                    name="address"
                                    label="Address"
                                    errors={errors}
                                    inputRef={register()}
                                />
                            </div>
                            <div className="col-md-4">
                                <TextInput
                                    name="address2"
                                    label="Unit"
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
                                    inputRef={register()}
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
                                            value={option.value}
                                        >
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="col-md">
                                <TextInput
                                    name="zip"
                                    label="Zip"
                                    errors={errors}
                                    inputRef={register()}
                                />
                            </div>
                        </div>
                    </ConditionalQuestions>
                    <div className="row no-gutters mt-3 mt-sm-5 mb-3">
                        <div className="col d-none d-sm-flex" />
                        <div className="col-12 col-sm-auto text-right mt-3 mt-sm-0 mr-0 mr-sm-3 order-12 order-sm-1">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/form/1')}
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

FormStep2.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(FormStep2);
