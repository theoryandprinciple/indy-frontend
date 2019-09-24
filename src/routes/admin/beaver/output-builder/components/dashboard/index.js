import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
// import { filter } from 'lodash';

import history from '../../../../../../wiring/history';
import { useOutputDataContext } from '../../../wiring/output-provider';
import IconList from '../../../wiring/icon-list';

import Styles from './styles';

const OutputBuilderDashboard = ({ classes }) => {
    const { remoteOutputData } = useOutputDataContext();
    const [filteredResult, setFilteredResults] = useState([]);

    const editOutput = (id) => {
        history.push(`output-builder/create?id=${id}`);
    };
    const filter = (type) => {
        const result = remoteOutputData.filter(obj => obj.type === type);
        setFilteredResults(result);
    };

    useEffect(() => {
        setFilteredResults(remoteOutputData);
    }, [remoteOutputData]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <div className={classes.wrapper}>
                        <p>list area</p>
                        <button type="button" onClick={() => filter('email')}>Email</button>
                    </div>
                </div>
                <div className="col-9">
                    {filteredResult && (
                        filteredResult.map(output => (
                            <button
                                type="button"
                                key={output.id}
                                onClick={() => editOutput(output.id)}
                                className={classes.outputBlockWrapper}
                            >
                                <div className={classes.outputBlockHeader}>
                                    <div className={`${classes.elementIconWrapper} ${classes.elementOutputIcon}`}>
                                        {IconList[output.type]}
                                    </div>
                                    <Typography variant="body1">{output.type}</Typography>
                                </div>
                                <div className={classes.outputBlockBody}>
                                    <Typography variant="body1">{output.title}</Typography>
                                </div>
                            </button>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

OutputBuilderDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(OutputBuilderDashboard);
