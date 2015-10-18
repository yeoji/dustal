import express from "express";
import multer from "multer";
import tokenHelper from "./tokenHelper";
import { resizeCrop } from "../services/files/FileHelper";
import fs from "fs";
const uploadRouter = express.Router();

const baseStoragePath = __dirname + '/../../../storage/uploads';
const storage = multer.diskStorage({
    destination: baseStoragePath,
    filename: function (req, file, cb) {
        if(!fs.existsSync(baseStoragePath + '/' + req.params.username)) {
            fs.mkdirSync(baseStoragePath + '/' + req.params.username);
        }
        cb(null, req.params.username + '/' + file.originalname);
    }
});

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

/*******************
 *  Upload Routes  *
 *******************/

// uploading profile picture
uploadRouter.post('/profile/:username', tokenHelper.verifyToken, upload.single('profile'), (req, res) => {
    // resize the photo and crop
    resizeCrop(req.file.path, 150, 150);

    req.db.repositories.UserRepository.update(res.locals.user._id, {profile_img: req.file.filename}, req.db.connection)
        .then((raw) => {
            return res.status(200).json({
                error: false,
                message: 'Image upload completed!',
                path: req.file.filename
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