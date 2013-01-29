/*globals JSTACK:false */
/*jshint forin:false */
define([
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/string",
    "dojo/topic",
    "dijit/layout/ContentPane",
    "fsp/appstate",
], function(
    array, declare, lang, str, topic, ContentPane, appstate
) {

    var subst = str.substitute;

    return declare("fsp.layout.Dashboard", [ContentPane], {
        title: "首页",
        stack: null,

        getState: function() {
            var state = {}, keys = appstate.keys;
            state[keys.TAB] = keys.DASHBOARD;
            return state;
        },

        startup: function() {
            this.inherited(arguments);
            this.set('content', "Dashboard");
        }
    });
});
