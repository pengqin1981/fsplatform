define([
    "dojo/_base/declare",
    "dojo/_base/window",
    "dijit/registry",
    "dojo/topic",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/dom",
    "dojo/query",
    "dojo/dom-attr",
    "dojo/NodeList-dom",
    "dojo/hash",
    "dojo/io-query",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Application.html",
    "dijit/layout/BorderContainer",
    "dijit/layout/StackContainer",
    "dojox/widget/Toaster",
    "fsp/widget/BreadCrumb",
    "fsp/auth",
    "fsp/layout/Dashboard",
    "fsp/layout/Products"
], function(
    declare, win, registry, topic, lang, on, dom, query, domAttr, nodeList, 
    hash, ioQuery,
    _WidgetBase, _TemplatedMixin, template, BorderContainer, StackContainer, 
    Toaster, BreadCrumb,
    auth, DashboardPane, ProductsPane) {
 
    return declare([_WidgetBase, _TemplatedMixin], {

        templateString: template,
        tabs: {},

        buildRendering: function() {
            var that = this;

            this.inherited(arguments);

            if (!auth.isAuthorized()) {
                this.onLogout();
                return;
            }

            setTimeout(lang.hitch(this, "init"), 0);
        },

        init: function() {
            this.attachEvent();
            this.initStack();
            this.initMessager();
            topic.subscribe("/fsp/restore-state", lang.hitch(this, "restoreState"));
            if (hash()) {
                this.restoreState(ioQuery.queryToObject(hash()));
            } else {
                this.switchTab("products", ProductsPane);
                //this.switchTab("dashboard", DashboardPane)
            }
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

        initStack: function() {
            var controller, stack;

            stack = this.stack = new StackContainer({
                style: "height: 100%; width: 100%;"
            }, "stack");
            stack.startup();
        },

        switchTab: function(name, pane, restore) {
            var tab = this.tabs[name+"Tab"],
                innerStack, controller, pane, created = true;

            if (!tab) {
                tab = this.tabs[name+"Tab"] = new BorderContainer({
                    gutters: false,
                    style: "height: 100%; width: 100%;"
                });

                innerStack = new StackContainer({
                    style: "height: 100%; width: 100%;",
                    region: 'center'
                });
                innerStack.addChild(new pane({
                    stack: innerStack
                }));
                tab.set('stack', innerStack);
                tab.addChild(innerStack);

                controller = new BreadCrumb({
                    containerId: innerStack.get('id'),
                    region: 'top'
                });
                tab.addChild(controller);
                tab.set('breadcrumb', controller);
 
                this.stack.addChild(tab);

                created = false;
            }

            this.stack.selectChild(tab);

            if (created && tab.get("breadcrumb")) {
                if (restore !== true) {
                    tab.get("breadcrumb").updateState();
                } else {
                    var panes = tab.get("stack").getChildren(), firspage;
                    if (panes.length > 0) {
                        firspage = panes[0];
                        tab.get("stack").selectChild(firspage);
                        if (firspage && firspage.restoreState) {
                            firspage.restoreState();
                        }
                    }
                }
            }
        },
 
        restoreState: function(state) {
            switch(state.tab) {
            case 'dashboard':
                this.switchTab("dashboard", DashboardPane, true);
            break;
            case 'products':
                this.switchTab("products", ProductsPane, true);
            break;
            default:
            }
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
        },

        initMessager: function() {
            var toaster = new Toaster({
                positionDirection: "br-up",
                duration: 3500
            });
            toaster.placeAt(win.body());

            function publishMessage(message, type) {
                toaster.setContent(message, type);
                toaster.show();
            }
            topic.subscribe("error-message", function(message) {
                publishMessage(message, "error");
            });
            topic.subscribe("warning-message", function(message) {
                publishMessage(message, "warning");
            });
            topic.subscribe("success-message", function(message) {
                publishMessage(message, "success");
            });
            topic.subscribe("info-message", function(message) {
                publishMessage(message, "info");
            });
        }
    });
 
});