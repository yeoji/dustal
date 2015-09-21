import fs from "fs";

export default function(mongoose) {

    // autoregister the models
    const modelsDir = './models/';
    fs.readdir(modelsDir, (err, files) => {
        for (var file of files) {
            const model = require(modelsDir + file);
            model.register(mongoose);
        }
    });

}