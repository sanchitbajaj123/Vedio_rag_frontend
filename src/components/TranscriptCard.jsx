import React from "react";

const TranscriptCard = ({ video }) => {
  // Extract data only if video exists
  const summary = video?.summary || "";
  const transcript = video?.transcript || "";
  const scenes = Array.isArray(video?.scenes) ? video.scenes : [];

  return (
    <div className="card">
      <div className="card-header">Transcript & Summary</div>
      <div className="card-body two-col">
        
        {/* LEFT COLUMN — Summary & Scenes */}
        <div>
          <h4>Summary</h4>
          <p className="pre">{summary || "—"}</p>

          {scenes.length > 0 ? (
            <>
              <h4>Scenes</h4>
              <ul className="scenes">
                {scenes.map((s, i) => (
                  <li key={i}>
                    <code>
                      {s.startTime}–{s.endTime}
                    </code>{" "}
                    — {s.description}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="muted">No scenes available.</p>
          )}
        </div>

        {/* RIGHT COLUMN — Transcript */}
        <div>
          <h4>Transcript</h4>
          <div className="transcript-box">
            {transcript || "—"}
          </div>
        </div>

      </div>
    </div>
  );
};

export default TranscriptCard;
