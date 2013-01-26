define([
    "dojo/_base/declare", // declare
    "dojo/dom-class",
    "dijit/form/Button",
    "dijit/layout/StackController"
], function(declare, domClass, Button, StackController){

    return declare("fsp.widget.BreadCrumb", [StackController], {
        baseClass: "",
        buttonWidget: Button, 

        onSelectChild: function(/*dijit/_WidgetBase*/ page) {
            this.inherited(arguments);
            page.controlButton.set('disabled', true);
        }
    });
});
