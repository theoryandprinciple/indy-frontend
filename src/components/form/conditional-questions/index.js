import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';

const ConditionalQuestions = ({
    condition,
    children,
}) => (
    <Collapse in={condition}>
        {children}
    </Collapse>
);

ConditionalQuestions.propTypes = {
    condition: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};

export default ConditionalQuestions;
