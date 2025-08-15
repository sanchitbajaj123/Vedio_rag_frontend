
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase'; 
import axios from "axios";

const HISTORY_KEY = "history";
const backendurl=process.env.REACT_APP_Backendurl;

const USER_KEY = "ns_user_id";
let uid = localStorage.getItem(USER_KEY);

function loadHistory() {
  const stored = localStorage.getItem(HISTORY_KEY);
  try {
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

async function generateVideoHash(file) {
  const arrayBuffer = await file.arrayBuffer(); 
  const hashBuffer = await crypto.subtle.digest("SHA-256", arrayBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}



export async function uploadToFirebase(file) {
  const hash = await generateVideoHash(file);
  const check=await axios.post(backendurl+"/checkhash",{hash,user:uid})
  if(check.status===200){
    return({url:check.data.videoUrl,hash})
  }
  else{
  const fileDataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
  const storageRef = ref(storage, `vedio/${Date.now()}.mp4`);
  const uploadResult = await uploadString(storageRef, fileDataUrl, 'data_url');
  const downloadURL = await getDownloadURL(uploadResult.ref);
  return({url:downloadURL,hash})}
}


export async function saveVideo(url, userId, title,hash) {

  const steps = ["Transcribing audio", "Analyzing scenes", "Summarizing"];
  for (const _ of steps) {
    await new Promise((r) => setTimeout(r, 800));
  }
  const check=await axios.post(backendurl+"/checkhash",{hash,user:uid})

  if(check.status===200){
    const newVideo={
    id: crypto.randomUUID(),
    videoUrl: url,
    title: title || "Untitled video",
    transcript:check.data.transcript,
    summary:check.data.summary,
    hash,
    queries:[],
    createdAt: new Date().toISOString(),
    }
    const history = loadHistory();
    const updatedHistory = [newVideo, ...history];
    saveHistory(updatedHistory);
    return newVideo;
  }
  else{
    const data={
      firebaseUrl:url,
      hash,
      user:userId
    }
    const result=await axios.post(backendurl+"/vedioupload",data);
    const newVideo={
      id: crypto.randomUUID(),
      videoUrl: url,
      title: title || "Untitled video",
      transcript:result.data.transcript,
      summary:result.data.summary,
      createdAt: new Date().toISOString(),
      hash,
      queries:[],
    }
    const history = loadHistory();
    const updatedHistory = [newVideo, ...history];
    saveHistory(updatedHistory);
    return newVideo;
  }
}


export async function sendQuery(index, question) {
  const history = loadHistory();
  if (index < 0 || index >= history.length) return history;

  await new Promise((r) => setTimeout(r, 600));

  const video = history[index];
  const data={
    query:question,
    hash:video.hash
  }
  const answer =await axios.post(backendurl+"/askquery",data)

  if (!video.queries) video.queries = [];
  video.queries.push({
    question,
    answer:answer.data,
    timestamp: new Date().toISOString(),
  });

 
  history[index] = video;
  saveHistory(history);

  return history;
}
   