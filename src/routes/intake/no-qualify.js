import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import LayoutStyles from '../../styles/layouts';

const IntakeQualify = ({ classes }) => {
    const history = useHistory();

    return (
        <div className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Sorry, you don’t qualify</Typography>
                            <Typography variant="body1" className="mt-3">
                                If the answers you gave indicate you don&apos;t qualify, you can restart but please proceed with caution and remember that you must answer these questions truthfully. You could be subject to civil or criminal penalties if you lie on these forms. If you are in need of emergency housing, please dial 211. If you are in need of legal help, please see the resources provided by us and our partner legal aid organizations:
                            </Typography>
                            <Typography variant="body1" className="mt-3">
                                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className={classes.textLink}>
                                    Neighborhood Christian Legal Clinic
                                </a>
                            </Typography>
                            <Typography variant="body1" className="mt-1">
                                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className={classes.textLink}>
                                    Indiana Legal Services
                                </a>
                            </Typography>
                            <Typography variant="body1" className="mt-1">
                                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className={classes.textLink}>
                                    Indianapolis Legal Aid Society
                                </a>
                            </Typography>
                            <Typography variant="body1" className="mt-1">
                                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer" className={classes.textLink}>
                                    Find Help in Your Area
                                </a>
                            </Typography>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.goBack()}
                                className="mr-3"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push('/')}
                            >
                                Home
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

IntakeQualify.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(IntakeQualify);
