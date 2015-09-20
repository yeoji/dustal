const parseSms = (req) => {
    // do something with what was received
    return new Promise((resolve, reject) => {
        resolve(req);
    });
};

export default {
    receiveSms: parseSms
}