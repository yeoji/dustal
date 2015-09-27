export default class Post {
    static register(mongoose) {
        let PostSchema = new mongoose.Schema({
            blog_id: mongoose.Schema.Types.ObjectId,
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            message: {type: String, default: ''},
            comments: {type: [mongoose.Schema.Types.ObjectId], ref: 'Comment', default: []},
            timestamp: {type: Date, default: Date.now}
        });

        PostSchema.virtual('id').get(function () {
            return this._id;
        });

        PostSchema.set('toJSON', {virtuals: true});
        PostSchema.set('toObject', {virtuals: true});

        mongoose.model('Post', PostSchema);
    }
}