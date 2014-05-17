define("router", [
    'jquery',
    'underscore',
    'configuration',
    'utilities',    
    'app/views/desktop/home',
    'app/views/desktop/signup',
    'app/views/desktop/accessibility',
    'text!../templates/desktop/main.html'
],function ($,
            _,
            config,
            utilities,
            HomeView,
            SignupView,
            AccessibilityView,
            MainTemplate) {

    $(document).ready(new function() {
       utilities.applyTemplate($('body'), MainTemplate)
    })

    var vent = _.extend({}, Backbone.Events);
    /**
     * The Router class contains all the routes within the application -
     * i.e. URLs and the actions that will be taken as a result.
     *
     * @type {Router}
     */

    var Router = Backbone.Router.extend({
        initialize: function() {
            //Begin dispatching routes
            vent.bind('place_selected', this.accessibility, this);

            Backbone.history.start();
        },
        //TODO Remember 404 route
        routes : {
            "": "home",
            "signup": "signup",
            "newplace": "newplace",
            "access": "access",
        },
        
        // default route
        home : function () {
            utilities.viewManager.showView(new HomeView({el:$("#content")}));
        },

        // signup route
        signup : function() {
            utilities.viewManager.showView(new SignupView({el:$("#content")}));
        },

        // accessibility route
        access: function(place) {
            utilities.viewManager.showView(new AccessibilityView({
                el:$("#content"),
                vent: vent}));           
        }
    });

    // Create a router instance
    var router = new Router();

    return router;
});