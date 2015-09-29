import express from "express";
import multer from "multer";
import tokenHelper from "./tokenHelper";
const uploadRouter = express.Router();

const storage = multer.diskStorage({
    destination: '/storage/uploads',
    filename: function (req, file, cb) {
        const data = {};
        tokenHelper.verifyToken(req, data, function() {
            cb(null, data.locals.user.username + '/' + file.originalname + '.' + file.extension)
        });
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function(req, file, cb) {
        const allowed = ['png', 'jpg', 'jpeg'];
        if(allowed.indexOf(file.extension) >= 0) {
            cb(null, true);
        }
        cb(null, false);
    },
    limits: {
        fileSize: '1000000'
    }
});

/*******************
 *  Upload Routes  *
 *******************/

// uploading profile picture
uploadRouter.post('/profile', tokenHelper.verifyToken, upload.single('profile'), (req, res) => {
    console.log(req.file);
    req.db.repositories.UserRepository.update(res.locals.user._id, {profile_img: req.file.path}, req.db.connection)
        .then((raw) => {
            return res.status(200).json({
                error: false,
                message: 'Image upload completed!'
            });
        })
        .catch((err) => {
            return res.status(500).json({
                error: true,
                message: 'Could not upload image'
            })
        });
});

export default uploadRouter;