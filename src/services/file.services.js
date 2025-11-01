import path from 'path';
import { fileURLToPath } from 'url';

// Vì ES module không có __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadSingleFile = async (fileObject) => {
    const uploadDir = path.join(__dirname, '../../public/images');
    const exName = path.extname(fileObject.name);
    const baseName = path.basename(fileObject.name, exName);
    const finalName = `${baseName}-${Date.now()}${exName}`;
    const finalPath = path.join(uploadDir, finalName);

    try {
        await fileObject.mv(finalPath);
        return {
            status: 'success',
            path: `/images/${finalName}`,
            fileName: finalName,
            error: null
        };
    } catch (error) {
        console.error('check error', error);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(error)
        };
    }
};

export const uploadMultipleFile = async (filesArr) => {
    try {
        const uploadDir = path.join(__dirname, '../../public/images');
        const resultArr = [];
        let countSuccess = 0;

        for (let i = 0; i < filesArr.length; i++) {
            const exName = path.extname(filesArr[i].name);
            const baseName = path.basename(filesArr[i].name, exName);
            const finalName = `${baseName}-${Date.now()}-${i}${exName}`;
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
            countSuccess,
            countFailed: filesArr.length - countSuccess,
            total: filesArr.length,
            detail: resultArr
        };
    } catch (error) {
        console.error('Upload multiple error:', error);
        return {
            countSuccess: 0,
            countFailed: 0,
            total: 0,
            detail: [],
            error: 'Lỗi khi upload files'
        };
    }
};
