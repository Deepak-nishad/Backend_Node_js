
const File = require("../models/fileUpload");
const cloudinary = require("cloudinary").v2;


exports.localfileUpload = async (req, res) => {
    try {
        const file = await req.files.file;
        // const file = req.files.file;

        // let path = __dirname + "/files" + Date.now();
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path, (err) => {
            console.log(err ?? path);
        })

        res.json({
            success: true,
            message: "Local file upload suuucessfuly"
        })


    } catch (error) {
        console.log("Not able to upload file on server");
        console.log(error);
    }
}


function isFileTypeSupported(type, supportedType) {
    return supportedType.includes(type);
}

async function uploadFileToCloudnary(file, folder, quality) {


    try {
        const options = { folder }

        if (quality) {
            options.quality = quality;
        }
        options.resource_type = "auto";
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error(error);
    }
}


exports.imageUpload = async (req, res) => {
    try {

        const { name, email, tags } = req.body;

        console.log(name, email, tags);

        const file = req.files.imageFile;
        const supportedType = ["jpg", "jpeg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "file Type not supported"
            })
        }


        const response = await uploadFileToCloudnary(file, "FileData");
        // save entry to db
        const data = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            data: data,
            message: " file upload suucessfuly on cloudinary"
        })


    } catch (error) {
        console.log("Not able to upload file");
        console.log(error);
    }
}

exports.videoUpload = async (req, res) => {
    try {

        const { name, email, tags } = req.body;

        console.log(name, email, tags);



        const file = req.files.videoFile;
        const supportedType = ["mp4", "mov"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType);

        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "file Type not supported"
            })
        }

        const response = await uploadFileToCloudnary(file, "FileData");
        // save entry to db
        const data = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            data: data,
            message: " video upload suucessfuly on cloudinary"
        })


    } catch (error) {
        console.error("error");
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

exports.imageReducer = async (req, res) => {
    try {

        const { name, email, tags } = req.body;

        console.log(name, email, tags);



        const file = req.files.imageFile;
        const supportedType = ["jpg", "jpeg", "png"];

        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("file type", fileType);

        if (!isFileTypeSupported(fileType, supportedType)) {
            return res.status(400).json({
                success: false,
                message: "file Type not supported"
            })
        }

        const response = await uploadFileToCloudnary(file, "FileData", 30);
        console.log(response);
        // save entry to db
        const data = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        })
        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: " image upload suucessfuly on cloudinary"
        })


    } catch (error) {
        console.error("error");
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        })
    }
}
