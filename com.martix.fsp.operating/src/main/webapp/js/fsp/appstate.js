define([
     "dojo/_base/lang",
     "dojo/topic",
     "dojo/hash",
     "dojo/io-query"
 ], function(lang, topic, hash, ioQuery) {

    var state = "";

    topic.subscribe("/dojo/hashchange", function(changedHash) {
        if (state !== changedHash) {
            state = changedHash;
            topic.publish("/fsp/restore-state", ioQuery.queryToObject(changedHash));
        }
    });

    var appstate = {
        getState: function() {
            return ioQuery.queryToObject(state);
        },
        setState: function(obj) {
            var obj = obj || {};
            state = ioQuery.objectToQuery(obj);
            hash(state);
        },
        keys: {
            'TAB': "tab",
            'DASHBOARD': "dashboard",
            'PRODUCTS': "products",
            'PRODUCT_ADD': "product_add",
            'USERS': "users",
            'USER_ADD': "user_add"
        }
    };
    return appstate;
 });

