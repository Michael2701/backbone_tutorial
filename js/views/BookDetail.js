app.views.BookDetail = Backbone.View.extend({
    template: _.template($('script.book-detail').html()),
    initialize: function(){
        this.listenTo(this.model, 'change', this.render);
    },
    render: function(){
        var info = this.model.get('volumeInfo');
        var images = info.imageLinks;

        this.$el.html(this.template({
            info,
            images
        }));
        return this;
    }
});