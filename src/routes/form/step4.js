import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

import Signature from '../../components/form/e-signature';
import LayoutStyles from '../../styles/layouts';

const FormStep4 = ({ classes }) => {
    const history = useHistory();

    return (
        <div className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Please sign the form</Typography>
                            <Typography variant="body1" className="mt-3">
                                Use your mouse (or finger on a phone) to sign the form digitally
                            </Typography>
                            <Signature
                                clearButtonOptions={{
                                    text: 'clear',
                                }}
                                saveButtonOptions={{
                                    text: 'save',
                                    onClick: () => {},
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-5">
                        <div className="col text-right">
                            <Button
                                variant="outlined"
                                color="primary"
                                onClick={() => history.push('/form/3')}
                                className="mr-3"
                            >
                                Previous
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => history.push('/form/5')}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

FormStep4.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(FormStep4);
