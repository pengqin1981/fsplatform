define([
     "dojo/_base/lang",
     "dojo/hash",
     "dojo/io-query"
 ], function(lang, hash, ioQuery) {
    var appstate = {
        updateState: function(obj) {
            var obj = obj || {};
            if (window.location.href.indexOf("?") >= 0) {
                //obj = ioQuery.queryToObject(window.location.href.split("#")[1]); 
            }
            hash(ioQuery.objectToQuery(obj));
        },
        KEYS: {
            'TAB': "t",
            'PRODUCTS': "products"
        }
    };
    return appstate;
 });

