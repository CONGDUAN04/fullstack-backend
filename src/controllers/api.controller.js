const User = require("../models/user")
const { uploadSingleFile, uploadMultipleFile } = require("../services/file.services")
const getUsersAPI = async (req, res) => {
    const results = await User.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}
const postCreateUserAPI = async (req, res) => {
    const { email, name, city } = req.body
    const user = await User.create({
        email, name, city
    })
    return res.status(200).json({
        errorCode: 0,
        data: user
    })
}
const putUpdateUserAPI = async (req, res) => {
    const userId = req.body.userId;
    const { email, name, city } = req.body;
    const user = await User.updateOne({ _id: userId }, { email, name, city });
    return res.status(200).json({
        errorCode: 0,
        data: user
    });
}
const deleteUserAPI = async (req, res) => {
    const id = req.body.userId
    const results = await User.deleteOne({ _id: id });
    return res.status(200).json({
        errorCode: 0,
        data: results
    });
}
// const postUploadSingleFileAPI = async (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     const file = req.files.image;
//     const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
//     if (!allowedTypes.includes(file.mimetype)) {
//         return res.status(400).json({
//             EC: 1,
//             message: 'Chỉ cho phép file PNG hoặc JPG'
//         });
//     }
//     const fileName = file.name.toLowerCase();
//     if (!fileName.endsWith('.png') && !fileName.endsWith('.jpg') && !fileName.endsWith('.jpeg')) {
//         return res.status(400).json({
//             EC: 1,
//             message: 'Chỉ cho phép đuôi .png hoặc .jpg'
//         });
//     }
//     const results = await uploadSingleFile(file);
//     return res.status(200).json({
//         EC: 0,
//         data: results
//     });
// }
// const postUploadMultipleFilesAPI = async (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//         return res.status(400).send('No files were uploaded.');
//     }
//     if (Array.isArray(req.files.image)) {
//         //upload multiple file
//         const result = await uploadMultipleFile(req.files.image);
//         return res.status(200).json({
//             EC: 0,
//             data: result
//         })
//     } else {
//         return await postUploadSingleFileAPI(req, res)
//     }

// }
// controller/uploadController.js
const postUploadSingleFileAPI = async (req, res) => {
    // Không cần validate nữa, middleware đã làm rồi
    const file = req.files.image;
    const results = await uploadSingleFile(file);

    return res.status(200).json({
        EC: 0,
        data: results
    });
};

const postUploadMultipleFilesAPI = async (req, res) => {
    // Không cần validate nữa
    if (Array.isArray(req.files.image)) {
        const result = await uploadMultipleFile(req.files.image);
        return res.status(200).json({
            EC: 0,
            data: result
        });
    } else {
        return await postUploadSingleFileAPI(req, res);
    }
};
module.exports = {
    getUsersAPI, postCreateUserAPI, putUpdateUserAPI, deleteUserAPI, postUploadSingleFileAPI, postUploadMultipleFilesAPI
}