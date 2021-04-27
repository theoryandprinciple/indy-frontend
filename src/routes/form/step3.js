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
                                    I am writing you to express my right to not be evicted through June 30, 2021<sup>1</sup>, or the end date of the CDC Moratorium whichever is later, because I am unable to pay my rent due to the COVID-19 pandemic. I have this right under the Centers for Disease Control and Prevention&apos;s (&quot;CDC&quot;) Order effective September 4, 2020<sup>2</sup>. The CDC issued this Order as an emergency action authorized by Section 361 of the Public Health Act and 42 CFR 70.2 to prevent the spread of COVID-19 throughout the United States, including Indiana.<br />
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    The CDC Order states that “a landlord, owner of residential property, or other person with a legal right to pursue eviction or possessory action, shall not evict any covered person from any residential property in any jurisdiction to which this Order applies.” I am a “covered person” pursuant to this Order and request that you or your agent stop any action to remove or cause the removal of myself or my family from the leased property. This Order and its prohibitions apply to any stage of the eviction process, including but not limited to: you sending a notice to vacate, making an initial court filing, or pursuing execution of a post-judgment possessory action.
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    Please note that pursuant to 18 U.S.C. 3559, 3571; 42 U.SC. 271; and 42 CFR 70.18, a person violating this Order may be subject to a fine of up to $250,000, a year and jail, or both depending on the circumstances. The U.S. Department of Justice may initiate court proceedings as appropriate seeking imposition of these criminal penalties. For further information you may contact the CDC directly at 404-639-7000 or
                                    &nbsp;<a href="mailto:cdcregulations@cdc.gov" target="_blank" rel="noopener noreferrer" className={classes.textLink}>cdcregulations@cdc.gov</a>.
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    Additionallyon April 19, 2021, the Consumer Financial Protection Bureau (CFPB) issued an interim final rule in support of the Centers for Disease Control and Prevention (CDC)’s eviction moratorium. The CFPB’s rule requires debt collectors to provide written notice to tenants of their rights under the eviction moratorium and prohibits debt collectors from misrepresenting tenants’ eligibility for protection from eviction under the moratorium. Debt collectors who evict tenants who may have rights under the moratorium without providing notice of the moratorium or who misrepresent tenants’ rights under the moratorium can be prosecuted by federal agencies and state attorneys general for violations of the Fair Debt Collection Practices Act (FDCPA) and are also subject to private lawsuits by tenants. For more information, visit <a href="https://www.consumerfinance.gov/coronavirus/mortgage-and-housing-assistance/renter-protections/what-to-do-after-you-receive-eviction-notice/?utm_source=print&utm_medium=pdf&utm_campaign=eviction%20notice&utm_content=vanity" target="_blank" rel="noopener noreferrer" className={classes.textLink}>www.cfpb.gov/eviction</a> or call a housing counselor at 800-569-4287<sup>3</sup>
                                </Typography>
                                <Typography variant="body1" className="mt-3">
                                    The CFPB now receives complaints for violationsof this Orderat <a href="https://www.consumerfinance.gov/complaint/" target="_blank" rel="noopener noreferrer" className={classes.textLink}>www.consumerfinance.gov/complaint/</a> or by calling 855-411-2372
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
                                    <sup>1</sup> The original expiration of December 31, 2020 was extended to June 30, 2021 by the Coronavirus Response and Relief Supplemental Appropriations Act<br />
                                    <sup>2</sup> Center for Disease Control and Prevention&apos;s Order dated September 1, 2020. See:
                                    &nbsp;<a href="https://www.cdc.gov/coronavirus/2019-ncov/covid-eviction-declaration.html" target="_blank" rel="noopener noreferrer" className={classes.textLink}>https://www.cdc.gov/coronavirus/2019-ncov/covid-eviction-declaration.html</a>;
                                    &nbsp;see also <a href="https://www.federalregister.gov/documents/2020/09/04/2020-19654/temporary-halt-in-residential-evictions-to-prevent-the-further-spread-of-covid-19" target="_blank" rel="noopener noreferrer" className={classes.textLink}>https://www.federalregister.gov/documents/2020/09/04/2020-19654/temporary-halt-in-residential-evictions-to-prevent-the-further-spread-of-covid-19</a>
                                    <sup>3</sup> See the Consumer Financial Protection Bureau (CFPB) interim final rule at <a href="https://files.consumerfinance.gov/f/documents/cfpb_debt_collection-practices-global-covid-19-pandemic_interim-final-rule_2021-04.pdf?utm_medium=email&utm_source=govdelivery" target="_blank" rel="noopener noreferrer" className={classes.textLink}>https://files.consumerfinance.gov/f/documents/cfpb_debt_collection-practices-global-covid-19-pandemic_interim-final-rule_2021-04.pdf?utm_medium=email&utm_source=govdelivery</a>; see also <a href="https://www.consumerfinance.gov/coronavirus/mortgage-and-housing-assistance/renter-protections/?utm_source=youtube&utm_medium=video&utm_campaign=vanity_renters" target="_blank" rel="noopener noreferrer" className={classes.textLink}>https://www.consumerfinance.gov/coronavirus/mortgage-and-housing-assistance/renter-protections/?utm_source=youtube&utm_medium=video&utm_campaign=vanity_renters</a>.
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
