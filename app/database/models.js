import User from '../server/models/User';

export default function(bookshelf) {
    User.register(bookshelf);
}