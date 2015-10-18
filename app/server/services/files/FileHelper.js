import Jimp from "jimp";

/**
 * This function resizes an image to the specified dimensions
 * and crops it at the center of the image
 * @param path - refers to the path to the file
 * @param width
 * @param height
 */
export const resizeCrop = (path, width, height) => {
    const img = new Jimp(path, function (err, image) {
        // this is the image
        this.resize(width,height)
            .write(path);
    });
};

