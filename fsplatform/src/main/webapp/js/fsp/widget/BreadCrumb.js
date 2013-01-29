define([
    "dojo/_base/declare", // declare
    "dojo/_base/lang",
    "dojo/dom-class",
    "dojo/dom-style",
    "dijit/layout/StackController",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Crumb.html",
    "fsp/appstate"
], function(
    declare, lang, domClass, domStyle, 
    StackController, _WidgetBase, _TemplatedMixin, template, appstate
) {

	var Crumb = declare([_WidgetBase, _TemplatedMixin], {
        templateString: template,
        buildRendering: function(/*Event*/ evt){
            this.inherited(arguments);
            (this.focusNode || this.domNode).setAttribute("role", "tab");
        },
        _setDividedAttr: function(value) {
            domStyle.set(this.divideNode, 'display', value ? '' : 'none');
        }
    });
    StackController.StackButton = Crumb;

    var BreadCrumb = declare("fsp.widget.BreadCrumb", [StackController], {
        idxBaseClass: "breadcrumb",
        buttonWidget: Crumb,
        pages : null,
        state: null,

        postCreate: function() {
            this.inherited(arguments);
            this.pages = [];
            this.state = {};
        },

        updateState: function() {
            appstate.setState(this.state);
        },

        /**
         * Override
         * 
         * @private
         */
        onAddChild: function(/*dijit/_WidgetBase*/ page, /*Integer?*/ insertIndex) {
            var oldButton, button, pages = this.pages;
            if (this._currentChild) {
                oldButton= this.pane2button[this._currentChild.id];
                oldButton.set('divided', true);
            }
            if (page.stack && page.stack.id !== this.containerId) { return; }

            this.inherited(arguments);

            button = this.pane2button[page.id];
            button.set('divided', false);

            pages[pages.length] = page;
        },

        /**
         * Override
         * 
         * @private
         */
        onRemoveChild: function(/*dijit._Widget*/ page) {
            var pages = this.pages, len = pages.length;
            //remove breadcrumb button
            this.inherited(arguments);
            this.pages = pages.slice(0, len - 1);
            this._currentChild = this.pages[this.pages.length - 1];
            if (this._currentChild.controlButton) {
                this._currentChild.controlButton.set('divided', false);
            }
        },

        /**
         * Override
         * 
         * @private
         */
        onSelectChild: function(/*dijit/_WidgetBase*/ page){
            var pages = this.pages, len = pages.length;
            if (page === null) { return; }
            if (pages.length === 0) { return; }

            this.inherited(arguments);

            if (page.getState) {
                if (page.getState()[appstate.keys.TAB]) {
                    this.state = {};
                }
                this.state = lang.mixin(this.state, page.getState() || {});
                appstate.setState(this.state);
            }

            if (page.id === pages[pages.length - 1].id) { return; }

            for (var i = len - 1; i>0; i--) {
                var p = pages[i];
                if (p.id === page.id) {
                    return;
                } else {
                    if (p && p.stack) { p.stack.removeChild(p); }
                }
            }
        }
    });

    return BreadCrumb;
});
