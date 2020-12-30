import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateFormStep } from '../../actions/form';
import { getAnswers, getFormStepCleared } from '../../selectors/form';

import CombineStyles from '../../utils/combine-styles';
import LayoutStyles from '../../styles/layouts';
import Styles from './styles';

const FormStep3 = ({ classes }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const currentAnswers = useSelector(getAnswers);
    const formStepCleared = useSelector(getFormStepCleared);
    const {
        tenant,
        landlord,
        date,
    } = currentAnswers;

    useEffect(() => {
        if (formStepCleared < 2) history.push(`/form/${formStepCleared}`);
    }, [formStepCleared, history]);

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
                                    {date}
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    {tenant.firstName} {tenant.lastName}<br />
                                    {tenant.address}<br />
                                    {tenant.address2 && <>{tenant.address2}<br /></>}
                                    {tenant.city}, {tenant.state} {tenant.zip}
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    {landlord.name}<br />
                                    {landlord.company && <>{landlord.company}<br /></>}
                                    {landlord.address && <>{landlord.address}<br /></>}
                                    {landlord.address2 && <>{landlord.address2}<br /></>}
                                    {/* landlordState has a default value, so we check city */}
                                    {landlord.city && <>{landlord.city}, {landlord.state} {landlord.zip}<br /></>}
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    Dear {landlord.name}:<br />
                                    I am writing you to express my right to not be evicted through January 31, 2021<sup>1</sup> because I am unable to pay my rent due to the COVID-19 pandemic. I have this right under the Centers for Disease Control and Prevention&apos;s (&quot;CDC&quot;) Order effective September 4, 2020<sup>2</sup>. The CDC issued this Order as an emergency action authorized by Section 361 of the Public Health Act and 42 CFR 70.2 to prevent the spread of COVID-19 throughout the United States, including Indiana.<br />
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
                                    {tenant.firstName} {tenant.lastName}<br />
                                    {tenant.address}<br />
                                    {tenant.address2 && <>{tenant.address2}<br /></>}
                                    {tenant.city}, {tenant.state} {tenant.zip}
                                </Typography>
                                <Typography variant="body2" className="mt-3">
                                    _______________________<br />
                                    _______________________<br />
                                    <sup>1</sup> The original expiration of December 31, 2020 was extended to January 31, 2021 by the Coronavirus Response and Relief Supplemental Appropriations Act
                                    <sup>2</sup> Center for Disease Control and Prevention&apos;s Order dated September 1, 2020. See:
                                    &nbsp;<a href="https://www.cdc.gov/coronavirus/2019-ncov/covid-eviction-declaration.html" target="_blank" rel="noopener noreferrer" className={classes.textLink}>https://www.cdc.gov/coronavirus/2019-ncov/covid-eviction-declaration.html</a>;
                                    &nbsp;see also <a href="https://www.federalregister.gov/documents/2020/09/04/2020-19654/temporary-halt-in-residential-evictions-to-prevent-the-further-spread-of-covid-19" target="_blank" rel="noopener noreferrer" className={classes.textLink}>https://www.federalregister.gov/documents/2020/09/04/2020-19654/temporary-halt-in-residential-evictions-to-prevent-the-further-spread-of-covid-19</a>
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <div className="row no-gutters mt-3 mt-sm-5 mb-3">
                        <div className="col d-none d-sm-flex" />
                        <div className="col-12 col-sm-auto text-right mt-3 mt-sm-0 mr-0 mr-sm-3 order-12 order-sm-1">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/form/2')}
                            >
                                Previous
                            </Button>
                        </div>
                        <div className="col-12 col-sm-auto text-right order-1 order-sm-12">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => { dispatch(UpdateFormStep(3)); history.push('/form/4'); }}
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
