import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';

import LayoutStyles from '../../styles/layouts';
import { getPdfLink } from '../../selectors/form';

import { DownloadForm } from '../../utils/ga';

const FormDownload = ({ classes }) => {
    const pdfLink = useSelector(getPdfLink);
    return (
        <div className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Almost done!</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Download your letter to send to your landlord</Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                href={pdfLink}
                                target="_blank"
                                className="mt-3"
                                onClick={() => DownloadForm()}
                            >
                                Download complete form
                            </Button>
                            <Typography variant="h2" color="primary" className="mt-5">
                                Next Steps
                            </Typography>
                            <ol className="pl-5 mb-0">
                                <li className="mt-3 pl-2">
                                    <Typography variant="body1">
                                        Download a copy of this letter for your own records.
                                    </Typography>
                                </li>
                                <li className="mt-3 pl-2">
                                    <Typography variant="body1">
                                        Send a copy to your landlord. You can send it by email or print a copy and mail it.
                                    </Typography>
                                </li>
                                <li className="mt-3 pl-2">
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

FormDownload.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(FormDownload);
