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
    "fsp/appstate",
    "dijit/Toolbar",
    "dijit/form/Button"
], function(
    array, declare, lang, str, topic,
    ContentPane, TemplatedMixin, WidgetsInTemplateMixin, template, StandbyMixin,
    nlsCommon, appstate
) {

    var subst = str.substitute;

    return declare("fsp.layout.user.New", [
        ContentPane, TemplatedMixin, WidgetsInTemplateMixin, StandbyMixin
    ], {
        title: "新增用户",
        stack: null,
        nls: nlsCommon,
        templateString: template,

        getState: function() {
            var state = {}, keys = appstate.keys;
            state[keys.USER_ADD] = 1;
            return state;
        },

        onCreate: function() {
            var that = this;
            this.standby.show();
            setTimeout(function() {
                that.standby.hide();
                topic.publish("success-message", "新增成功!");
            }, 3000);
        },

        onCancel: function() {
            this.stack.removeChild(this);
        }
    });
});
