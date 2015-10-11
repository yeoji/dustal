import {getCallCode} from "./SmsService";

const parseSms = (req) => {
    return new Promise((resolve, reject) => {
        // match post to blog
        // remove the country call code from the From number
        const from = req.body.From.slice(getCallCode(req.body.FromCountry).length);
        req.db.repositories.UserRepository.findByMobileNo(req.body.FromCountry, from, req.db.connection)
            .then((user) => {
                for(var blog of user.blogs) {
                    if(blog.assigned_no == req.body.To) {
                        // create a new post for the matched blog
                        const post = {
                            blog_id: blog._id,
                            user: user._id,
                            message: req.body.Body
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