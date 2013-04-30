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
    "dijit/layout/AccordionContainer",
    "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel",
    "dijit/Tree"
], function(
    declare, lang, on,
    ContentPane, TemplatedMixin, WidgetsInTemplateMixin, template,
    AccordionContainer, Memory, ObjectStoreModel, Tree) {


    return declare("fsp.layout.Navigator", [ContentPane, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        aContainer: null,
        postCreate: function() {
            var aContainer;
            aContainer = this.aContainer = new AccordionContainer({style:"height: 100%"}, this.navNode);
            
            this.addOALinks();
            aContainer.addChild(new ContentPane({
                title:"模板管理",
                content:"模板管理菜单"
            }));
            aContainer.addChild(new ContentPane({
                title:"系统管理",
                content:"系统管理菜单"
            }));
            aContainer.startup();
        },

        addOALinks: function() {
            var oaStore, oaModel, oaPane, oaTree;

            oaStore = new Memory({
                data: [
                    { id: 'root', name:'常用功能', link: ""},
                    { id: 'task', name:'代办任务', link: "", parent: 'root'}
                ],
                getChildren: function(object){
                    return this.query({parent: object.id});
                }
            });

            oaModel = new ObjectStoreModel({
                store: oaStore,
                query: {id: 'root'}
            });

            oaPane = new ContentPane({
                title:"OA任务"
            });

            oaTree = new Tree({
                model: oaModel,
                onClick: lang.hitch(this, this.onClick)
            });

            this.aContainer.addChild(oaPane);

            setTimeout(function() {
                oaPane.set("content", oaTree);
            }, 500);
        },

        onClick: function(item) {
            console.info(item);
        }
    });
});
