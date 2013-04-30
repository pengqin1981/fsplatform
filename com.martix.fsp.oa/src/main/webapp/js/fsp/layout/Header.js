/*globals JSTACK:false */
/*jshint forin:false */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dijit/layout/ContentPane",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/text!./templates/Header.html'   
], function(declare, lang, on, ContentPane, TemplatedMixin, WidgetsInTemplateMixin, template) {


    return declare("fsp.layout.Header", [ContentPane, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        
        postCreate: function() {
            on(this.profileNode, "click", lang.hitch(this, this.onProfile));
            on(this.aboutNode, "click", lang.hitch(this, this.onAbout))
            on(this.logoutNode, "click", lang.hitch(this, this.onLogout))
        },

        onProfile: function() {
            console.info('show profile');
        },

        onAbout: function() {
            console.info('show about');
        },

        onLogout: function() {
            console.info('logo out');
        }
    });
});
