define([
    "dojo/_base/declare",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Application.html",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom",
    "dojo/query",
    "dojo/dom-attr",
    "dojo/NodeList-dom",
    "dijit/layout/StackContainer",
    "fsp/auth",
    "fsp/layout/Dashboard",
    "fsp/layout/Products"
], function(
    declare, _WidgetBase, _TemplatedMixin, template,
    lang, on, dom, query, domAttr, nodeList, StackContainer, 
    auth, DashboardPane, ProductsPane) {
 
    return declare([_WidgetBase, _TemplatedMixin], {

        templateString: template,

        tabs: {},

        postCreate: function() {
            var that = this;

            this.inherited(arguments);

            if (!auth.isAuthorized()) {
                this.onLogout();
                return;
            }

            setTimeout(function() {
                that.init();
            }, 100);
        },

        init: function() {
            this.attachEvent();
            this.initStack();
        },

        initStack: function() {
            var stack = this.stack = new StackContainer({
                style: "height: 100%; width: 100%;",
            }, "stack");
            stack.startup();
            this.switchTab("dashboard", DashboardPane);
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

        switchTab: function(name, pane) {
            var tab = this.tabs[name];
            if (!tab) {
                tab = new pane();
                this.tabs[name] = tab;
                this.stack.addChild(tab);
            }
            this.stack.selectChild(tab);
        },
 
        onDashborad: function() {
            this.switchTab("dashboard", DashboardPane);
        },

        onProducts: function() {
            this.switchTab("products", ProductsPane);
        },

        onProfile: function() {
            console.info('show profile!');
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