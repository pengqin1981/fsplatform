define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/topic",
    "dijit/layout/BorderContainer",
    "dijit/layout/StackContainer",
    "dijit/layout/ContentPane",
    "fsp/layout/Header",
    "fsp/layout/Navigator",
    "fsp/widget/BreadCrumb"
], function(
    declare, lang, topic, 
    BorderContainer, StackContainer, ContentPane, Header, Navigator, BreadCrumb) {
 
    return declare([], {
        stacks: {},
        stacksContainer: null,
        startup: function() {
            var appLayout, stacksContainer;

            // create the BorderContainer and attach it to our appLayout div
            appLayout = new BorderContainer({
                design: "headline"
            }, "fsp");
             
            // create and add the BorderContainer edge regions
            appLayout.addChild(
                new Header({
                    region: "top",
                    id: "fsp-header"
                })
            );
            appLayout.addChild(
                new Navigator({
                    region: "left",
                    id: "fsp-navigator",
                    splitter: true
                })
            );
            stacksContainer = this.stacksContainer = new StackContainer({
                region: "center",
                id: "fsp-stacks",
                splitter: true
            })
            appLayout.addChild(stacksContainer);
            // start up and do layout
            appLayout.startup();
 
            topic.subscribe("/fsplatform/navigator/select", lang.hitch(this, "addOrSelectStack"));
        },
        addOrSelectStack: function(params) {
            var item, stacks = this.stacks, stack;
            if (params && params.length > 0) {
                item = params[0];
                if (stacks[item.id]) {
                    stack = stacks[item.id];
                } else {
                    stack = stacks[item.id] = new BorderContainer({});
                    this.stacksContainer.addChild(stack);

                    stack.containers = new StackContainer({
                        id: item.id + "-stack",
                        region: "center",
                        "class": "paneContainer"
                    });
                    stack.addChild(stack.containers);

                    stack.breadcrumb = new BreadCrumb({
                        containerId: item.id + "-stack",
                        region: 'top',
                        splitter: false
                    });
                    
                    stack.addChild(stack.breadcrumb);

                    require([item.link], function(Pane) {
                        stack.containers.addChild(new Pane({
                            stack: stack.containers
                        }));
                        stack.layout();
                    });
                }
                this.stacksContainer.selectChild(stack);
            }
        }
    });
 
});