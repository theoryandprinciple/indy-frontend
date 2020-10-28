import ReactGA from 'react-ga';
import History from '../wiring/history';

const GAUtils = {};
const debug = true;
GAUtils.initGA = () => {
    ReactGA.initialize('UA-126197384-6', {
        debug,
        titleCase: false,
    });
    ReactGA.pageview(window.location.pathname + window.location.search);

    // tell GA everytime the URL changes (includes hashes)
    History.listen(location => ReactGA.pageview(location.pathname + location.search));
};
export default GAUtils;


export const DownloadForm = () => {
    ReactGA.event({
        category: 'letter',
        action: 'download',
    });
};
export const EarlyDownloadForm = () => {
    ReactGA.event({
        category: 'letter',
        action: 'download at signature',
    });
};
