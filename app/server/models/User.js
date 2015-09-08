export default class User {

    static register(bookshelf) {
        bookshelf.models.User = bookshelf.Model.extend({
            tableName: 'users',
            idAttribute: 'id'
        });
        bookshelf.models.Users = bookshelf.Collection.extend({
            model: bookshelf.models.User
        });
    }
}