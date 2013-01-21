define([], function() {
    var fsp, getBasePrefix, getApiPrefix, getUnsecuredPrefix;

    getBasePrefix = function() {
        return window.location.href.slice(0, window.location.href.lastIndexOf("/"));
    };
    
    getApiPrefix = function() {
        return getBasePrefix + "/api";
    };

    getUnsecuredPrefix = function() {
        return getBasePrefix() + "/unsecured/api";
    };
    
    fsp = {
        version: '1.0',
        getBasePrefix: getBasePrefix,
        getApiPrefix: getApiPrefix,
        getUnsecuredPrefix: getUnsecuredPrefix
    };

    return fsp;
});
