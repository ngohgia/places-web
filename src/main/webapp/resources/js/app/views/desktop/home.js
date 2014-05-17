/**
 * Home view
 */
define([
    'utilities',
    'text!../../../../templates/desktop/home.html'
], function (utilities, HomeTemplate) {

    var HomeView = Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el),HomeTemplate,{});
            return this;
        },

        events: {
        	"click .sign-in-button": "signin",
            "focus input[type=text]": "reset_input",
            "focus input[type=password]": "reset_input",
            "click .new-acc-btn": "go_to_new_acc"
        },

        signin: function(event) {
        	event.preventDefault();
            var input_userid = $("#input-userid");
            var input_password = $("#input-password");

        	if (input_userid.val() == ""){
                $("#userid-form-group").addClass("has-error");
                $("#userid-form-group").append(
                    '<span class="glyphicon glyphicon-remove form-control-feedback"></span>');

                if ($("#error-msg-container").children(".alert").length == 0)
                $("#error-msg-container").append(
                    '<div class="alert alert-danger">Please enter your User ID</div>')
        	}

            if (input_password.val() == ""){
                $("#password-form-group").addClass("has-error");
                $("#password-form-group").append(
                    '<span class="glyphicon glyphicon-remove form-control-feedback"></span>');
                
                if ($("#error-msg-container").children(".alert").length == 0)
                $("#error-msg-container").append(
                    '<div class="alert alert-danger">Please enter your password</div>')
            }
        },

        reset_input: function(event) {
            var cur = $(event.currentTarget);
            var form_group = cur.closest('.form-group');
            if (form_group.hasClass('has-error')) {
                form_group.removeClass('has-error');
                form_group.children('.form-control-feedback').remove();
            }

            $("#error-msg-container").empty();
        },

        go_to_new_acc: function(event) {
            event.preventDefault();

            Backbone.history.navigate('signup', true);
        }
    });

    return HomeView;
});