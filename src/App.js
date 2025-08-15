import React, { useEffect, useState } from "react";
import { uploadToFirebase, saveVideo, sendQuery } from "./api";
import SidebarHistory from "./components/SidebarHistory";
import UploadCard from "./components/UploadCard";
import StatusCard from "./components/StatusCard";
import TranscriptCard from "./components/TranscriptCard";
import QueryCard from "./components/QueryCard";
import "./style.css";

const USER_KEY = "ns_user_id";

function App() {
  const [index, setIndex] = useState(null);
  const [history, setHistory] = useState([]);
  const [enquer, setEnquer] = useState("");
  const [status, setStatus] = useState("idle");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let uid = localStorage.getItem(USER_KEY);
    if (!uid) {
      uid = crypto.randomUUID();
      localStorage.setItem(USER_KEY, uid);
    }
    setUserId(uid);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("history");
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        setHistory([]);
      }
    }
  }, []);

const handleUpload = async (file, title) => {
  setStatus("uploading");
  try {
    const {url,hash} = await uploadToFirebase(file);
    setStatus("processing");
    const videoData = await saveVideo(url, userId, title,hash); 
    setHistory((prev) => [videoData, ...prev]);
    setIndex(0);
    setStatus("done");
  } catch (err) {
    console.error(err);
    setStatus("idle");
  }
};


  const handleQuery = async () => {
    if (index === null) return;
    try {
      const updatedHistory = await sendQuery(index, enquer);
      if (updatedHistory) setHistory(updatedHistory);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="app">
      <SidebarHistory history={history} onSelect={setIndex} selectedIndex={index} />

      <main className="workspace">
        <header className="topbar">
          <div className="brand">Video RAG Studio</div>
          <div className="user-id">User: {userId.slice(0, 8)}</div>
          <button onClick={() =>{ 
            setIndex(null)
            setStatus("idle")
          }}>New Video</button>
        </header>

        <section className="grid">
          <div className="grid-left">
            <UploadCard onUpload={handleUpload} />
            <StatusCard status={status}  />
            <QueryCard
              selectedVideo={index !== null ? history[index] : null}
              enquer={enquer}
              setEnquer={setEnquer}
              onSendQuery={handleQuery}
            />
          </div>

          <div className="grid-right">
            <TranscriptCard video={index !== null ? history[index] : null} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
