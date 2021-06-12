app.routes.Router =  Backbone.Router.extend({
    routes: {
        'categories/:id/book/:bookId': 'book',
        'categories/:id': 'category',
        '': 'home',
        '*default': 'unknown'
    },
    home: function(){
        console.log('Home');
    },
    category: function(id){
        console.log("category "+id);
        app.data.books = new app.models.Books(null, {catId: id});

        this._cleanupCurrentView();
        app.data.currentView = new app.views.BookList({
            collection: app.data.books
        });

        this._activateBooksListPanel();
        $('div[data-id=books-list]').html(app.data.currentView.$el)
        app.data.books.fetch({reset: true});
    },
    book: function(id, bookId){
        app.data.book = new app.models.Book({id: bookId});

        this._cleanupCurrentView();
        app.data.currentView = new app.views.BookDetail({
            model: app.data.book
        });
        
        this._activateBookDetailPanel();
        $('div[data-id=book]').html(app.data.currentView.$el);

        app.data.book.fetch();
    },
    unknown: function(){
        console.log("Unknown route...");
    },

    _activateBooksListPanel: function(){
        $('div[data-id=books-wrapper] .is-visible').removeClass('is-visible');
        $('div[data-id=books-list]').addClass('is-visible');
    },
    _activateBookDetailPanel: function(){
        $('div[data-id=books-wrapper] .is-visible').removeClass('is-visible');
        $('div[data-id=book]').addClass('is-visible');
    },
    _cleanupCurrentView: function(){
        if(this.currentView){
            this.currentView.remove();
            this.currentView = null;
        } 
    }
});