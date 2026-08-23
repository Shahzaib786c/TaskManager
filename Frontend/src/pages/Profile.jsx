import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useAuth } from "../hooks/useAuth.js";
import { updateAvatar as updateAvatarApi, updateProfile as updateProfileApi } from "../api/authService.js";
import AvatarCropper from "../components/common/AvatarCropper.jsx";
import { getAvatarUrl } from "../utils/constants.js";
import "./Profile.css";

const schema = yup.object({
    name: yup.string().trim().required("Name is required").max(50, "Max 50 characters"),
    email: yup.string().trim().email("Invalid email").required("Email is required")
});

export default function Profile() {
    const { user, updateUser } = useAuth();
    const fileInputRef = useRef(null);

    const [selectedImageSrc, setSelectedImageSrc] = useState(null);
    const [isCropperOpen, setIsCropperOpen] = useState(false);
    const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: user?.name || "",
            email: user?.email || ""
        }
    });

    function handleAvatarClick() {
        fileInputRef.current.click();
    }

    function handleFileSelected(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImageSrc(reader.result);
            setIsCropperOpen(true);
        };
        reader.readAsDataURL(file);

        e.target.value = "";
    }

    async function handleCropConfirm(croppedFile) {
        setIsUploadingAvatar(true);
        try {
            const formData = new FormData();
            formData.append("avatar", croppedFile);

            const data = await updateAvatarApi(formData);
            updateUser(data.user);
            toast.success("Profile photo updated");
            setIsCropperOpen(false);
            setSelectedImageSrc(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update photo");
        } finally {
            setIsUploadingAvatar(false);
        }
    }

    function handleCropperClose() {
        setIsCropperOpen(false);
        setSelectedImageSrc(null);
    }

    async function onSubmitProfile(formData) {
        try {
            const data = await updateProfileApi(formData);
            updateUser(data.user);
            toast.success("Profile updated successfully");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    }

    const avatarUrl = getAvatarUrl(user?.avatar);

    return (
        <div className="profile-page">
            <h2 className="profile-heading">Profile</h2>

            <div className="profile-card">
                <div className="profile-avatar-section">
                    <button
                        type="button"
                        className="profile-avatar-btn"
                        onClick={handleAvatarClick}
                        aria-label="Change profile photo"
                    >
                        {avatarUrl ? (
                            <img src={avatarUrl} alt="Profile" className="profile-avatar-img" />
                        ) : (
                            <span className="profile-avatar-fallback">
                                {user?.name?.charAt(0).toUpperCase()}
                            </span>
                        )}
                        <span className="profile-avatar-overlay">Change</span>
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileSelected}
                        style={{ display: "none" }}
                    />
                </div>

                <form className="profile-form" onSubmit={handleSubmit(onSubmitProfile)}>
                    <div className="profile-form-group">
                        <label className="profile-form-label">Name</label>
                        <input className="profile-form-input" {...register("name")} />
                        {errors.name && <p className="profile-form-error">{errors.name.message}</p>}
                    </div>

                    <div className="profile-form-group">
                        <label className="profile-form-label">Email</label>
                        <input className="profile-form-input" type="email" {...register("email")} />
                        {errors.email && <p className="profile-form-error">{errors.email.message}</p>}
                    </div>

                    <button type="submit" className="profile-form-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>

            <AvatarCropper
                isOpen={isCropperOpen}
                onClose={handleCropperClose}
                imageSrc={selectedImageSrc}
                onCropComplete={handleCropConfirm}
                isSaving={isUploadingAvatar}
            />
        </div>
    );
}