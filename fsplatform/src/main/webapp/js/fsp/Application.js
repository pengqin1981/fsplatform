define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Application.html",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/query",
    "dojo/dom-attr",
    "dojo/NodeList-dom",
    "fsp/auth"
], function(
    declare, _WidgetBase, _TemplatedMixin, template,
    lang, on, query, domAttr, nodeList,
    auth) {
 
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,

        postCreate: function() {
            var that = this;

            if (!auth.isAuthorized()) {
                this.onLogout();
                return;
            }

            setTimeout(function() {
                that.attachEvent();
            }, 100);
        },

        attachEvent: function() {
            var that = this;
            query("a[data-fsp-attach-event]").forEach(function(node) {
                on(node, 'click',
                   lang.hitch(
                       that, 
                       domAttr.get(node, "data-fsp-attach-event").split(":")[1]
                   )
                );
            });
        },

        onDashborad: function() {
            console.info('show dashboard');
        },

        onProducts: function() {
            console.info('show products');
        },

        onProfile: function() {
            console.info('show profile');
        },

        onAbout: function() {
            console.info('show about');
        },

        onLogout: function() {
            auth.unauthenciate();
            window.location.href = "./login.htm";
        }
    });
 
});