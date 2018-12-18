export default (namespace, obj) => {
    return Object.keys(obj).reduce((collector, key) => {
        collector[key] = `${namespace}/${key}`
        return collector
    }, {})
}
