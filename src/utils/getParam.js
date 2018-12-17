// used to pull parameter values out of the url
// pass it the parameter you want, and the url

const getParameterByName = (name, url) => {

    if (!url){
        url = window.location.href;
    }
    name = name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results){
        return null;
    }
    if (!results[2]){
        return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
};

export default getParameterByName
