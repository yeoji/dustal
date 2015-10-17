import {getCallCode} from "./SmsService";
import secrets from "../../config/secrets";
import crypto from "crypto";
import Chance from "chance";

const chance = new Chance();

const verifyReq = (req) => {
    // verify req against token
    if(!req.query.key || (req.query.key != secrets.twilioHandlerKey)) return false;

    // verify req signature
    let handlerUrl = "https://" + req.headers.host + req.url;

    Object.keys(req.body).sort().forEach((key) => {
        handlerUrl += key;
        handlerUrl += req.body[key];
    });
    // hash with authtoken
    const hash = crypto.createHmac('sha1', secrets.twilioAuthToken).update(handlerUrl).digest('base64');
    return hash == req.headers['X-Twilio-Signature'];
};

const parseSms = (req) => {
    return new Promise((resolve, reject) => {

        // verify the req is sent from twilio
        if(!verifyReq(req)) {
            reject({message: 'Not sent by twilio.'});
            return;
        }

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

/**
 * Randomly assign a number from our available pool to a blog
 */
const assignNumber = () => {
    // this will do for now, might move to another file if pool gets large
    const availableNumbers = ['+15878033122'];
    const index = chance.natural({min: 0, max: (availableNumbers.length-1)});

    return availableNumbers[index];
};

export default {
    receiveSms: parseSms,
    assignBlogNumber: assignNumber
}