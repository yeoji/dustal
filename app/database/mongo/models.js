import User from './models/User';

export default function(mongoose) {
    User.register(mongoose);
}