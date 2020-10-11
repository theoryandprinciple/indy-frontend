import React from 'react';
import PropTypes from 'prop-types';
import Collapse from '@material-ui/core/Collapse';
import { withStyles } from '@material-ui/core/styles';

import Styles from './styles';

const ConditionalQuestions = ({
    classes,
    condition,
    children,
    hideBorder,
    hideContainer,
}) => (
    <Collapse in={condition}>
        <div className={`${!hideContainer && classes.container} ${hideBorder && classes.noBorder}`}>
            {children}
        </div>
    </Collapse>
);

ConditionalQuestions.defaultProps = {
    hideBorder: false,
    hideContainer: false,
};
ConditionalQuestions.propTypes = {
    classes: PropTypes.object.isRequired,
    condition: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
    hideBorder: PropTypes.bool,
    hideContainer: PropTypes.bool,
};

export default withStyles(Styles)(ConditionalQuestions);
