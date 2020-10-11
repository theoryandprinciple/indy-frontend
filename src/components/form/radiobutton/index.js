import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import ConditionalQuestions from '../conditional-questions';

const RadioButton = ({
    value,
    label,
    required,
    isChecked,
    inputRef,
    inputProps,
    buttonStyle,
    conditional,
}) => {
    const elementProps = {
        ...inputProps,
        'aria-required': required,
        required,
    };

    return (
        <>
            <FormControlLabel
                value={value}
                label={label}
                checked={isChecked}
                inputRef={inputRef}
                data-checked={isChecked} // used for styling
                control={(
                    <Radio
                        color="primary"
                        inputProps={elementProps}
                    />
                )}
            />

            { conditional && (
                <ConditionalQuestions hideBorder condition={isChecked}>
                    {conditional}
                </ConditionalQuestions>
            )}

            { !buttonStyle && (
                <hr />
            )}
        </>
    );
};

RadioButton.defaultProps = {
    required: false,
    isChecked: false,
    inputRef: null,
    inputProps: null,
    buttonStyle: false,
    conditional: null,
};

RadioButton.propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    isChecked: PropTypes.bool,
    inputRef: PropTypes.func,
    inputProps: PropTypes.object,
    buttonStyle: PropTypes.bool,
    conditional: PropTypes.node,
};

export default RadioButton;
