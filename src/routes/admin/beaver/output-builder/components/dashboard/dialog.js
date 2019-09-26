import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';
import IconList from '../../../wiring/icon-list';
import Styles from './styles';

const DialogTitle = withStyles(Styles)((props) => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography>
            <Typography variant="h6" className={classes.dialogTitle}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.dialogCloseButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const CustomizedDialogs = ({ classes }) => {
    const [open, setOpen] = React.useState(false);
    const history = useHistory();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const createNew = (type) => {
        history.push(`output-builder/create?type=${type}`);
    };

    return (
        <div className="row text-right">
            <div className="col">
                <button onClick={handleClickOpen} type="button" className={classes.addOutputBtn}>Add</button>
            </div>
            <Dialog className={classes.dialogWrapper} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Add a new piece of content or resource
                </DialogTitle>
                <div className={`text-center ${classes.dialogContentWrapper}`}>
                    <button onClick={() => createNew('content')} type="button" className={`${classes.outputBlockWrapper} ${classes.dialogOutputBlockWrapper}`}>
                        <div className={`${classes.dialogElementIconWrapper} ${classes.elementIconWrapper} ${classes.elementOutputIcon}`}>
                            {IconList.content}
                        </div>
                        <Typography gutterBottom>
                            <strong>Content</strong>
                        </Typography>
                        <Typography gutterBottom>
                            Use this to display basic text and links.
                        </Typography>
                    </button>
                    <button onClick={() => createNew('email')} type="button" className={`${classes.outputBlockWrapper} ${classes.dialogOutputBlockWrapper}`}>
                        <div className={`${classes.dialogElementIconWrapper} ${classes.elementIconWrapper} ${classes.elementOutputIcon}`}>
                            {IconList.email}
                        </div>
                        <Typography gutterBottom>
                            <strong>Email</strong>
                        </Typography>
                        <Typography gutterBottom>
                            Use this to display basic text and links.
                        </Typography>
                    </button>
                </div>
            </Dialog>
        </div>
    );
};

CustomizedDialogs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(CustomizedDialogs);
