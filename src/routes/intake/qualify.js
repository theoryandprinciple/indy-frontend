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
                            <Typography variant="h1" color="primary">Great, you qualify! Read the following info carefully</Typography>
                            <Typography variant="body1" className="mt-3">
                                When you sign the Declaration form, you are agreeing that you understand the following sentences and that they are true:
                            </Typography>
                            <Typography variant="body1" className="mt-3">
                                Even though I am protected from eviction through December 31, 2020,
                            </Typography>
                            <ol>
                                <li className="mt-3">
                                    <Typography variant="body1">
                                        I still am responsible to pay my rent and follow all other rules of my lease. My landlord may charge me fees or interest.
                                    </Typography>
                                </li>
                                <li className="mt-3">
                                    <Typography variant="body1">
                                        After December 31, 2020, I may be required to pay all of the rent due, in full.
                                    </Typography>
                                </li>
                                <li className="mt-3">
                                    <Typography variant="body1">
                                        I need to tell the truth on this form. If I do not, I may face civil or criminal penalties.
                                    </Typography>
                                </li>
                            </ol>
                        </div>
                    </div>
                    <div className="row no-gutters mt-3 mt-sm-5 mb-3">
                        <div className="col d-none d-sm-flex" />
                        <div className="col-12 col-sm-auto text-right mt-3 mt-sm-0 mr-0 mr-sm-3 order-12 order-sm-1">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.goBack()}
                            >
                                Previous
                            </Button>
                        </div>
                        <div className="col-12 col-sm-auto text-right order-1 order-sm-12">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push('/form/1')}
                            >
                                I Understand
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
