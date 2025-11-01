// middleware/uploadValidation.js
const validateImageUpload = (req, res, next) => {
    const allowedMimeTypes = ['image/png', 'image/jpeg'];
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
    if (!req.files || !req.files.image) {
        return res.status(400).json({
            ErrorCode: 1,
            message: 'Không có file nào được upload.'
        });
    }
    const uploadedFiles = Array.isArray(req.files.image)
        ? req.files.image
        : [req.files.image];
    const isFileValid = (file) => {
        const { mimetype, name } = file;
        const lowerName = name.toLowerCase();
        const validMime = allowedMimeTypes.includes(mimetype);
        const validExt = allowedExtensions.some(ext => lowerName.endsWith(ext));
        if (!validMime) {
            return 'Chỉ cho phép file PNG hoặc JPG.';
        }
        if (!validExt) {
            return 'Chỉ cho phép đuôi .png hoặc .jpg/.jpeg.';
        }
        return null;
    };

    for (const file of uploadedFiles) {
        const errorMessage = isFileValid(file);
        if (errorMessage) {
            return res.status(400).json({
                ErrorCode: 1,
                message: errorMessage
            });
        }
    }
    next();
};
module.exports = { validateImageUpload };
