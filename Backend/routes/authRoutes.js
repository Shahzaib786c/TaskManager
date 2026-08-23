import express from "express";
import { register, login, getMe, updateAvatar, updateProfile } from "../controllers/authController.js";
import verifyToken from "../middleware/verifyToken.js";
import uploadAvatar from "../middleware/uploadAvatarMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyToken, getMe);
router.put("/avatar", verifyToken, uploadAvatar.single("avatar"), updateAvatar);
router.put("/profile", verifyToken, updateProfile);

export default router;