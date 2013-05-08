require([
     "dbootstrap",
     "dojo/dom",
     "dojo/ready",
     "fsp/Application"
 ], function(dbootstrap, dom, ready, Application) {
    ready(function() {
        var application = new Application({}, "fsp");
        application.startup();
    });
 });