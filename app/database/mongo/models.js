import fs from "fs";

export default function (mongoose) {

    // autoregister the models
    const modelsDir = __dirname + '/models/';
    const files = fs.readdirSync(modelsDir);

    for (var file of files) {
        const model = require(modelsDir + file);
        model.register(mongoose);
    }

}