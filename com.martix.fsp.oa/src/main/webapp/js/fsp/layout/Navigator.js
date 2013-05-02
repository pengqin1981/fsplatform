/*globals JSTACK:false */
/*jshint forin:false */
define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/on",
    "dojo/topic",
    "dijit/layout/ContentPane",
    "dijit/_TemplatedMixin",
    "dijit/_WidgetsInTemplateMixin",
    'dojo/text!./templates/Navigator.html',
    "dijit/layout/AccordionContainer",
    "dojo/store/Memory",
    "dijit/tree/ObjectStoreModel",
    "dijit/Tree"
], function(
    declare, lang, on, topic,
    ContentPane, TemplatedMixin, WidgetsInTemplateMixin, template,
    AccordionContainer, Memory, ObjectStoreModel, Tree) {


    return declare("fsp.layout.Navigator", [ContentPane, TemplatedMixin, WidgetsInTemplateMixin], {
        templateString: template,
        aContainer: null,
        selectedNodes: {},
        postCreate: function() {
            var aContainer;
            aContainer = this.aContainer = new AccordionContainer({style:"height: 100%"}, this.navNode);
            this.addOALinks();
            this.addTempLinks();
            this.addSysLinks();
            aContainer.startup();
        },

        addLinks: function(data, title, root) {
            var pane, store, model, tree;

            pane = new ContentPane({
                title: title
            });

            this.aContainer.addChild(pane);

            if (data.length == 0) { return; }

            store = new Memory({
                data: data,
                getChildren: function(object){
                    return this.query({parent: object.id});
                }
            });

            model = new ObjectStoreModel({
                store: store,
                query: {id: root}
            });

            

            tree = new Tree({
                id: root + '_tree',
                model: model,
                persist: false,
                onClick: lang.hitch(this, this.onClick)
            });

            setTimeout(function() {
                pane.set("content", tree);
            }, 0);
        },

        addOALinks: function() {
            this.addLinks([
               { id: 'oa', name:'常用功能', link: ""},
               { id: 'task', name:'待办任务', link: "fsp/layout/Tasks", parent: 'oa'}
            ], "OA任务", "oa");
        },

        addTempLinks: function() {
            this.addLinks([], "模板管理", 'temp');
        },

        addSysLinks: function() {
            this.addLinks([
               { id: 'sys', name:'系统管理', link: ""},
               { id: 'user', name:'用户管理', link: "fsp/layout/Users", parent: 'sys'}
            ], "系统管理", "sys");
        },

        onClick: function(item, node) {
            var treeId = node.tree.get("id");
            this.selectedNodes[treeId] = node;
            this.clearOtherSelected(treeId);
            if (item.link) {
                topic.publish("/fsplatform/navigator/select", [item]);
            }
        },

        clearOtherSelected: function(currentId) {
            for (var id in this.selectedNodes) {
                if (id !== currentId) {
                    this.selectedNodes[id].setSelected(false);
                }
            }
        }
    });
});
