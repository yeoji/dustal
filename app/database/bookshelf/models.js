import User from './models/User';

export default function(bookshelf) {
    User.register(bookshelf);
}