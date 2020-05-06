/* eslint quote-props: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { SaveFlow } from '../../../wiring/flow-api';
import { useFlowDataContext } from '../../../wiring/flow-provider';

import Styles from './styles';

const SectionHeader = ({ classes }) => {
    const { localFlowData } = useFlowDataContext();

    const save = () => {
        SaveFlow(localFlowData);
        // return value should carry errors/error messages
    };
    return (
        <section className={classes.wrapper}>
            <div className="container" style={{ height: '100%' }}>
                <div className="row align-items-center" style={{ height: '100%' }}>
                    <div className="col align-items-center">
                        <Typography variant="h1">Question Flow</Typography>
                    </div>
                    <div className="col align-items-center text-right">
                        <Button variant="outlined" color="primary" style={{ marginRight: 15, height: 42, width: 100 }}>
                            Preview
                        </Button>
                        <Button variant="contained" color="primary" onClick={save} disableElevation style={{ height: 42, width: 100 }}>
                            Save
                        </Button>
                        {/*
                            <Button variant="contained" color="primary" onClick={updateRemoteFlowData}>
                                Load Stuff
                            </Button>
                        */}
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
