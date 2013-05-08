/*globals JSTACK:false */
/*jshint forin:false */
define([
    "dojo/_base/array",
    "dojo/_base/declare",
    "dojo/_base/lang",
    "dojo/string",
    "dojo/topic",
    "dijit/layout/ContentPane",
    "gridx/Grid",
    "dojo/store/Memory",
    "gridx/core/model/cache/Sync",
    "gridx/modules/Focus",
    "gridx/modules/filter/Filter",
    "gridx/modules/CellWidget",
    "gridx/modules/extendedSelect/Row",
    "gridx/modules/SingleSort",
    "gridx/modules/RowHeader",
    "gridx/modules/IndirectSelect",
    "gridx/modules/ColumnResizer",
    "gridx/modules/ToolBar",
    "gridx/modules/pagination/Pagination",
    "gridx/modules/pagination/PaginationBar",
    "dijit/form/Button",
    "fsp/appstate",
    "fsp/layout/task/New"
], function(
    array, declare, lang, str, topic, ContentPane,
    Grid, Memory, Cache, Focus, Filter, CellWidget, ExtendedSelectedRow,
    SingleSort, RowHeader, IndirectSelect, ColumnResizer, ToolBar,
    Pagination, PaginationBar, Button, appstate, CreateTaskPane
) {

    var subst = str.substitute, keys = appstate.keys;

    return declare("fsp.layout.Tasks", [ContentPane], {
        title: "待办任务",
        stack: null,

        getState: function() {
            var state = {};
            state[keys.TAB] = keys.Tasks;
            return state;
        },

        restoreState: function() {
            if (appstate.getState()[keys.USER_ADD]) {
                this.onCreate();
            }
        },

        startup: function() {
            this.inherited(arguments);
            this.initGrid();
        },

        initGrid: function() {
            var store, structure, grid ;

            store = new Memory({
                data: [
                    { id: 1, name: 'John', score: 130, city: 'New York', birthday: '1980/2/5'},
                    { id: 2, name: 'Alice', score: 123, city: 'Washington', birthday: '1984/3/7'},
                    { id: 3, name: 'Lee', score: 149, city: 'Shanghai', birthday: '1986/10/8'},
                    { id: 4, name: 'Mike', score: 100, city: 'London', birthday: '1988/8/12'},
                    { id: 5, name: 'Tom', score: 89, city: 'San Francisco', birthday: '1990/1/21'}
                ]
            });
            structure = [
                { id: 'name', field: 'name', name: 'Name', width: '50%'},
                { id: 'city', field: 'city', name: 'City', width: '40%'},
                { id: 'score', field: 'score', name: 'Score', width: '10%'}
            ];
            grid = Grid({
                cacheClass: Cache,
                store: store,
                structure: structure,
                modules: [
                    Focus, Filter, CellWidget,
                    ExtendedSelectedRow, SingleSort, RowHeader, IndirectSelect,
                    ColumnResizer, ToolBar, Pagination, PaginationBar
                ],
                selectRowTriggerOnCell: true,
                onRowDblClick: lang.hitch(this, this.onDetail)
            });
            this.set('content', grid);

            tb = grid.toolBar.widget;

            // Refresh
            tb.addChild(new Button({
                iconClass: "icon-refresh",
                label: '刷新',
                onClick: lang.hitch(this, "onRefresh")
            }));

            tb.addChild(new Button({
                iconClass: "icon-plus",
                label: '新建',
                onClick: lang.hitch(this, "onCreate")
            }));
        },


        onRefresh: function() {},
 
        onCreate: function() {
            var stack = this.stack,
                tab = new CreateTaskPane({
                    stack: stack
                });
            stack.addChild(tab);
            stack.selectChild(tab);
        },

        onDetail: function() {}
    });
});
