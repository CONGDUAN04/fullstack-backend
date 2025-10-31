const path = require('path');
const uploadSingleFile = async (fileObject) => {
    // Thư mục lưu file
    const uploadDir = path.join(__dirname, '../../public/images');
    // Get image extension
    const exName = path.extname(fileObject.name);
    // Get image name (without extension)
    const baseName = path.basename(fileObject.name, exName);
    // Create final name với timestamp
    const finalName = `${baseName}-${Date.now()}${exName}`;
    // Create final path 
    const finalPath = path.join(uploadDir, finalName);
    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: `/images/${finalName}`,
            fileName: finalName,
            error: null
        }
    } catch (error) {
        console.log("check error", error);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(error)
        }
    }
}
const uploadMultipleFile = async (filesArr) => {
    try {
        // Tạo đường dẫn thư mục
        const uploadDir = path.join(__dirname, '../../public/images');
        const resultArr = [];
        let countSuccess = 0;
        for (let i = 0; i < filesArr.length; i++) {
            // Lấy extension
            const exName = path.extname(filesArr[i].name);
            // Lấy tên file không có extension
            const baseName = path.basename(filesArr[i].name, exName);
            // Tạo tên file với timestamp và index để tránh trùng
            const finalName = `${baseName}-${Date.now()}-${i}${exName}`;
            // Tạo đường dẫn đầy đủ
            const finalPath = path.join(uploadDir, finalName);
            try {
                await filesArr[i].mv(finalPath);
                resultArr.push({
                    status: 'success',
                    path: `/images/${finalName}`,
                    fileName: finalName,
                    originalName: filesArr[i].name,
                    size: filesArr[i].size,
                    error: null
                });
                countSuccess++;
            } catch (error) {
                resultArr.push({
                    status: 'failed',
                    path: null,
                    originalName: filesArr[i].name,
                    error: JSON.stringify(error)
                });
            }
        }
        return {
            countSuccess: countSuccess,
            countFailed: filesArr.length - countSuccess,
            total: filesArr.length,
            detail: resultArr
        };
    } catch (error) {
        console.log("Upload multiple error:", error);
        return {
            countSuccess: 0,
            countFailed: 0,
            total: 0,
            detail: [],
            error: 'Lỗi khi upload files'
        };
    }
}
module.exports = {
    uploadSingleFile,
    uploadMultipleFile
}