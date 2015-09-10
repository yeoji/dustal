export default class User {
    static register(mongoose) {
        let UserSchema = new mongoose.Schema({
            first_name: {type: String, default: ''},
            last_name: {type: String, default: ''},
            email: {type: String, default: ''},
            password: {type: String, default: ''}
        });

        UserSchema.virtual('id').get(function () {
            return this._id;
        });

        UserSchema.set('toJSON', {virtuals: true});
        UserSchema.set('toObject', {virtuals: true});

        mongoose.model('User', UserSchema);
    }
}