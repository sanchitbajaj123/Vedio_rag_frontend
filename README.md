# 🎨 Video-RAG-Studio Frontend

A **React.js frontend** for the Video-RAG-Studio application.  
This interface allows users to upload videos, process them via the backend RAG system, view transcripts & summaries, and ask semantic queries.

---

## 🖼️ Preview
<img width="1902" height="903" alt="Screenshot 2025-08-15 221608" src="https://github.com/user-attachments/assets/cf1cb0fb-4447-4476-9fdd-cfbc3d44c661" />


---

## ✨ Features

- **Video Upload**: Uploads videos directly to Firebase storage.  
- **Video Processing Status**: Displays live status updates (`idle`, `uploading`, `processing`, `done`).  
- **Transcript Viewer**: Displays transcribed text of uploaded videos.  
- **Query Interface**: Allows natural language queries on processed videos.  
- **Session History**: Maintains local history of processed videos and queries.  
- **Persistent User ID**: Generates and stores a unique user ID in `localStorage`.  

---

## ⚙️ Technologies Used

- **React.js** – UI rendering & state management  
- **Firebase Storage** – Video hosting  
- **Custom Backend API** – For transcription, summarization & Q&A  
- **CSS** – Styling (`style.css`)  
- **LocalStorage** – User ID and history persistence

---


# Install dependencies
npm install
