const Course = require("../models/Course");
const Tags = require("../models/tags");
const User = require("../models/User");

const { uploadImageToCloudinary } = require("../utils/imageUploader")

exports.createCourse = async (req, res) => {

    try {
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;

        const thumbnail = req.files.thumbnailImage;

        if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag) {
            return res.status(400).json({
                success: false,
                message: "All the field are required",
            })
        }

        const userId = req.user.id;
        const instructureDetils = await User.findById(userId);
        console.log(instructureDetils);

        if (!instructureDetils) {
            return res.status(400).json({
                success: false,
                message: "Instructor details mot found"
            })
        }

        const tagDetails = await Tags.findById(tag);

        if (!tagDetails) {
            return res.status(400).json({
                success: false,
                message: "Tag details are not found",
            })
        }

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructureDetils._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        })

        //    add the new course of the user schema of the instructure 

        await User.findByIdAndUpdate({ _id: instructureDetils._id }, { $push: { courses: newCourse.id } }, { new: true },);

        // update tag schema homework

        return res.status(200).json({
            success: true,
            message: "Course created successfully",
            data: newCourse,
        })


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "failed to create the course",
            error: error.message,
        })
    }


}

exports.getAllCourse = async (req, res) => {

    try {



    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "cannot fetch all the course",
            error: error.message,
        })
    }
}