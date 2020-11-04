import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import LayoutStyles from '../../styles/layouts';

const Privacy = ({ classes }) => (
    <div className={`container ${classes.containerWrapper}`} style={{ maxWidth: 850 }}>
        <div className={`row ${classes.sectionWrapper} pb-5`}>
            <div className="col">
                <Typography variant="h1" color="primary">
                    Privacy Policy Overview
                </Typography>
                <Typography variant="body1" className="mt-3">
                    At IndyRenterHelp.org, we respect your need for privacy and we want to share with you how we use your information. This policy applies to IndyRenterHelp.org (the &quot;Site&quot;) and services made available through the website from time to time. This policy describes the types of information that we may access through the Site, how we access that information, and what we do with it.
                </Typography>

                <Typography variant="h2" color="primary" className="mt-5">
                    Information We Access and How We Use It
                </Typography>
                <Typography variant="body1" className="mt-3">
                    The Site stores information on zip codes, gender and ethnicity (if provided), and addresses. We generate reports bi-weekly to determine how many users are using the Site, what zip codes they reside in, and how they identify their ethnicity (optional) and gender (optional). We may be contractually obligated to maintain this information for up to five years after the services on the Site terminate. We do not store your name, email address, or other information you may provide.
                </Typography>

                <Typography variant="h2" color="primary" className="mt-5">
                    Disclosure of Your Information
                </Typography>
                <Typography variant="body1" className="mt-3">
                    We will not sell your information to any third parties. We may share your information with:
                </Typography>

                <ul>
                    <Typography variant="body1" component="li">
                        Our subsidiaries and affiliates;
                    </Typography>
                    <Typography variant="body1" component="li">
                        With contractors, service providers, and other third parties who support us in operating the Site or delivering services in connection with the Site;
                    </Typography>
                    <Typography variant="body1" component="li">
                        To third parties in connection with financing of our operations through public or private funding sources (such as in submitting grant applications or reports);
                    </Typography>
                    <Typography variant="body1" component="li">
                        For any other purposes disclosed by us when you provide the information, or any other purpose we deem necessary or appropriate;
                    </Typography>
                    <Typography variant="body1" component="li">
                        To regulators, law enforcement, government agencies, or judicial courts in connection with investigations, legislative activities, or legal proceedings;
                    </Typography>
                    <Typography variant="body1" component="li">
                        To third parties as necessary in our discretion to enforce or protect our rights, property or safety or that of our users or third parties;
                    </Typography>
                    <Typography variant="body1" component="li">
                        To third parties in connection with research, public policy or educational purposes; and
                    </Typography>
                    <Typography variant="body1" component="li">
                        As otherwise permitted by applicable law.
                    </Typography>
                </ul>
                <Typography variant="body1" className="mt-3">
                    We also reserve the right to use for any purpose and to share with third parties any aggregated, de-identified, or anonymized data about our users and other individuals gathered in connection with our services.
                </Typography>

                <Typography variant="h2" color="primary" className="mt-5">
                    Third Party Websites, Platforms or Databases
                </Typography>
                <Typography variant="body1" className="mt-3">
                    The Site may contain links or other interfaces to websites, platforms or databases operated or maintained by third parties. We have no control over and are not responsible for the privacy policies or content on those websites, platforms or databases. Any link or other connection to third party websites, platforms or databases does not imply any endorsement, assurance, approval, or verification of any content contained on those websites, platforms or databases. Third party privacy policies at those locations may be different from our Policy. You should always read the privacy policy at those third party locations. If you do not approve of the third party privacy policies, we ask that you please refrain from using the Site.
                </Typography>

                <Typography variant="h2" color="primary" className="mt-5">
                    Contact Us
                </Typography>
                <Typography variant="body1" className="mt-3">
                    If you have any questions or comments regarding this Policy, we encourage you to contact us at <a href="mailto:contactus@nclegalclinic.org" target="_blank" rel="noopener noreferrer" className={classes.textLink}>contactus@nclegalclinic.org</a>.
                </Typography>
            </div>
        </div>
    </div>
);

Privacy.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(Privacy);
