import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are Required"
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email Already Registered"
            });
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const user = await userModel.create({
            name,
            email,
            password: hashPassword
        });

        res.status(201).json({
            message: "User Registered Successfully !",
            user: { id: user._id, name: user.name, email: user.email }
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModel.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            message: "Login successful",
            token: token,
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getMe(req, res) {
    try {
        const user = await userModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateAvatar(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Avatar image is required"
            });
        }

        const user = await userModel.findByIdAndUpdate(
            req.userId,
            { avatar: req.file.path },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Avatar updated successfully",
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
        });
    } catch (error) {
        console.error("Avatar upload error:", error);
        res.status(500).json({ message: error.message || "Avatar upload failed" });
    }
}
export async function updateProfile(req, res) {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const existingUser = await userModel.findOne({ email, _id: { $ne: req.userId } });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already in use by another account"
            });
        }

        const user = await userModel.findByIdAndUpdate(
            req.userId,
            { name, email },
            {
                returnDocument: 'after',
                runValidators: true
            }
        );

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            user: { id: user._id, name: user.name, email: user.email, avatar: user.avatar }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}