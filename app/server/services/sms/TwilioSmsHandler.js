const parseSms = (req) => {
    return new Promise((resolve, reject) => {
        // NOTE: this is for testing the logging of sms from twilio
        resolve('test');
        // match post to blog
        req.db.repositories.UserRepository.findByMobileNo(req.body.from, req.db.connection)
            .then((user) => {
                for(var blog of user.blogs) {
                    if(blog.assigned_no == req.body.to) {
                        // create a new post for the matched blog
                        const post = {
                            blog_id: blog._id,
                            user: user._id,
                            message: req.body.body
                        };
                        req.db.repositories.PostRepository.create(post, req.db.connection)
                            .then((post) => {
                                resolve(post);
                            })
                            .catch((err) => {
                                reject(err);
                            });

                        break;
                    }
                }
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    receiveSms: parseSms
}