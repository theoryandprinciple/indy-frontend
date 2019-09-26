import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { find } from 'lodash';
import update from 'immutability-helper';
import { useLocation, useHistory } from 'react-router-dom';

import { useOutputDataContext } from '../../../wiring/output-provider';
// import { SaveOutput } from '../../../wiring/output-api';
import GetParameterByName from '../../../../../../utils/get-param';
import IdGenerator from '../../../wiring/unique-id-generator';

import Header from '../header';
import Styles from './styles';

import EmailBuilder from './email';
import ContentBuilder from './content';

const OutputBuilderCreate = ({ classes }) => {
    const { remoteOutputData, updateRemoteOutputData } = useOutputDataContext();
    const location = useLocation();
    const history = useHistory();

    const [values, setValues] = useState({});

    useEffect(() => {
        // used by existing outputs that are being edited
        const incomingId = GetParameterByName('id', location.search);

        // updated to indicate we are creating a new output
        const incomingType = GetParameterByName('type', location.search);

        if (incomingId) {
            const selectedOutput = find(remoteOutputData, ['id', incomingId]);
            if (selectedOutput) {
                setValues(selectedOutput);
            } else {
                // return to sender, we got nothing to build off.
                history.push('/admin/output-builder');
            }
        } else if (incomingType) {
            setValues({ type: incomingType, id: IdGenerator() });
        } else {
            // return to sender, we got nothing to build off.
            history.push('/admin/output-builder');
        }
    }, [location, remoteOutputData]);

    const handleChange = name => (event) => {
        setValues({ ...values, [name]: event.target.value });
    };

    const saveOutput = () => {
        // SaveOutput(values);

        // fake the save a new item
        const selectedOutput = find(remoteOutputData, ['id', values.id]);
        const elementPos = remoteOutputData.map(x => x.id).indexOf(values.id);
        if (selectedOutput) {
            const temp = update(remoteOutputData, { [elementPos]: { $set: values } });
            updateRemoteOutputData(temp);
        } else {
            const temp = update(remoteOutputData, { $push: [values] });
            updateRemoteOutputData(temp);
            history.push(`create?id=${values.id}`);
        }
        // return value should carry errors/error messages
    };

    const goBack = () => history.push('/admin/output-builder');

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
};

export default withStyles(Styles)(OutputBuilderCreate);
