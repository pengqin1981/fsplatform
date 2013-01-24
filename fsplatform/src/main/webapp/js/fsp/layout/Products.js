/*globals JSTACK:false */
/*jshint forin:false */
define([
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/string",
    "dojo/topic",
    "dijit/layout/ContentPane"
], function(
    array, declare, lang, str, topic, ContentPane
) {

    var subst = str.substitute;

    return declare("fsp.layout.Products", [ContentPane], {
        title: "",
        parentContainer: null,

        startup: function() {
            this.inherited(arguments);
            this.set('content', "Product");
        }
    });
});