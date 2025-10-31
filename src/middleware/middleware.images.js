// middleware/uploadValidation.js
const validateImageUpload = (req, res, next) => {
    // Kiểm tra có file không
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            EC: 1,
            message: 'No files were uploaded.'
        });
    }
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];

    // Hàm validate một file
    const validateFile = (file) => {
        // Kiểm tra mimetype
        if (!allowedTypes.includes(file.mimetype)) {
            return {
                isValid: false,
                message: 'Chỉ cho phép file PNG hoặc JPG'
            };
        }

        // Kiểm tra extension
        const fileName = file.name.toLowerCase();
        const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));

        if (!hasValidExtension) {
            return {
                isValid: false,
                message: 'Chỉ cho phép đuôi .png hoặc .jpg'
            };
        }

        return { isValid: true };
    };
    // Validate file(s)
    const files = req.files.image;
    const filesToValidate = Array.isArray(files) ? files : [files];

    for (const file of filesToValidate) {
        const validation = validateFile(file);
        if (!validation.isValid) {
            return res.status(400).json({
                EC: 1,
                message: validation.message
            });
        }
    }

    // Nếu pass hết validation thì next()
    next();
};

module.exports = { validateImageUpload };