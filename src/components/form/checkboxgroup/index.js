import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { ErrorMessage } from '@hookform/error-message';

import Checkbox from '../checkbox';

import InputStyles from '../../../styles/inputs';

const getCheckedState = (options, values) => {
    const checkedStateMap = {};
    options.forEach((option) => {
        checkedStateMap[option.id] = values ? values.includes(option.id) : false;
    });

    return checkedStateMap;
};

const CheckboxGroup = ({
    name,
    label,
    values,
    onChange,
    options,
    inputRef,
    inputProps,
    conditional,
}) => {
    const [checkedState, setCheckedState] = useState(getCheckedState(options, values));

    const handleChange = useCallback((event) => {
        const updatedState = {
            ...checkedState,
            [event.target.name]: event.target.checked,
        };
        setCheckedState(updatedState);

        const selectedInputs = Object.entries(updatedState)
            .filter(([value, isChecked]) => isChecked) // eslint-disable-line no-unused-vars
            .map(([value, isChecked]) => value); // eslint-disable-line no-unused-vars

        // send updates to the parent component
        onChange(selectedInputs);
    }, [checkedState, setCheckedState, onChange]);

    return (
        <FormGroup aria-labelledby={label ? `${name}-label` : null}>
            {options.map(choice => (
                <Checkbox
                    key={choice.id}
                    value={choice.id}
                    name={choice.id}
                    label={choice.name}
                    inputRef={inputRef}
                    inputProps={inputProps}
                    onChange={handleChange}
                    isChecked={checkedState[choice.id]}
                    conditional={conditional ? conditional[choice.name] : null}
                />
            ))}
        </FormGroup>
    );
};

CheckboxGroup.defaultProps = {
    values: [],
    label: null,
    inputRef: null,
    inputProps: null,
    conditional: null,
};

CheckboxGroup.propTypes = {
    name: PropTypes.string.isRequired,
    values: PropTypes.array,
    label: PropTypes.string,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    inputRef: PropTypes.func,
    inputProps: PropTypes.object,
    conditional: PropTypes.object,
};


const ControlledCheckboxGroup = ({
    classes,
    name,
    label,
    errors,
    showError,
    required,
    control,
    rules,
    options,
    inputRef,
    conditional,
    hiddenLabel,
}) => {
    const isInvalid = !!errors[name];
    const describedBy = (showError && isInvalid) ? `${name}-error` : null;

    const elementProps = {
        'aria-describedby': describedBy,
        'aria-invalid': isInvalid,
        'aria-required': required,
        required,
    };
    if (hiddenLabel) elementProps['aria-label'] = label;

    return (
        <FormControl
            component="fieldset"
            error={isInvalid}
            fullWidth
            required={required}
        >
            {(label && !hiddenLabel) && (
                <Typography variant="body1" id={`${name}-label`} className={classes.inputLabel}>{label}</Typography>
            )}

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={controllerProps => (
                    <CheckboxGroup
                        classes={classes}
                        name={name}
                        label={!hiddenLabel ? label : ''}
                        values={controllerProps.value}
                        onChange={controllerProps.onChange}
                        options={options}
                        inputRef={inputRef}
                        inputProps={elementProps}
                        conditional={conditional}
                    />
                )}
            />

            {showError && (
                <div id={`${name}-error`} className={classes.errorMessage} role="status" aria-live="polite">
                    <ErrorMessage name={name} errors={errors} />
                </div>
            )}
        </FormControl>
    );
};

ControlledCheckboxGroup.defaultProps = {
    label: null,
    errors: {},
    showError: true,
    required: false,
    rules: null,
    inputRef: null,
    conditional: null,
    hiddenLabel: false,
};

ControlledCheckboxGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    errors: PropTypes.object,
    showError: PropTypes.bool,
    required: PropTypes.bool,
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
    options: PropTypes.array.isRequired,
    inputRef: PropTypes.func,
    conditional: PropTypes.object,
    hiddenLabel: PropTypes.bool,
};

export default withStyles(InputStyles)(ControlledCheckboxGroup);
