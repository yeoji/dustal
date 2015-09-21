export default class Comment {
    static register(mongoose) {
        let CommentSchema = new mongoose.Schema({
            user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            message: {type: String, default: ''},
            timestamp: {type: Date, default: Date.now}
        });

        CommentSchema.virtual('id').get(function () {
            return this._id;
        });

        CommentSchema.set('toJSON', {virtuals: true});
        CommentSchema.set('toObject', {virtuals: true});

        mongoose.model('Comment', CommentSchema);
    }
}