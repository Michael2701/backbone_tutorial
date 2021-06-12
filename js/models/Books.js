app.models.Books = Backbone.Collection.extend({
    initialize: function(models, options){
        this.options = options;
        this.catId = options.catId;
    },
    url: function(){
        return 'api/books_' + this.options.catId + '.json';
    }
});
 