import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import history from '../../../../../../wiring/history';
import { useOutputDataContext } from '../../../wiring/output-provider';
import IconList from '../../../wiring/icon-list';

import CreateDialog from './dialog';

import Styles from './styles';

const OutputBuilderDashboard = ({ classes }) => {
    const { remoteOutputData } = useOutputDataContext();
    const [filteredResult, setFilteredResults] = useState([]);
    const [filter, setFilter] = useState('all');

    const editOutput = (id) => {
        history.push(`output-builder/create?id=${id}`);
    };
    const filterResults = (type) => {
        if (type === 'all') {
            setFilteredResults(remoteOutputData);
        } else {
            const result = remoteOutputData.filter(obj => obj.type === type);
            setFilteredResults(result);
        }
        setFilter(type);
    };

    useEffect(() => {
        setFilteredResults(remoteOutputData);
    }, [remoteOutputData]);

    return (
        <div className={`container ${classes.wrapper}`}>
            <CreateDialog />
            <div className="row">
                <div className="col-3">
                    <div className={classes.filterWrapper}>
                        <button className={`${filter === 'all' && classes.filterBtnActive} ${classes.filterBtn}`} type="button" onClick={() => filterResults('all')}>All</button>
                        <button className={`${filter === 'email' && classes.filterBtnActive} ${classes.filterBtn}`} type="button" onClick={() => filterResults('email')}>Email</button>
                        <button className={`${filter === 'content' && classes.filterBtnActive} ${classes.filterBtn}`} type="button" onClick={() => filterResults('content')}>Content</button>
                    </div>
                </div>
                <div className="col-9">
                    {filteredResult && (
                        filteredResult.map(output => (
                            <button
                                type="button"
                                key={output.id}
                                onClick={() => editOutput(output.id)}
                                className={`${classes.outputBlockWrapper} ${classes.dashboardOutputBlockWrapper}`}
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
