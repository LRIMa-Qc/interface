"use client";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

export default function Speech() {
  const [textContent, setTextContent] = useState<{ content: string } | null>(
    null,
  );
  const [recording, setRecording] = useState(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const sendTextRequest = async (formData: FormData) => {
    const content = formData.get("content");
    if (!content) {
      toast.error("No content");
      return;
    }

    const auth = `Bearer ${process.env.BEARER_TOKEN || "token"}`;
    try {
      const res = await fetch("http://206.167.46.66:3000/ia/chat/text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth,
        },
        body: JSON.stringify({ content }),
      });
      const result = await res.json();
      setTextContent(result);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send text request");
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMediaStream(stream);
      audioChunksRef.current = [];

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/wav",
        });
        const arrayBuffer = await audioBlob.arrayBuffer();
        const base64Audio = btoa(
          String.fromCharCode(...new Uint8Array(arrayBuffer)),
        );

        // Send to AI endpoint
        const auth = `Bearer ${process.env.BEARER_TOKEN || "token"}`;
        try {
          const res = await fetch("http://206.167.46.66:3000/ia/chat/audio", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: auth,
            },
            body: JSON.stringify({ content: base64Audio }),
          });
          const result = await res.json();

          // Play returned audio
          const returnedAudio = result.content; // base64
          const audioData = Uint8Array.from(atob(returnedAudio), (c) =>
            c.charCodeAt(0),
          );
          const audioBlob = new Blob([audioData], { type: "audio/wav" });
          const url = URL.createObjectURL(audioBlob);
          const audio = new Audio(url);
          audio.play();
        } catch (err) {
          console.error(err);
          toast.error("Failed to send audio request");
        }
      };

      mediaRecorder.start();
      setRecording(true);
    } catch (err) {
      console.error(err);
      toast.error("Cannot access microphone");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    mediaStream?.getTracks().forEach((track) => track.stop());
    setMediaStream(null);
    setRecording(false);
  };

  return (
    <div className="flex flex-col max-w-xl mx-auto mt-12 gap-6">
      {/* =============================== */}
      {/* Text request */}
      {/* =============================== */}
      <div className="flex flex-col w-full gap-3">
        <p className="font-bold">From text</p>
        <form action={sendTextRequest} className="flex flex-col gap-5">
          <textarea
            id="content"
            name="content"
            placeholder="Type..."
            className="bg-white/10 border-white/20 border p-5 rounded-2xl outline-none"
          />
          <button
            type="submit"
            className="px-3 py-2 bg-white text-black rounded-2xl"
          >
            Send
          </button>
        </form>
      </div>

      <hr className="border-white/20" />
      <div className="flex flex-col w-full gap-3">
        <p className="font-bold">From microphone</p>
        <div className="flex items-center gap-3">
          {!recording ? (
            <button
              className="px-3 py-2 bg-green-500 text-white rounded-2xl"
              onClick={startRecording}
            >
              Start Recording
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-red-500 text-white rounded-2xl"
              onClick={stopRecording}
            >
              Stop Recording
            </button>
          )}
          {recording && <span>Recording…</span>}
        </div>
      </div>

      <hr className="border-white/20" />
      <div className="w-full">
        <p>{textContent ? textContent.content : ""}</p>
      </div>
    </div>
  );
}
