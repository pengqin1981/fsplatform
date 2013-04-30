define([
    "dojo/_base/declare",
    "dijit/layout/BorderContainer",
    "dijit/layout/TabContainer",
    "dijit/layout/ContentPane",
    "fsp/layout/Header",
    "fsp/layout/Navigator"
], function(
    declare, BorderContainer, TabContainer, ContentPane, Header, Navigator) {
 
    return declare([], {
        startup: function() {
         // create the BorderContainer and attach it to our appLayout div
            var appLayout = new BorderContainer({
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
            appLayout.addChild(
                new ContentPane({
                    region: "center",
                    id: "fsp-stacks",
                    content: "Sidebar content (Body)",
                    splitter: true
                })
            );
            // start up and do layout
            appLayout.startup();
        }
    });
 
});