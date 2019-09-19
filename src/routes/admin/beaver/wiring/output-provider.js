/* eslint quote-props: 0 */
import React, {
    createContext,
    useState,
    useContext,
} from 'react';

export const OutputDataContext = createContext(null);

const SampleOutputData = [
    {
        'id': '85ff9e7d-ac4f-4ac7-800c-3aceb91c97fa',
        'type': 'email',
        'visiblity': 'published',
        'lastUpdated': '(date here)',
        'title': 'Engagement Email',
        'emailContent': {
            'shortDescription': '',
            'longDescription': '',
            'emailAddress': 'info@info.com',
            'emailBody': '<p>tester</p>',
        },
    },
    {
        'id': '85ff9e7d-ac4f-4ac7-801c-3aceb91c97fa',
        'type': 'email',
        'visiblity': 'published',
        'lastUpdated': '(date here)',
        'title': 'Follow-up Email',
        'emailContent': {
            'shortDescription': '',
            'longDescription': '',
            'emailAddress': 'info@info.com',
            'emailBody': '<p>tester</p>',
        },
    },
    {
        'id': '85ff9e7d-ac4f-4ac7-802c-3aceb91c97fa',
        'type': 'content',
        'visiblity': 'published',
        'lastUpdated': '(date here)',
        'title': 'Best Practices',
        'emailContent': {
            'shortDescription': 'Best Practices',
            'website': 'http://google.com',
            'content': '<p>tester</p>',
        },
    },
];

// used in flow-builder/componets/section-wrapper
const OutputDataProvider = (props) => {
    const [remoteOutputData, setRemoteOutputData] = useState(SampleOutputData);


    const updateRemoteOutputData = () => {
        setRemoteOutputData(SampleOutputData);
    };

    return (
        <OutputDataContext.Provider
            value={{
                remoteOutputData,
                updateRemoteOutputData,
            }}
            {...props}
        />
    );
};

export const useOutputDataContext = () => useContext(OutputDataContext);


export default OutputDataProvider;
