import React, { useState } from "react";

const QueryCard = ({ selectedVideo, enquer, setEnquer, onSendQuery }) => {
  const disabled = !selectedVideo;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!enquer.trim()) return;

    setIsSubmitting(true); 
    try {
      await onSendQuery(); 
      setEnquer(""); 
    } catch (err) {
      console.error(err);
    }


    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <div className="card">
      <div className="card-header">Ask a question about this video</div>
      <div className="card-body">
        <textarea style={{backgroundColor:"#0b1020",color:"white"}}
          placeholder="e.g., When does the beach appear? What does the speaker say about finance?"
          value={enquer}
          onChange={(e) => setEnquer(e.target.value)}
          disabled={disabled || isSubmitting}
        />
        <div className="row">
          <button
            disabled={disabled || !enquer.trim() || isSubmitting}
            onClick={submit}
          >
            {isSubmitting ? "Please wait..." : "Ask"}
          </button>
        </div>

        {selectedVideo?.queries?.length > 0 && (
          <div className="answers">
            {selectedVideo.queries.map((a, idx) => (
              <div key={idx} className="answer">
                <div className="question">Q: {a.question}</div>
                <div className="ai">A: {a.answer}</div>
                <div className="time">{new Date(a.timestamp).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QueryCard;
