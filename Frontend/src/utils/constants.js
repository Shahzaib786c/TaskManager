export const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL;

export function getAvatarUrl(avatarPath) {
    if (!avatarPath) return null;
    return avatarPath;
}