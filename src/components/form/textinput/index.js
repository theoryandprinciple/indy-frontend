import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import InputBase from '@material-ui/core/InputBase';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-unresolved
import { ErrorMessage } from '@hookform/error-message';

import InputStyles from '../../../styles/inputs';

const TextInput = ({
    classes,
    name,
    label,
    value,
    helperText,
    errors,
    required,
    disabled,
    readOnly,
    inputRef,
    inputProps,
    children,
    showError,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const isInvalid = !!errors[name];

    let describedBy = helperText ? `${name}-helper` : null;
    if (showError && isInvalid) {
        describedBy = describedBy ? `${describedBy} ${name}-error` : `${name}-error`;
    }

    const handleFocus = useCallback(() => {
        setIsFocused(true);
    }, [setIsFocused]);

    const handleBlur = useCallback(() => {
        setIsFocused(false);
    }, [setIsFocused]);

    const elementProps = {
        ...inputProps,
        'aria-labelledby': `${name}-label`,
        'aria-describedby': describedBy,
        'aria-invalid': isInvalid,
        'aria-required': required,
        'aria-disabled': disabled,
        onFocus: handleFocus,
        onBlur: handleBlur,
    };

    return (
        <>
            <Typography variant="body1" id={`${name}-label`}>{label}</Typography>

            <InputBase
                variant="outlined"
                inputRef={inputRef}
                name={name}
                value={value}
                required={required}
                disabled={disabled}
                readOnly={readOnly}
                error={isInvalid}
                inputProps={elementProps}
            />

            { children }

            { helperText && (
                <Collapse in={isFocused}>
                    <Typography variant="body1" id={`${name}-helper`} className={classes.inputHelper}>{helperText}</Typography>
                </Collapse>
            )}

            {showError && (
                <div id={`${name}-error`} className={classes.errorMessage} role="status" aria-live="polite">
                    <ErrorMessage name={name} errors={errors} />
                </div>
            )}
        </>
    );
};

TextInput.defaultProps = {
    value: undefined,
    helperText: null,
    errors: {},
    disabled: false,
    required: false,
    readOnly: false,
    inputRef: null,
    inputProps: {},
    children: null,
    showError: true,
};

TextInput.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string,
    helperText: PropTypes.string,
    errors: PropTypes.object,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readOnly: PropTypes.bool,
    inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    inputProps: PropTypes.object,
    children: PropTypes.node,
    showError: PropTypes.bool,
};

export default withStyles(InputStyles)(TextInput);
