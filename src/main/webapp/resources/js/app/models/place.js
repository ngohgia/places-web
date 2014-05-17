/**
* Module for the Place model
**/
define([
    'utilities',
], function(utilities){
	var Place = Backbone.Model.extend({
		ray_id : "",
		google_id : "",
		google_ref : "",
		foursquare_id : "",

		lat : 0.0,
		lng : 0.0,

		placeinfo : {},
		accessibility : {},

		updateDetails : function(placeInfo){
			this.placeinfo = placeInfo;
		}
	});

	return Place;
});