define([
    'utilities',
    'gmap',
    'app/models/place',
    'text!../../../../templates/desktop/placesearchbar.html'
], function(utilities, GoogleMap, PlaceModel, PlaceSearchBarTemplate){
    var PlaceSearchBarView = Backbone.View.extend({

        initialize: function(options){
            utilities.applyTemplate($(this.el), PlaceSearchBarTemplate,{});
            var rayPlace = new PlaceModel();
            this.vent = options.vent;
            
            this.input = $('#place-search-input')[0];

            autocomplete = new google.maps.places.Autocomplete(this.input);
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                place = autocomplete.getPlace();
                if (!place.geometry) {
                  if (!$('#submit-place-btn').hasClass('disabled'))
                    $('#submit-place-btn').addClass('disabled');
                  return;
                }

                //console.log(place.geometry.location.lat() + ", " + place.geometry.location.lng());
                rayPlace.address = place.formatted_address;

                rayPlace.lat = place.geometry.location.lat();
                rayPlace.lng = place.geometry.location.lng();
                //console.log("search: " + this.address + ", " + this.lat + ", " + this.lng);

                options.vent.trigger('location_selected', rayPlace);
            });
        },

        render: function(){

        },

        events : {
            "keypress #place-search-input": "stop_submission",
        },

        stop_submission : function(e){
            if (e.keyCode == 13){
                e.preventDefault();
                e.stopPropagation();
            }
        }, 
    });

    return PlaceSearchBarView;
});