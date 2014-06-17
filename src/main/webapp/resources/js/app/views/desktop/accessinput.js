/**
 * SelectPlace view
 */
define([
    'utilities',
    'underscore',
    'text!../../../../templates/desktop/accessinput.html'
], function (utilities, _, AccessInputTemplate) {
    var config = {
        ADD_NEW_PLACE_URL : "http://raynavdb-ngohgia.rhcloud.com/rayplaces?query=add_place",
    };

    var vent;
    var place;
    var inputFields;

    var AccessInputView = Backbone.View.extend({
        initialize: function(options){
            //console.log(options.location);
            vent = options.vent;

            //TODO update the inputFields according to category
            inputFields = ["greetings", "warnings", "staff-assistance", "restroom", "extra-access-input"];

            utilities.applyTemplate($(this.el), AccessInputTemplate,{});
            options.vent.bind('select_place', this.updatePlaceAccessInputs, this);
        },

        events : {
            "click button[id=submit-place-btn]" : "submitAccessInfo"
        },

        updatePlaceAccessInputs: function(data){
            place = data;
            var accessInfo = place.accessinfo;
            console.log(accessInfo);

            for (var i= 0; i< accessInfo.length; i++){
                var info = accessInfo[i];

                for (key in info){
                    console.log(key);
                    var input = $('#' + key);

                    if (input.length){
                        input.val(info[key]);
                    }
                }
            }
            //place = data;
        },

        submitAccessInfo: function(e){
            e.preventDefault();
            $("#submit-place-btn").addClass('disabled');
            $("#submit-place-btn").html("Processing");
            var accessInput = [];

            for (var i= 0; i< inputFields.length; i++){
                var info = {};
                info[inputFields[i]] = $('#' + inputFields[i]).val();
                accessInput.push(info);
            };

            this.submitPlaceToServer(accessInput);
        },

        submitPlaceToServer: function(accessInput){
            $('#loading').show();

            console.log(place);
            var placeJSON = {};
            placeJSON.uid = "";         //TODO CHANGE THIS
            placeJSON.created_by = "";  // May be obsolete
            placeJSON.id = place.ray_id;
            placeJSON.google_id = place.google_id;
            placeJSON.google_ref = place.google_ref;
            placeJSON.foursquare_id = place.foursquare_id;
            placeJSON.categories = place.placeinfo.categories;
            placeJSON.phone = place.placeinfo.phone;
            placeJSON.address = place.placeinfo.address;
            placeJSON.lat = place.lat;
            placeJSON.lng = place.lng;
            placeJSON.ispublic = true;      // TODO

            placeJSON.name = $('#place-name-input').val();
            placeJSON.address = $('#place-address-input').val();     // Change this on the server
            placeJSON.access_info = accessInput;
            console.log(JSON.stringify(placeJSON));

            //tmp = {"uid":"","created_by":"","id":"","google_id":"fb75644fc894f25ee0197bc57c30067e5798df1a","google_ref":"CnRvAAAAOwC7dQTwgWxCf4hSJDPg9rqqwx4mXfG3HDUQQ1ZW4zq66APdG66NFbL0hir8AuI85qY67JIWboMDjhO6aCmghU1PuDrR-QuR6JrGCMw0LS5FKRcdOiFPuHHQyETE3QVRwnGmHkbCl6PGhC_z-WnPhRIQfC2WqxieWp55fWjEw8uM9RoUg16P7zlcLndD9ibwHM0wZ0VVptM","foursquare_id":"","type":"establishment","phone":"+972 3-575-5622","lat":32.08415,"lng":34.80135100000007,"ispublic":true,"name":"Alim yerukim","address":"Tuval St 23, Ramat Gan, Israel","access_info":"accessInput"};

            var request = $.ajax({
                url: config.ADD_NEW_PLACE_URL,
                type: 'POST',
                contentType: 'application/json; charset=UTF-8',
                dataType: 'text',
                success: function (data) {
                    console.log("Data added successfully");
                },
                data: JSON.stringify(placeJSON),
            });
            
            request.done(function(data){
                $("#submit-place-btn").removeClass('disabled');
                $("#submit-place-btn").html("Submit");

                $('#loading').hide('400');
                $('#new_place_name_alert').text(placeJSON.name);
                $('html,body').animate({
                    scrollTop: $('.accessibility-container').offset().top - 50},
                400);
                $('#new_place_added_alert').show('fast').delay(5000).slideUp('slow');
            });
        },
    });

    return AccessInputView;
});