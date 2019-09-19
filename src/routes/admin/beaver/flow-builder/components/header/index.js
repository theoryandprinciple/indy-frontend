/* eslint quote-props: 0 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { SaveFlow } from '../../../wiring/flow-api';
import { useFlowDataContext } from '../../../wiring/flow-provider';

import Styles from './styles';

const SectionHeader = ({ classes }) => {
    const { localFlowData, updateRemoteFlowData } = useFlowDataContext();
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const save = () => {
        SaveFlow(localFlowData);
        // return value should carry errors/error messages
    };
    return (
        <section className={classes.wrapper}>
            <div className="container" style={{ height: '100%' }}>
                <div className="row align-items-center" style={{ height: '100%' }}>
                    <div className="col align-items-center">
                        <Typography variant="h4">Question Flow</Typography>
                    </div>
                    <div className="col align-items-center text-right">
                        {error ? (<span>{errorMsg}</span>) : null}
                        {error === false ? (<span>success</span>) : null}
                        <button type="button" onClick={save}>Save</button>
                        <button type="button" onClick={updateRemoteFlowData}>Load Stuff</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

SectionHeader.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(SectionHeader);
