import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import ElementTypes from '../../wiring/element-types';
import IconList from '../../wiring/icon-list';
import Styles from './styles';

const BoxWithHandle = ({ text, questionType, classes }) => {
    const [{ opacity }, preview] = useDrag({
        item: { type: ElementTypes.QUESTION, text, questionType },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });
    return (
        <div ref={preview} className={`row no-gutters ${classes.elementQuestionWrapper}`} style={{ opacity }}>
            <div className="col-3">
                <div className={classes.elementQuestionIconWrapper}>
                    {IconList[questionType]}
                </div>
            </div>
            <div className="col-9" style={{ verticalAlign: 'center' }}>
                <Typography variant="body1">{text}</Typography>
            </div>
        </div>
    );
};

BoxWithHandle.propTypes = {
    text: PropTypes.string.isRequired,
    questionType: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(BoxWithHandle);
