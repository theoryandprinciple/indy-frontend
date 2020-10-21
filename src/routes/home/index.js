import React, { forwardRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { HardResetForm } from '../../actions/form';

import HIW1 from './images/how-it-works-1.png';
import HIW2 from './images/how-it-works-2.png';
import HIW3 from './images/how-it-works-3.png';

import Logo1 from './images/Indy_logo.png';
import Logo2 from './images/NCLC_logo.png';

import CombineStyles from '../../utils/combine-styles';
import LayoutStyles from '../../styles/layouts';
import ButtonStyles from '../../styles/buttons';
import Styles from './styles';

const Home = ({ classes }) => {
    const IntakeLink = forwardRef((props, ref) => <NavLink to="/intake/start" {...ref} {...props} />);
    const dispatch = useDispatch();
    // we reset the form incase the user uses the logo link to get back here while PII is in the form
    useEffect(() => {
        dispatch(HardResetForm());
    }, [dispatch]);

    return (
        <>
            <section className={`${classes.sectionWrapper} ${classes.sectionWrapperPurple} ${classes.sectionWrapperFullWidth}`}>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <Typography component="h1" className={`mb-3 ${classes.title}`}>Are you facing an <span>eviction</span>? This tool can help.</Typography>
                            <Typography variant="body1">If you&apos;re having trouble keeping up with your rent payments, the Federal Government has issued an order that prevents landlords in the US from evicting many of their tenants until December 31, 2020. Use this tool to see if you are covered, and to produce the right letter (called a &quot;Declaration&quot;) to send to your landlord, as required by the order.</Typography>
                            <Button component={IntakeLink} variant="contained" color="secondary" className="mt-5 mb-5">
                                Start Free Tool
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md text-center">
                            <img src={HIW1} alt="" className={classes.HIWImg} />
                            <Typography variant="h2" color="primary">Fill out the form in 5 minutes</Typography>
                            <Typography variant="body1" className="mt-2">Answer a few questions and provide your landlord&apos;s contact information</Typography>
                        </div>
                        <div className="col-md text-center">
                            <img src={HIW2} alt="" className={classes.HIWImg} />
                            <Typography variant="h2" color="primary">The tool will create a letter</Typography>
                            <Typography variant="body1" className="mt-2">The app will create a letter that is read to send based on your answers</Typography>
                        </div>
                        <div className="col-md text-center">
                            <img src={HIW3} alt="" className={classes.HIWImg} />
                            <Typography variant="h2" color="primary">Send the letter to your landlord</Typography>
                            <Typography variant="body1" className="mt-2">Send the letter via the app or download it and send  it to your landlord</Typography>
                        </div>
                    </div>
                </div>
            </section>
            <section className="mt-5">
                <div className="container" style={{ maxWidth: 850 }}>
                    <div className="row">
                        <div className="col text-center">
                            <Typography variant="h1" color="primary">
                                About Indy Renter Help
                            </Typography>
                            <Typography variant="body1" className="mt-3">
                                Indy Renter Help was built by the&nbsp;
                                <a href="https://www.nclegalclinic.org/" target="_blank" rel="noopener noreferrer" className={classes.textLink}>Neighborhood Christian Legal Clinic</a>.
                                &nbsp;The purpose of the site is to provide self-help tools and resources to struggling Hoosier renters so that they can obtain protection they are entitled to under the current CDC Federal Eviction Moratorium.
                            </Typography>
                            <Typography variant="body1" className="mt-3">
                                <b>Our Vision</b>
                            </Typography>
                            <Typography variant="body1">
                                Justice for the vulnerable so that all may flourish.
                            </Typography>
                            <Typography variant="body1" className="mt-3">
                                <b>Our Mission</b>
                            </Typography>
                            <Typography variant="body1">
                                To promote justice through legal representation and legal education for our low-income neighbors as a way of demonstrating Christ&apos;s love.
                            </Typography>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col d-none d-md-flex" />
                        <div className="col-12 col-md-auto text-center mr-4">
                            <img src={Logo2} alt="Neighborhood Chirstian Legal Clinic" className={classes.HIWImg} />
                        </div>
                        <div className="col-12 col-md-auto text-center ml-4">
                            <img src={Logo1} alt="Indy.gov" className={classes.HIWImg} />
                        </div>
                        <div className="col d-none d-md-flex" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col text-center">
                        <Typography variant="h1" color="primary">
                            Other Resources
                        </Typography>
                        <Typography variant="body1" className="mt-2">
                            Other resources provided by our partner legal aid organizations:
                        </Typography>
                        <Typography variant="body1" className="mt-3">
                            <a href="https://www.indianalegalservices.org/" target="_blank" rel="noopener noreferrer" className={classes.textLink}>
                                Indiana Legal Services
                            </a>
                        </Typography>
                        <Typography variant="body1" className="mt-1">
                            <a href="https://www.indylas.org/" target="_blank" rel="noopener noreferrer" className={classes.textLink}>
                                Indianapolis Legal Aid Society
                            </a>
                        </Typography>
                        <Typography variant="body1" className="mt-1">
                            <a href="https://indianalegalhelp.org/find-legal-help/" target="_blank" rel="noopener noreferrer" className={classes.textLink}>
                                Find Help in Your Area
                            </a>
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="mt-5 mb-3"
                            href="https://www.nclegalclinic.org/donate"
                            target="_blank"
                        >
                            Donate
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(LayoutStyles, ButtonStyles, Styles);
export default withStyles(combinedStyles)(Home);
