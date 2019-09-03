import React from 'react';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { withStyles } from '@material-ui/core/styles';
import ElementTypes from '../../wiring/element-types';
import Styles from './styles';

const BoxWithHandle = ({ text, classes }) => {
    const [{ opacity }, drag, preview] = useDrag({
        item: { type: ElementTypes.SECTION, text },
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.4 : 1,
        }),
    });
    return (
        <div ref={preview} className={classes.handleWrapperStyle} style={{ opacity }}>
            <div ref={drag} className={classes.handleStyle} />
            {text}
        </div>
    );
};

BoxWithHandle.propTypes = {
    text: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(BoxWithHandle);
