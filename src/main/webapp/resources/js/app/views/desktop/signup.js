/**
 * Singup view
 */
define([
    'utilities',
    'text!../../../../templates/desktop/signup.html'
], function (utilities, SignupTemplate) {

    var SignupView = Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el), SignupTemplate,{});
            return this;
        },

        events: {
        	"click .ray_home_btn": "go_to_ray_home",
            "click .create-acc-btn": "create_acc",
            "focus input": "reset_input"
        },

        go_to_ray_home: function(event) {
            window.location.href="http://www.project-ray.com";	
        },

        create_acc: function(event) {
            event.preventDefault();
            
            if ($("#input-password").val() != $("#input-repassword").val()){
                $("#input-password").addClass("has-error");
                $("#input-password").append(
                    '<span class="glyphicon glyphicon-remove form-control-feedback"></span>');

                $("#input-repassword").addClass("has-error");
                $("#input-repassword").append(
                    '<span class="glyphicon glyphicon-remove form-control-feedback"></span>');

                $("#error-msg-container").empty();
                $("#error-msg-container").append(
                    '<div class="alert alert-danger">Your passwords do not match</div>')
            }

            $('input').each(function(){
                if ($(this).val() == ""){
                    var parent = $(this).parents('.form-group');
                    console.log(parent);
                    $(parent).addClass("has-error");
                    $(parent).append(
                        '<span class="glyphicon glyphicon-remove form-control-feedback"></span>');

                    if ($("#error-msg-container").children('.alert').length == 0){
                        $("#error-msg-container").empty();
                        $("#error-msg-container").append(
                            '<div class="alert alert-danger">Please fill in all the fields</div>')
                    }
                }
            });
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

    });

    return SignupView;
});