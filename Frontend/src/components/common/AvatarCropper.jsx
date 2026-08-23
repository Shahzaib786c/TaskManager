import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Modal from "./Modal.jsx";
import { getCroppedImageFile } from "../../utils/cropImage.js";
import "./AvatarCropper.css";

export default function AvatarCropper({
  isOpen,
  onClose,
  imageSrc,
  onCropComplete,
  isSaving,
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  async function handleSave() {
    if (!croppedAreaPixels) return;
    const file = await getCroppedImageFile(imageSrc, croppedAreaPixels);
    onCropComplete(file);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Adjust Your Photo">
      <div className="avatar-cropper-area">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          showGrid={false}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
      </div>

      <div className="avatar-cropper-zoom-row">
        <label className="avatar-cropper-zoom-label">Zoom</label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="avatar-cropper-zoom-slider"
        />
      </div>

      <div className="avatar-cropper-actions">
        <button
          type="button"
          className="avatar-cropper-cancel-btn"
          onClick={onClose}
          disabled={isSaving}
        >
          Cancel
        </button>
        <button
          type="button"
          className="avatar-cropper-save-btn"
          onClick={handleSave}
          disabled={isSaving}
        >
          {isSaving ? "Uploading..." : "Save Photo"}
        </button>
      </div>
    </Modal>
  );
}
