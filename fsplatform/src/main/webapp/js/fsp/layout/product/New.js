/*globals JSTACK:false */
/*jshint forin:false */
define([
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/string",
    "dojo/topic",
    "dijit/layout/ContentPane",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    "dojo/text!./templates/New.html",
    "fsp/widget/StandbyMixin",
    "dojo/i18n!fsp/nls/common",
    "dijit/Toolbar",
    "dijit/form/Button"
], function(
    array, declare, lang, str, topic,
    ContentPane, TemplatedMixin, WidgetsInTemplateMixin, template, StandbyMixin,
    nlsCommon
) {

    var subst = str.substitute;

    return declare("fsp.layout.product.New", [
        ContentPane, TemplatedMixin, WidgetsInTemplateMixin, StandbyMixin
    ], {
        title: "新增产品",
        stack: null,
        nls: nlsCommon,
        templateString: template,

        startup: function() {
            this.inherited(arguments);
        },

        onCreate: function() {
            var that = this;
            this.standby.show();
            setTimeout(function() {
                that.standby.hide();
            }, 3000);
        },

        onCancel: function() {
            this.stack.removeChild(this);
        }
    });
});
