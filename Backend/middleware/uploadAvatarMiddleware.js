// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage(
//     {
//         destination: "uploads/avatars/",
//         filename: (req, file, cb) => {
//             const uniqueName = Date.now() + "-" + file.originalname;
//             cb(null, uniqueName);
//         }
//     });

// const fileFilter = (req, file, cb) => {
//     const extension = path.extname(file.originalname).toLowerCase();

//     const allowedExtensions =
//         [
//             ".jpg",
//             ".jpeg",
//             ".png",
//             ".webp"
//         ];

//     if (file.mimetype.startsWith("image/") &&
//         allowedExtensions.includes(extension)) {
//         cb(null, true);
//     } else {
//         cb(new Error("Only image files are allowed"));
//     }
// };

// const uploadAvatar = multer(
//     {
//         storage: storage,
//         fileFilter: fileFilter,
//         limits:
//         {
//             fileSize: 2 * 1024 * 1024
//         }
//     });

// export default uploadAvatar;


// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// const storage = new CloudinaryStorage(
//     {
//         cloudinary: cloudinary,
//         params: {
//             folder: "taskmanager/avatars",
//             allowed_formats: ["jpg", "jpeg", "png", "webp"],
//             transformation: [{ width: 300, height: 300, crop: "fill" }]
//         }
//     });

// const uploadAvatar = multer({
//     storage: storage,
//     limits: {
//         fileSize: 2 * 1024 * 1024
//     }
// });

// export default uploadAvatar;

import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage(
    {
        cloudinary: cloudinary,
        params: (req, file) => {
            return {
                folder: "taskmanager/avatars",
                allowed_formats: ["jpg", "jpeg", "png", "webp"],
                transformation: [{ width: 300, height: 300, crop: "fill" }],
                public_id: `user_${req.userId}`
            };
        }
    });

const uploadAvatar = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});

export default uploadAvatar;