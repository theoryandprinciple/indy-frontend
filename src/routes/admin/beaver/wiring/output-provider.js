/* eslint quote-props: 0 */
import React, {
    createContext,
    useState,
    useContext,
    useEffect,
} from 'react';

export const OutputDataContext = createContext(null);

const SampleOutputData = [
    {
        'id': '85ff9e7d-ac4f-4ac7-800c-3aceb91c97fa',
        'type': 'email',
        'visiblity': 'published',
        'lastUpdated': '(date here)',
        'title': 'Email Subject Stuffs',
        'emailAddress': 'info@info.com',
        'emailBody': '<p>tester</p>',
    },
    {
        'id': '85ff9e7d-ac4f-4ac7-801c-3aceb91c97fa',
        'type': 'email',
        'visiblity': 'published',
        'lastUpdated': '(date here)',
        'title': 'Email Subject HEre',
        'emailAddress': 'info@info.com',
        'emailBody': '<p>tester</p>',
    },
    {
        'id': '85ff9e7d-ac4f-4ac7-802c-3aceb91c97fa',
        'type': 'content',
        'visiblity': 'published',
        'lastUpdated': '(date here)',
        'title': 'Best Practices',
        'description': 'this is my description',
    },
];

// used in flow-builder/componets/section-wrapper
const OutputDataProvider = (props) => {
    const [remoteOutputData, setRemoteOutputData] = useState(SampleOutputData);

    useEffect(() => {
        // nothing to do when this updates (yet)
        // console.log('remoteOutputData', remoteOutputData);
    }, [remoteOutputData]);

    const updateRemoteOutputData = (values) => {
        setRemoteOutputData(values);
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
