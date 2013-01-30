/*globals JSTACK:false */
/*jshint forin:false */
define([
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/string",
    "dojo/topic",
    "dijit/layout/ContentPane",
    "dojo/store/Memory",
    "gridx/Grid",
    "fsp/appstate",
    "fsp/layout/product/New"
], function(
    array, declare, lang, str, topic,
    ContentPane, Memory, Grid,
    appstate, CreateProductPane
) {

    var subst = str.substitute, keys = appstate.keys;

    return declare("fsp.layout.Products", [ContentPane], {
        title: "产品",
        stack: null,

        getState: function() {
            var state = {};
            state[keys.TAB] = keys.PRODUCTS;
            return state;
        },

        restoreState: function() {
            if (appstate.getState()[keys.PRODUCT_ADD]) {
                this.onCreate();
            }
        },

        startup: function() {
            this.inherited(arguments);
            var store = new Memory({
                data: [
                    { id: 1, name: 'John', score: 130, city: 'New York', birthday: '1980/2/5'},
                    { id: 2, name: 'Alice', score: 123, city: 'Washington', birthday: '1984/3/7'},
                    { id: 3, name: 'Lee', score: 149, city: 'Shanghai', birthday: '1986/10/8'},
                    { id: 4, name: 'Mike', score: 100, city: 'London', birthday: '1988/8/12'},
                    { id: 5, name: 'Tom', score: 89, city: 'San Francisco', birthday: '1990/1/21'}
                ]
            });
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
