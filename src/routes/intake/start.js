import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import LayoutStyles from '../../styles/layouts';
import CheckIcon from '../../images/check.png';

const IntakeStart = ({ classes }) => {
    const history = useHistory();

    return (
        <div className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">How to stay in your home</Typography>
                            <Typography variant="body1" className="mt-3">The federal government has banned landlords from evicting qualifying tenants for non-payment of rent due to the COVID-19 public health crisis. In order to protect yourself you need to:</Typography>
                            <div className="row mt-3">
                                <div className="col-auto ml-1">
                                    <img src={CheckIcon} alt="" style={{ width: 30 }} />
                                </div>
                                <div className="col">
                                    <Typography variant="body1">
                                        Make sure you qualify (there are 5 questions we will ask you).
                                    </Typography>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-auto ml-1">
                                    <img src={CheckIcon} alt="" style={{ width: 30 }} />
                                </div>
                                <div className="col">
                                    <Typography variant="body1">
                                        Fill out your address and your landlord’s information.
                                    </Typography>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-auto ml-1">
                                    <img src={CheckIcon} alt="" style={{ width: 30 }} />
                                </div>
                                <div className="col">
                                    <Typography variant="body1">
                                        Send the letter to your landlord (we can help you with that).
                                    </Typography>
                                </div>
                            </div>
                            <Typography variant="body2" className="mt-4">
                                You must tell the truth when answering these questions or you could face civil or criminal penalties.
                            </Typography>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-right">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push('/intake/1')}
                            >
                                Start
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

IntakeStart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(IntakeStart);
