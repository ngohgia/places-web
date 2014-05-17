/**
 * SelectPlace view
 */
define([
    'utilities',
    'underscore',
    'text!../../../../templates/desktop/accessinput.html'
], function (utilities, _, AccessInputTemplate) {
    var AccessInputView = Backbone.View.extend({
        initialize: function(options){
            //console.log(options.location);
            this.vent = options.vent;
            this.place = options.place;

            utilities.applyTemplate($(this.el), AccessInputTemplate,{});
        },
    });

    return AccessInputView;
});