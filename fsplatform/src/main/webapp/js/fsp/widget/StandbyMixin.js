define([
    'dojo/_base/declare',
    'dojo/dom-construct',
    'dojox/widget/Standby'
], function(
    declare, domConstr, Standby) {

    return declare("fsp.widget.StandbyMixin", null, {
        buildRendering: function() {
            this.inherited(arguments);
            this.standby = new Standby({
                target: this.standbyNode || this.domNode,
                color: '#fdfdfd',
                duration: 0,
                image: "images/loading.gif"
            }, domConstr.create("div", {}, document.body));
            this.standby.startup();
        }
    });
});
