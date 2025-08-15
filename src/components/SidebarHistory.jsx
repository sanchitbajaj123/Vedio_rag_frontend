import React from "react";

const SidebarHistory = ({ history, selectedIndex, onSelect }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>History</h3>
      </div>
      <div className="sidebar-list">
        {history.length === 0 ? (
          <p className="muted">No sessions yet.</p>
        ) : (
          history.map((item, idx) => (
            <button
              key={idx}
              className={`history-item ${selectedIndex === idx ? "active" : ""}`}
              onClick={() => onSelect(idx)}
              title={item.title || item.videoName}
            >
              <div className="history-title">{item.title || item.videoUrl || "Video session"}</div>
              <div className="history-meta">
                <span className={`badge ${item.status}`}>{item.status}</span>
                <span className="time">{new Date(item.createdAt).toLocaleString()}</span>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
};

export default SidebarHistory;
