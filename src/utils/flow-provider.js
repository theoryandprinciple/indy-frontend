/* eslint quote-props: 0 */
import React, {
    createContext,
    useState,
    useEffect,
    useContext,
} from 'react';

export const FlowDataContext = createContext(null);

const SampleFlowData = {
    'id': 0,
    'title': 'flow title',
    'sections': [
        {
            'title': 'section title',
            'id': 0,
            'contents': [{
                'title': 'Title of question',
                'id': 0,
                'type': 'question',
                'questionType': 'Radio Question',
                'validation': {
                    'required': false,
                    'email': true,
                },
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
                'variableName': 'donuts',
                'showDescription': true,
                'descrition': 'this is my long description',
            },
            {
                'title': 'Are Dogs Cool?',
                'id': 1,
                'type': 'question',
                'questionType': 'Checkbox Question',
                'validation': {
                    'required': false,
                    'email': true,
                },
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
                'variableName': 'pizza',
                'showDescription': true,
                'descrition': 'this is my long description',
            }],
        },
        {
            'title': 'section title 2',
            'id': 1,
            'contents': [{
                'title': 'question 1 title',
                'id': 0,
                'type': 'question',
                'questionType': 'Radio Question',
                'validation': {
                    'required': false,
                    'email': true,
                },
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
                'variableName': 'donuts',
                'showDescription': true,
                'descrition': 'this is my long description',
            },
            {
                'title': 'question 2 title',
                'id': 1,
                'type': 'question',
                'questionType': 'Checkbox Question',
                'validation': {
                    'required': false,
                    'email': true,
                },
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
                'variableName': 'pizza',
                'showDescription': true,
                'descrition': 'this is my long description',
            }],
        },
    ],
};

const FlowDataProvider = (props) => {
    const [localFlowData, setLocalFlowData] = useState([]);
    const [remoteFlowData, setRemoteFlowData] = useState(SampleFlowData);

    useEffect(() => {
        setLocalFlowData(remoteFlowData);
    }, [remoteFlowData]);

    useEffect(() => {
    }, [localFlowData]);

    const updateLocalFlowData = newFlowData => setLocalFlowData(newFlowData);
    // const updateRemoteFlowData = newFlowData => setRemoteFlowData(newFlowData);

    return <FlowDataContext.Provider value={{ localFlowData, remoteFlowData, updateLocalFlowData }} {...props} />;
};

export const useFlowDataContext = () => useContext(FlowDataContext);

export default FlowDataProvider;
