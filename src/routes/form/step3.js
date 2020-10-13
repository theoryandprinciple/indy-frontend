import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAnswers } from '../../selectors/form';

import CombineStyles from '../../utils/combine-styles';
import LayoutStyles from '../../styles/layouts';
import Styles from './styles';

const d = new Date();
const currentYear = d.getUTCFullYear();
const currentDate = d.getUTCDate();
const month = [];
month[0] = 'January';
month[1] = 'February';
month[2] = 'March';
month[3] = 'April';
month[4] = 'May';
month[5] = 'June';
month[6] = 'July';
month[7] = 'August';
month[8] = 'September';
month[9] = 'October';
month[10] = 'November';
month[11] = 'December';
const currentMonth = month[d.getMonth()];

const FormStep3 = ({ classes }) => {
    const history = useHistory();
    const currentAnswers = useSelector(getAnswers);
    const {
        firstName,
        lastName,
        address,
        unit,
        city,
        state,
        zip,
        landlordFullName,
        landlordAddress,
        landlordUnit,
        landlordCity,
        landlordState,
        landlordZip,
    } = currentAnswers;

    return (
        <div className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Step 3 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Preview your ready to send letter</Typography>
                            <Typography variant="body1" className="mt-3">
                                We created a form with all your information, please check and make sure it looks correct.
                            </Typography>
                            <div className={`mt-3 ${classes.letterPreview}`}>
                                <Typography variant="body1">
                                    {firstName} {lastName}<br />
                                    {address}<br />
                                    {unit && <>{unit}<br /></>}
                                    {city}, {state} {zip}
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    {landlordFullName}<br />
                                    {landlordAddress && <>{landlordUnit}<br /></>}
                                    {landlordUnit && <>{landlordUnit}<br /></>}
                                    {/* landlordState has a default value, so we check city */}
                                    {landlordCity && <>{landlordCity},</>} {landlordCity && landlordState} {landlordZip}
                                    {currentMonth} {currentDate}, {currentYear}
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    Dear {landlordFullName}:<br />
                                    I am writing you to express my right to not be evicted through December 31, 2020 because I am unable to pay my rent due to the COVID-19 pandemic. I have this right under the Centers for Disease Control and Prevention&apos;s (&quot;CDC&quot;) Order effective September 4, 2020<sup>1</sup>. The CDC issued this Order as an emergency action authorized by Section 361 of the Public Health Act and 42 CFR 70.2 to prevent the spread of COVID-19 throughout the United States, including Indiana.<br />
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    The CDC Order states that “a landlord, owner of residential property, or other person with a legal right to pursue eviction or possessory action, shall not evict any covered person from any residential property in any jurisdiction to which this Order applies.” I am a “covered person” pursuant to this Order and request that you or your agent stop any action to remove or cause the removal of myself or my family from the leased property. This Order and its prohibitions apply to any stage of the eviction process, including but not limited to: you sending a notice to vacate, making an initial court filing, or pursuing execution of a post-judgment possessory action.
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    Please note that pursuant to 18 U.S.C. 3559, 3571; 42 U.SC. 271; and 42 CFR 70.18, a person violating this Order may be subject to a fine of up to $250,000, a year and jail, or both depending on the circumstances. The U.S. Department of Justice may initiate court proceedings as appropriate seeking imposition of these criminal penalties. For further information you may contact the CDC directly at 404-639-7000 or
                                    &nbsp;<a href="mailto:cdcregulations@cdc.gov" target="_blank" rel="noopener noreferrer" className={classes.textLink}>cdcregulations@cdc.gov</a>.
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    Regards,<br />
                                    _______________________<br />
                                    {firstName} {lastName}<br />
                                    {address}<br />
                                    {unit && <>{unit}<br /></>}
                                    {city}, {state} {zip}
                                </Typography>
                                <Typography variant="body2" className="mt-3">
                                    _______________________<br />
                                    _______________________<br />
                                    <sup>1</sup> enter for Disease Control and Prevention&apos;s Order dated September 1, 2020. See:
                                    &nbsp;<a href="https://www.cdc.gov/coronavirus/2019-ncov/covid-eviction-declaration.html" target="_blank" rel="noopener noreferrer" className={classes.textLink}>https://www.cdc.gov/coronavirus/2019-ncov/covid-eviction-declaration.html</a>;
                                    &nbsp;see also <a href="https://www.federalregister.gov/documents/2020/09/04/2020-19654/temporary-halt-in-residential-evictions-to-prevent-the-further-spread-of-covid-19" target="_blank" rel="noopener noreferrer" className={classes.textLink}>https://www.federalregister.gov/documents/2020/09/04/2020-19654/temporary-halt-in-residential-evictions-to-prevent-the-further-spread-of-covid-19</a>
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/form/2')}
                                className="mr-3"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push('/form/4')}
                            >
                                Looks Good!
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

FormStep3.propTypes = {
    classes: PropTypes.object.isRequired,
};

const combinedStyles = CombineStyles(LayoutStyles, Styles);
export default withStyles(combinedStyles)(FormStep3);
