/*globals JSTACK:false */
/*jshint forin:false */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dijit/layout/ContentPane",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/text!./templates/Navigator.html',
    "dijit/layout/AccordionContainer"
], function(
    declare, lang, on,
    ContentPane, TemplatedMixin, WidgetsInTemplateMixin, template,
    AccordionContainer) {


    return declare("fsp.layout.Navigator", [ContentPane, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        
        postCreate: function() {
            var aContainer = new AccordionContainer({style:"height: 100%"}, this.navNode);
            aContainer.addChild(new ContentPane({
                title:"OA任务",
                content:"模板管理菜单"
            }));
            aContainer.addChild(new ContentPane({
                title:"模板管理",
                content:"模板管理菜单"
            }));
            aContainer.addChild(new ContentPane({
                title:"系统管理",
                content:"系统管理菜单"
            }));
            aContainer.startup();
        }
    });
});
