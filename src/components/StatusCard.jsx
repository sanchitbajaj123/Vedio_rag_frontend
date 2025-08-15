import React from "react";

const StatusCard = ({ status}) => {
  const steps = [
    { key: "idle", label: "Waiting for upload" },
    { key: "uploading", label: "Uploading to storage" },
    { key: "processing", label: "Analyzing with AI" },
    { key: "done", label: "Ready" }, 
    { key: "error", label: "Error" },
  ];

  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="card">
      <div className="card-header">Status</div>
      <div className="card-body">
        <div className="status-steps">
          {steps.map((s, idx) => (
            <div key={s.key} className={`status-step ${idx <= currentIndex ? "done" : ""}`}>
              <div className="dot" />
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>



        <div className="muted small">
          {status === "uploading"
            ? `Uploading…`
            : status === "processing"
            ? "Processing with AI (transcript, scenes, tags)…"
            : status === "done"
            ? "Done. You can ask questions now."
            : status === "error"
            ? "Something went wrong. Try again."
            : "Choose a file to begin."}
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
