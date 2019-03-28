export default (namespace, obj) => Object.keys(obj).reduce((c, key) => {
    const collector = c;
    collector[key] = `${namespace}/${key}`;
    return collector;
}, {});
