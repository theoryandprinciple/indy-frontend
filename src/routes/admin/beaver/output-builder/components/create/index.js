import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import Header from '../header';
import Styles from './styles';

const OutputBuilderCreate = ({ classes }) => {
    const [values, setValues] = useState({
        title: '',
        description: '',
    });

    const handleChange = name => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className={classes.wrapper}>
                            <TextField
                                fullWidth
                                placeholder="Type your title here"
                                className={classes.inputLabel}
                                value={values.title}
                                onChange={handleChange('title')}
                            />

                            <TextField
                                fullWidth
                                placeholder="Add a description here..."
                                multiline
                                rows="4"
                                className={classes.inputLabel}
                                value={values.description}
                                onChange={handleChange('description')}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

OutputBuilderCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(OutputBuilderCreate);
