import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { ErrorMessage } from '@hookform/error-message';

import InputStyles from '../../../styles/inputs';

const SelectInput = ({
    classes,
    name,
    label,
    errors,
    required,
    control,
    rules,
    children,
    showError,
    displayEmpty,
    hiddenLabel,
}) => {
    const isInvalid = !!errors[name];
    const describedBy = (showError && isInvalid) ? `${name}-error` : null;

    const elementProps = {
        'aria-labelledby': !hiddenLabel ? `${name}-label` : null,
        'aria-label': hiddenLabel ? label : null,
        'aria-describedby': describedBy,
        'aria-invalid': isInvalid,
        'aria-required': required,
        required,
        displayEmpty,
    };

    return (
        <>
            {!hiddenLabel && (
                <Typography variant="body1" id={`${name}-label`}>{label}</Typography>
            )}

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={(props) => {
                    // eslint-disable-next-line react/prop-types
                    const { value, ...otherInputProps } = props;
                    return (
                        <Select
                            variant="outlined"
                            value={value || ''}
                            labelId={`${name}-label`}
                            {...elementProps}
                            {...otherInputProps}
                        >
                            {children}
                        </Select>
                    );
                }}
            />

            {showError && (
                <div id={`${name}-error`} className={classes.errorMessage} role="status" aria-live="polite">
                    <ErrorMessage name={name} errors={errors} />
                </div>
            )}
        </>
    );
};

SelectInput.defaultProps = {
    errors: {},
    required: false,
    showError: true,
    rules: null,
    displayEmpty: false,
    hiddenLabel: false,
};

SelectInput.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errors: PropTypes.object,
    showError: PropTypes.bool,
    required: PropTypes.bool,
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
    children: PropTypes.node.isRequired,
    displayEmpty: PropTypes.bool,
    hiddenLabel: PropTypes.bool,
};

export default withStyles(InputStyles)(SelectInput);
