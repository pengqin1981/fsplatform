define([], function() {
    var fsp, getBasePrefix, getApiPrefix, getSecuredPrefix;

    getBasePrefix = function() {
        return window.location.href.slice(0, window.location.href.lastIndexOf("/"));
    };
    
    getApiPrefix = function() {
        return getBasePrefix() + "/api";
    };

    getSecuredPrefix = function() {
        return getBasePrefix() + "/secured/api";
    };
    
    fsp = {
        version: '1.0',
        getBasePrefix: getBasePrefix,
        getApiPrefix: getApiPrefix,
        getSecuredPrefix: getSecuredPrefix
    };

    return fsp;
});
