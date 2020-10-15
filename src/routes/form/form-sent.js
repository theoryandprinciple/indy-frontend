import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

import LayoutStyles from '../../styles/layouts';
import { getPdfLink } from '../../selectors/form';

const FormSent = ({ classes }) => {
    const pdfLink = useSelector(getPdfLink);
    return (
        <div className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">All done!</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Your letter is being sent!</Typography>
                            <Typography variant="body1" className="mt-3">
                                We are sending it via USPS mail for you. Keep a copy for your records by sending the form(s) to yourself:
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                href={pdfLink}
                                target="_blank"
                                className="mt-3"
                            >
                                Download complete form
                            </Button>
                            <Typography variant="h2" color="primary" className="mt-5">
                                Next Steps
                            </Typography>
                            <ol>
                                <li className="mt-3">
                                    <Typography variant="body1">
                                        Download a copy of this letter for your own records.
                                    </Typography>
                                </li>
                                <li className="mt-3">
                                    <Typography variant="body1">
                                        Follow up with your landlord to confirm they received it.
                                    </Typography>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

FormSent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(FormSent);
