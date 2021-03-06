/**
 * Created by alanyu on 20/10/2015.
 */
import AWS from 'aws-sdk';
import multer from "multer";
import tokenHelper from "../tokenHelper";
import RESTRoutes from "./RESTRoutes";

export default class s3Routes extends RESTRoutes {

    constructor() {
        super();
    }

    // overrides the routes generation in RESTRoutes
    generateRoutes() {
        /**
         * We'll never need to list all posts, therefore index is not required
         * We'll never need to show a specific post, therefore show is not required
         * Create, delete routes needs to be overridden to check that the user owns the blog
         * We're not allowing editing of posts?
         */
        const apiRouter = super.generateRoutes({
            index: false,
            show: false,
            create: false,
            update: false,
            delete: false
        });

        var storage = multer.memoryStorage();

        const upload = multer({
            storage: storage,
            fileFilter: function(req, file, cb) {
                const allowed = ['image/png', 'image/jpg', 'image/jpeg'];
                if(allowed.indexOf(file.mimetype) >= 0) {
                    cb(null, true);
                } else {
                    cb(null, false);
                }
            },
            limits: {
                fileSize: '1000000'
            }
        });

        apiRouter.post('/upload', tokenHelper.verifyToken, upload.single('profile'), (req, res) => {

            const s3baseUrl = 'https://s3.amazonaws.com/dustal/';
            const filename = res.locals.user.username + '.' + req.file.originalname.split('.')[1];
            const s3 = new AWS.S3();

            s3.putObject({
                Bucket: 'dustal',
                Key: filename,
                Body: req.file.buffer,
                ACL: 'public-read'
            }, function (err, data) {
                if (err){
                    throw err;
                }
                else{
                    const imgUrl = s3baseUrl + filename;
                    console.log(imgUrl);

                    // store link in user document
                    req.db.repositories.UserRepository.update(res.locals.user._id, {profile_img: imgUrl}, req.db.connection)
                        .then((raw) => {
                            return res.status(200).json({
                                error: false,
                                message: 'Image upload completed!',
                                location: imgUrl
                            });
                        })
                        .catch((err) => {
                            return res.status(500).json({
                                error: true,
                                message: 'Could not upload image'
                            });
                        });
                }
            });


        });

        return apiRouter;
    }

}
