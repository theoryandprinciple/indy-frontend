/* eslint quote-props: 0 */
import React, { useState } from 'react';
import { SaveFlow } from '../../../utils/flow-api';
import { useFlowDataContext } from '../../../utils/flow-provider';

const Header = () => {
    const { localFlowData, updateRemoteFlowData } = useFlowDataContext();
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    const save = () => {
        SaveFlow(localFlowData);
    };
    return (
        <div>
            {error ? (<span>{errorMsg}</span>) : null}
            {error === false ? (<span>success</span>) : null}
            <button type="button" onClick={save}>Save</button>
            <button type="button" onClick={updateRemoteFlowData}>Load Stuff</button>
        </div>
    );
};

export default Header;
