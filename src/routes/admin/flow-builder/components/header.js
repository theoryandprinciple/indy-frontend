/* eslint quote-props: 0 */
import React, { useState } from 'react';
import { SaveFlow } from '../wiring/flow-api';
import { useFlowDataContext } from '../wiring/flow-provider';

const Header = () => {
    const { localFlowData, updateRemoteFlowData } = useFlowDataContext();
    const [error, setError] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);


    const save = () => {
        SaveFlow(localFlowData);
        // return value should carry errors/error messages
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
