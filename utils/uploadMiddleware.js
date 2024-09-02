const multer = require('multer');
const path = require('path');

// Higher-order function to create multer middleware with dynamic storage
function uploadMiddleware(type) {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            let uploadPath = 'uploads/';

            // Use the passed type to determine the folder
            if (type === 'category') {
                uploadPath += 'categories/';
            } else if (type === 'product') {
                uploadPath += 'products/';
            } else {
                uploadPath += 'others/';
            }

            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            // Use timestamp and original extension for filename
            cb(null, Date.now() + path.extname(file.originalname));
        }
    });

    const fileFilter = function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    };

    return multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: {
            fileSize: 1024 * 1024 * 5 // Limit files to 5MB
        }
    });
}

module.exports = uploadMiddleware;
