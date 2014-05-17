/**
 * SelectPlace view
 */
define([
    'utilities',
    'underscore',
    'app/models/place',
    'app/views/desktop/selectplace',
    'app/views/desktop/placeinfo',
    'app/views/desktop/accessinput',
    'text!../../../../templates/desktop/accessibility.html'
], function (utilities, _, PlaceModel, SelectPlaceView, PlaceInfoView, AccessibilityInputView, AccessibilityTemplate) {
    var AccessbilityView = Backbone.View.extend({
        initialize: function(options){
            console.log("AccessbilityView");
            this.vent = options.vent;

            utilities.applyTemplate($(this.el), AccessibilityTemplate,{});
            this.selectPlaceView = new SelectPlaceView({
                el: $("#selectplace-container"),
                vent: options.vent
            });

            this.placeInfoView = new PlaceInfoView({
                el: $('#placeinfo-container'),
                vent: options.vent
            });

            this.accessInputView = new AccessibilityInputView({
                el: $('#access-container'),
                vent: options.vent
            });
        },
    });

    return AccessbilityView;
});