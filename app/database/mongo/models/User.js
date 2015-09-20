export default class User {
    static register(mongoose) {
        let UserSchema = new mongoose.Schema({
            first_name: {type: String, default: ''},
            last_name: {type: String, default: ''},
            username: {type: String, default: '', lowercase: true, trim: true, unique: true},
            email: {type: String, default: ''},
            password: {type: String, default: ''},
            mobile: {
                country_code: {type: String, default: ''},
                number: {type: String, default: ''}
            },
            blogs: {type: [mongoose.Schema.Types.ObjectId], ref: 'Blog'}
        });

        UserSchema.virtual('id').get(function () {
            return this._id;
        });

        UserSchema.set('toJSON', {virtuals: true});
        UserSchema.set('toObject', {virtuals: true});

        mongoose.model('User', UserSchema);
    }
}