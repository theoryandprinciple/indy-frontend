import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { find } from 'lodash';

import history from '../../../../../../wiring/history';
import { useOutputDataContext } from '../../../wiring/output-provider';
import { SaveOutput } from '../../../wiring/output-api';
import GetParameterByName from '../../../../../../utils/get-param';

import Header from '../header';
import Styles from './styles';

import EmailBuilder from './email';
import ContentBuilder from './content';

const OutputBuilderCreate = ({ classes, location }) => {
    const { remoteOutputData } = useOutputDataContext();

    const [values, setValues] = useState({});

    useEffect(() => {
        // used by existing outputs that are being edited
        const incomingId = GetParameterByName('id', location.search);

        // updated to indicate we are creating a new output
        const incomingType = GetParameterByName('type', location.search);

        if (incomingId) {
            const selectedQuestion = find(remoteOutputData, ['id', incomingId]);
            setValues(selectedQuestion);
        } else if (incomingType) {
            setValues({ type: incomingType });
        } else {
            // return to sender, we got nothing to build off.
        }
    }, [location, remoteOutputData]);

    const handleChange = name => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };
    const saveOutput = () => {
        console.log('saving');
        SaveOutput(values);
        // return value should carry errors/error messages
    };

    const goBack = () => history.goBack();

    return (
        <>
            <Header save={saveOutput} cancel={goBack} title={`Output / Add New ${values.type}`} />
            <div className="container">
                <div className="row">
                    <div className="col">
                        {values.type === 'email' && (
                            <EmailBuilder values={values} handleChange={handleChange} />
                        )}
                        {values.type === 'content' && (
                            <ContentBuilder values={values} handleChange={handleChange} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

OutputBuilderCreate.propTypes = {
    classes: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
};

export default withStyles(Styles)(OutputBuilderCreate);
