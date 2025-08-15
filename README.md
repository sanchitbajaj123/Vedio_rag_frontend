# 🎨 Video-RAG-Studio Frontend

A **React.js frontend** for the Video-RAG-Studio application.  
This interface allows users to upload videos, process them via the backend RAG system, view transcripts & summaries, and ask semantic queries.

---

## 🖼️ Preview
![App Screenshot](<img width="1902" height="903" alt="image" src="https://github.com/user-attachments/assets/7fc64ef2-4daa-4726-b3e0-702c4894108d" />
)  
*(Replace `screenshot.png` with your actual screenshot file path)*

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
