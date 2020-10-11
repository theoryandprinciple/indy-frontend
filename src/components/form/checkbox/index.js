import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';

import ConditionalQuestions from '../conditional-questions';

const Checkbox = ({
    value,
    name,
    label,
    inputRef,
    inputProps,
    onChange,
    isChecked,
    conditional,
}) => (
    <>
        <FormControlLabel
            label={label}
            value={value}
            inputRef={inputRef}
            onChange={onChange}
            checked={isChecked}
            data-checked={isChecked} // used for styling
            control={(
                <MuiCheckbox
                    color="primary"
                    checked={isChecked}
                    name={name}
                    inputProps={inputProps}
                />
            )}
        />

        { conditional && (
            <ConditionalQuestions hideBorder condition={isChecked}>
                {conditional}
            </ConditionalQuestions>
        )}
    </>
);

Checkbox.defaultProps = {
    label: null,
    inputRef: null,
    inputProps: null,
    isChecked: false,
    conditional: null,
};

Checkbox.propTypes = {
    value: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    inputRef: PropTypes.func,
    inputProps: PropTypes.object,
    onChange: PropTypes.func.isRequired,
    isChecked: PropTypes.bool,
    conditional: PropTypes.node,
};

export default Checkbox;
