import React, { useRef, useState } from "react";

const UploadCard = ({ onUpload }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);


  const handleChoose = (e) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  // Start processing/uploading
  const handleStart = async () => {
    if (!file) return;
    setIsUploading(true);

    try {
      await onUpload(file, title);
      setFile(null); // Reset file after successful upload
      setTitle("");  // Reset title
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header">Upload a video</div>
      <div className="card-body">
        <input
          className="title-input"
          placeholder="Optional: Title for this video"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isUploading}
        />
        <div className="upload-row">
          <input
            ref={inputRef}
            type="file"
            accept="video/*"
            onChange={handleChoose}
            style={{ display: "none" }}
            disabled={isUploading}
          />
          <button
            className="secondary"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
          >
            Choose file
          </button>
          <span className="file-name">
            {file ? file.name : "No file selected"}
          </span>
          <button
            disabled={!file || isUploading}
            onClick={handleStart}
          >
            {isUploading ? "Processing..." : "Start processing"}
          </button>
        </div>
        <p className="muted small">
          We’ll upload to cloud storage, then analyze with AI. This can take a moment.
        </p>
      </div>
    </div>
  );
};

export default UploadCard;
