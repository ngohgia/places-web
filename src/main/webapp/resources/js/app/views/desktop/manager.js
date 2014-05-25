/**
 * Home view
 */
define([
    'utilities',
    'app/views/desktop/manager/recordslog',
    'app/views/desktop/manager/logs',
    'text!../../../../templates/desktop/manager.html'
], function (utilities, RecordsLogView, LogsView, ManagerTemplate) {

    var ManagerView = Backbone.View.extend({
        render:function () {
            utilities.applyTemplate($(this.el),ManagerTemplate,{});
            this.recordsLogView = new RecordsLogView({el: $('#tab-content')});
            this.logsView = new LogsView({el: $('#tab-content')});

            $("li[id='view_logs']").trigger('click');
            return this;
        },

        events: {
            "click li[id='view_logs']" : "viewLogs",
            "click li[id='view_records']" : "viewRecords",
        },

        viewLogs: function(e) {
            e.preventDefault();

            $(".logger-nav li.active").removeClass('active');
            $(e.target).parent().addClass('active');
            $('#tab-content').empty();

            this.logsView.render();
        },

        viewRecords: function(e) {
            e.preventDefault();

            $(".logger-nav li.active").removeClass('active');
            $(e.target).parent().addClass('active');
            $('#tab-content').empty();

            this.recordsLogView.render();
        }
    });

    return ManagerView;
});