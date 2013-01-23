require([
     "dojo/dom",
     "dojo/ready",
     "fsp/Application"
 ], function(dom, ready, Application) {
    ready(function() {
        var application = new Application();
        application.placeAt(dom.byId('fsp'));
    });
 });