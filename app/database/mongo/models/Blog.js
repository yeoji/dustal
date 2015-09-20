export default class Blog {
    static register(mongoose) {
        let BlogSchema = new mongoose.Schema({
            name: {type: String, default: ''},
            user_ids: [mongoose.Schema.Types.ObjectId],
            post_ids: [mongoose.Schema.Types.ObjectId],
            created_at: { type: Date, default: Date.now },
            private: {type: Boolean, default: false},
            password: {type: String, default: ''},
            assigned_no: {type: String, default: ''}
        });

        BlogSchema.virtual('id').get(function () {
            return this._id;
        });

        BlogSchema.virtual('shared').get(function() {
            return (this.user_ids.length > 1);
        });

        BlogSchema.set('toJSON', {virtuals: true});
        BlogSchema.set('toObject', {virtuals: true});

        mongoose.model('Blog', BlogSchema);
    }
}