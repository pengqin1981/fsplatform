define([
    "dojo/_base/declare", // declare
    "dojo/dom-class",
    "dojo/dom-style",
    "dijit/layout/StackController",
    "dijit/_WidgetBase",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Crumb.html"
], function(
    declare, domClass, domStyle, 
    StackController, _WidgetBase, _TemplatedMixin, template
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
        pages : [],

        onSelectChild: function(/*dijit/_WidgetBase*/ page) {
            this.inherited(arguments);
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
            var pages = this.pages;
            //remove breadcrumb button
            this.inherited(arguments);
            pages = pages.slice(0, pages.length - 1);
            this._currentChild = pages[pages.length - 1];
            this._currentChild.controlButton.set('divided', false);
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
