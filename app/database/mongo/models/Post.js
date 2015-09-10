export default class Post {
    static register(mongoose) {
        let PostSchema = new mongoose.Schema({
            blog_id: mongoose.Schema.Types.ObjectId,
            user_id: mongoose.Schema.Types.ObjectId,
            message: {type: String, default: ''},
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