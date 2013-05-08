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
    "fsp/layout/user/New"
], function(
    array, declare, lang, str, topic, ContentPane,
    Grid, Memory, Cache, Focus, Filter, CellWidget, ExtendedSelectedRow,
    SingleSort, RowHeader, IndirectSelect, ColumnResizer, ToolBar,
    Pagination, PaginationBar, Button, appstate, CreateUserPane
) {

    var subst = str.substitute, keys = appstate.keys;

    return declare("fsp.layout.Users", [ContentPane], {
        title: "用户管理",
        stack: null,

        getState: function() {
            var state = {};
            state[keys.TAB] = keys.USERS;
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

        getStore: function() {
            return new Memory({
                data: [
                   { id: 1, name: 'John', score: 130, city: 'New York', birthday: '1980/2/5'},
                   { id: 2, name: 'Alice', score: 123, city: 'Washington', birthday: '1984/3/7'},
                   { id: 3, name: 'Lee', score: 149, city: 'Shanghai', birthday: '1986/10/8'},
                   { id: 4, name: 'Mike', score: 100, city: 'London', birthday: '1988/8/12'},
                   { id: 5, name: 'Tom', score: 89, city: 'San Francisco', birthday: '1990/1/21'}
               ]
            });
        },
        initGrid: function() {
            var structure, grid ;

            structure = [
                { id: 'name', field: 'name', name: '姓名', width: '50%'},
                { id: 'city', field: 'city', name: '所在城市', width: '40%'},
                { id: 'score', field: 'score', name: '绩效评分', width: '10%'}
            ];
            grid = this.grid = Grid({
                cacheClass: Cache,
                store: this.getStore(),
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


        onRefresh: function() {
            var grid = this.grid;
            grid.set("store", null);
            grid.set("store", this.getStore());
        },
 
        onCreate: function() {
            var stack = this.stack,
                tab = new CreateUserPane({
                    stack: stack
                });
            stack.addChild(tab);
            stack.selectChild(tab);
        },

        onDetail: function() {}
    });
});
