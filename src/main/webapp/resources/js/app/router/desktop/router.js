define("router", [
    'jquery',
    'underscore',
    'configuration',
    'utilities',    
    'app/views/desktop/home',
    'app/views/desktop/signup',
    'app/views/desktop/accessibility',
    'app/views/desktop/manager',
    'text!../templates/desktop/main.html'
],function ($,
            _,
            config,
            utilities,
            HomeView,
            SignupView,
            AccessibilityView,
            ManagerView,
            MainTemplate) {

    $(document).ready(new function() {
       utilities.applyTemplate($('#body-content'), MainTemplate);
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
            "manager": "manager",
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
        },

        // manager route
        manager: function() {
            console.log("ManagerView");
            utilities.viewManager.showView(new ManagerView({el:$("#content")}));
        },
    });

    // Create a router instance
    var router = new Router();

    return router;
});