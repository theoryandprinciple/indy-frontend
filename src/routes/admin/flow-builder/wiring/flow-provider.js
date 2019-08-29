/* eslint quote-props: 0 */
// Consider breaking local and remote flow data into two providers
// local will be the most active, and only needs to be exposed to the save button
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
                'advanced': [{
                    'populateDynamically': true,
                }],
                'settings': [{
                    'showDescription': true,
                    'descrition': 'this is my long description',
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                }],
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
            },
            {
                'title': 'Are Dogs Cool?',
                'id': 1,
                'type': 'question',
                'questionType': 'Checkbox Question',
                'advanced': [{
                    'populateDynamically': true,
                }],
                'settings': [{
                    'showDescription': true,
                    'descrition': 'this is my long description',
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                }],
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
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
                'advanced': [{
                    'populateDynamically': true,
                }],
                'settings': [{
                    'showDescription': true,
                    'descrition': 'this is my long description',
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                }],
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title',
                'id': 1,
                'type': 'question',
                'questionType': 'Checkbox Question',
                'advanced': [{
                    'populateDynamically': true,
                }],
                'settings': [{
                    'showDescription': true,
                    'descrition': 'this is my long description',
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                }],
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
            }],
        },
    ],
};
const SampleFlowData2 = {
    'id': 0,
    'title': 'flow title 2',
    'sections': [
        {
            'title': 'section title',
            'id': 0,
            'contents': [{
                'title': 'Title of question',
                'id': 0,
                'type': 'question',
                'questionType': 'Radio Question',
                'advanced': [{
                    'populateDynamically': true,
                }],
                'settings': [{
                    'showDescription': true,
                    'descrition': 'this is my long description',
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                }],
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
            },
            {
                'title': 'Are Dogs Cool?',
                'id': 1,
                'type': 'question',
                'questionType': 'Checkbox Question',
                'advanced': [{
                    'populateDynamically': true,
                }],
                'settings': [{
                    'showDescription': true,
                    'descrition': 'this is my long description',
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                }],
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
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
                'advanced': [{
                    'populateDynamically': true,
                }],
                'settings': [{
                    'showDescription': true,
                    'descrition': 'this is my long description',
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                }],
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
            },
            {
                'title': 'question 2 title',
                'id': 1,
                'type': 'question',
                'questionType': 'Checkbox Question',
                'advanced': [{
                    'populateDynamically': true,
                }],
                'settings': [{
                    'showDescription': true,
                    'descrition': 'this is my long description',
                    'variableName': 'donuts',
                    'validation': {
                        'required': false,
                        'email': true,
                    },
                }],
                'answers': [{
                    'id': 0,
                    'value': 'yes',
                }, {
                    'id': 1,
                    'value': 'no',
                }],
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
        // nothing to do when this updates (yet)
    }, [localFlowData]);

    const updateLocalFlowData = newFlowData => setLocalFlowData(newFlowData);
    const updateRemoteFlowData = () => {
        setRemoteFlowData(SampleFlowData2);
    };

    return (
        <FlowDataContext.Provider
            value={{
                localFlowData,
                remoteFlowData,
                updateLocalFlowData,
                updateRemoteFlowData,
            }}
            {...props}
        />
    );
};

export const useFlowDataContext = () => useContext(FlowDataContext);

export default FlowDataProvider;
