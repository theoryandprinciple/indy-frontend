import ReactGA from 'react-ga';
import History from '../wiring/history';

const GAUtils = {};
const debug = true;
GAUtils.initGA = () => {
    ReactGA.initialize(process.env.REACT_APP_GA, {
        debug,
        titleCase: false,
    });
    ReactGA.pageview(window.location.pathname + window.location.search);

    // tell GA everytime the URL changes (includes hashes)
    History.listen(location => ReactGA.pageview(location.pathname + location.search));
};
export default GAUtils;

export const GAMailForm = () => {
    ReactGA.event({
        category: 'letter',
        action: 'mail',
    });
};

export const GAEmailForm = () => {
    ReactGA.event({
        category: 'letter',
        action: 'email',
    });
};

export const GADownloadForm = () => {
    ReactGA.event({
        category: 'letter',
        action: 'download',
    });
};
export const GAEarlyDownloadForm = () => {
    ReactGA.event({
        category: 'letter',
        action: 'download at signature',
    });
};
