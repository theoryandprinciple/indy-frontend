import React, { createElement, Children } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import { Controller } from 'react-hook-form';
// eslint-disable-next-line import/no-unresolved
import { ErrorMessage } from '@hookform/error-message';

import InputStyles from '../../../styles/inputs';

const RadioGroup = ({
    classes,
    name,
    label,
    errors,
    showError,
    required,
    control,
    rules,
    row,
    hiddenLabel,
    children,
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
    };

    return (
        <FormControl
            component="fieldset"
            error={isInvalid}
            fullWidth
            required={required}
        >
            { !hiddenLabel && (
                <Typography variant="body1" id={`${name}-label`} className={classes.inputLabel}>{label}</Typography>
            )}

            <Controller
                name={name}
                control={control}
                rules={rules}
                render={props => (
                    <MuiRadioGroup row={row} {...elementProps} {...props}>
                        {
                            Children.map(children, child => (
                                <>
                                    {createElement(child.type, {
                                        ...{
                                            ...child.props,
                                            // eslint-disable-next-line react/prop-types
                                            isChecked: props.value === child.props.value,
                                        },
                                    })}
                                </>
                            ))
                        }
                    </MuiRadioGroup>
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

RadioGroup.defaultProps = {
    errors: {},
    showError: true,
    required: false,
    rules: null,
    row: false,
    hiddenLabel: false,
};

RadioGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    errors: PropTypes.object,
    showError: PropTypes.bool,
    required: PropTypes.bool,
    control: PropTypes.object.isRequired,
    rules: PropTypes.object,
    row: PropTypes.bool,
    hiddenLabel: PropTypes.bool,
    children: PropTypes.node.isRequired,
};

export default withStyles(InputStyles)(RadioGroup);
