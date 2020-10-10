import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import LayoutStyles from '../../styles/layouts';

const Home = ({ classes }) => {
    const [state, setState] = useState({
        box1: true,
        box2: false,
    });
    const [radioValue, setRadioValue] = useState('');
    const handleRadioChange = (event) => {
        setRadioValue(event.target.value);
    };
    const { box1, box2 } = state;
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    return (
        <div className={`container ${classes.containerWrapper}`}>
            <div className={`row ${classes.sectionWrapper}`}>
                <div className="col">
                    <div className="row mt-3">
                        <div className="col text-center">
                            <Typography variant="body1" color="primary">Qualification 1 of 5</Typography>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col">
                            <Typography variant="h1" color="primary">Income Qualification</Typography>
                            <Typography variant="body1">Check all that apply</Typography>
                            <FormGroup>
                                <FormControlLabel
                                    data-checked={box1}
                                    control={(
                                        <Checkbox
                                            checked={box1}
                                            onChange={handleChange}
                                            name="box1"
                                            color="primary"
                                        />
                                    )}
                                    label="I did not report any income to the I.R.S. for 2019"
                                />
                                <FormControlLabel
                                    data-checked={box2}
                                    control={(
                                        <Checkbox
                                            checked={box2}
                                            onChange={handleChange}
                                            name="box2"
                                            color="primary"
                                        />
                                    )}
                                    label="I did not report any income to the I.R.S. for 2019"
                                />
                            </FormGroup>
                            <RadioGroup aria-label="quiz" name="quiz" value={radioValue} onChange={handleRadioChange}>
                                <FormControlLabel data-checked={radioValue === 'best'} value="best" control={<Radio color="primary" />} label="The best!" />
                                <FormControlLabel data-checked={radioValue === 'worst'} value="worst" control={<Radio color="primary" />} label="The worst." />
                            </RadioGroup>
                        </div>
                    </div>
                    <div className="row mt-5 mb-3">
                        <div className="col text-right">
                            <Button variant="outlinedPrimary" className="mr-3">
                                Previous
                            </Button>
                            <Button variant="contained" color="primary">
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(LayoutStyles)(Home);
