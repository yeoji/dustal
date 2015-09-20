import morgan from "morgan";
import fs from "fs";

export default function(app) {

    morgan.token('errmsg', function getErrMsg(req, res) {
        return JSON.stringify(res.locals);
    });

    morgan.token('reqdata', function getReqData(req) {
        return JSON.stringify(req.body);
    });

    // make the log format
    const format = ':date :method :url :status :errmsg :reqdata';

    // create a write stream (in append mode)
    const logStream = fs.createWriteStream(__dirname + '/../logs/error.log', {flags: 'a'});

    // setup the logger
    app.use(morgan(format, {
        skip: function (req, res) {
            return false;
            //return res.statusCode < 400
        },
        stream: logStream
    }));

}