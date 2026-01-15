import { useEffect, useState } from "react";

export default function CameraFeed() {
  const [url, setUrl] = useState("http://206.167.46.66:3000/camera/latest");

  useEffect(() => {
    const interval = setInterval(() => {
      // Append timestamp to force reload
      setUrl(`http://206.167.46.66:3000/camera/latest?ts=${Date.now()}`);
    }, 100); // 10 FPS
    return () => clearInterval(interval);
  }, []);

  return (
    <img src={url} className="w-full rounded-lg -scale-100" alt="Robot view" />
  );
}
