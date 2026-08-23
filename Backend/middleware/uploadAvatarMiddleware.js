import multer from "multer";
import path from "path";

const storage = multer.diskStorage(
    {
        destination: "uploads/avatars/",
        filename: (req, file, cb) => {
            const uniqueName = Date.now() + "-" + file.originalname;
            cb(null, uniqueName);
        }
    });

const fileFilter = (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const allowedExtensions =
        [
            ".jpg",
            ".jpeg",
            ".png",
            ".webp"
        ];

    if (file.mimetype.startsWith("image/") &&
        allowedExtensions.includes(extension)) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"));
    }
};

const uploadAvatar = multer(
    {
        storage: storage,
        fileFilter: fileFilter,
        limits:
        {
            fileSize: 2 * 1024 * 1024
        }
    });

export default uploadAvatar;