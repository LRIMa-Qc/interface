"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Speech() {
  const [content, setContent] = useState<{
    filePath: string;
    content: string;
  } | null>(null);
  const sendTextRequest = async (formData: FormData) => {
    const content = formData.get("content");

    if (!content) {
      toast.error("No content");
      return;
    }

    const auth = `Bearer ${process.env.BEARER_TOKEN || "token"}`;

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", auth);

    const raw = JSON.stringify({
      content,
    });

    try {
      const response = await fetch("http://localhost:3000/ia/chat/text", {
        method: "POST",
        headers: headers,
        body: raw,
        redirect: "follow",
      });
      const result = await response.text();
      console.log(result);
      setContent(JSON.parse(result));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex flex-col max-w-xl mx-auto mt-12 gap-6">
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
      <div className="w-full">
        <p>{content ? content.content : ""}</p>
      </div>
    </div>
  );
}
