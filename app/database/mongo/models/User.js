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
                number: {type: String, default: ''},
                is_verified: {type: Boolean, default: false},
                verification_code: {type: String}
            },
            blogs: {type: [mongoose.Schema.Types.ObjectId], ref: 'Blog'},
            profile_img: {type: String, default: ''}
        });

        UserSchema.virtual('id').get(function () {
            return this._id;
        });

        UserSchema.set('toJSON', {virtuals: true});
        UserSchema.set('toObject', {virtuals: true});

        mongoose.model('User', UserSchema);
    }
}