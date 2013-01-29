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
    "fsp/layout/product/New"
], function(
    array, declare, lang, str, topic, ContentPane, appstate, CreateProductPane
) {

    var subst = str.substitute;

    return declare("fsp.layout.Products", [ContentPane], {
        title: "产品",
        stack: null,

        startup: function() {
            appstate.updateState({t: appstate.KEYS.PRODUCTS});
            this.inherited(arguments);
            this.set('content', "Product");
            setTimeout(lang.hitch(this, "onCreate"), 1000);
        },

        onCreate: function() {
            var stack = this.stack,
                tab = new CreateProductPane({
                    stack: stack
                });
            stack.addChild(tab);
            stack.selectChild(tab);
        }
    });
});
