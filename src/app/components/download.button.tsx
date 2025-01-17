import React, { useState } from "react";
import axios from "axios";

const DownloadButton = ({ audioUrl = "", fileName = "melofi.mp3" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (!audioUrl) 
      return;

    setIsLoading(true);

    try {
      const host = process.env.NEXT_PUBLIC_API_URL;
      console.log("host", `${host}/api/v1/media/download-audio`);
      const response = await axios.get(`${host}/api/v1/media/download-audio`, {
        params: { url: audioUrl },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "audio/mpeg" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <svg
      onClick={handleDownload}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24px"
      height="24px"
      fill={isLoading ? "#666" : "currentColor"}
      style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
    >
      <path
        d="M6 2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polyline
        points="14 3 14 8 19 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line
        x1="12"
        y1="10"
        x2="12"
        y2="16"
        stroke="currentColor"
        strokeWidth="2"
      />
      <polyline
        points="9 13 12 16 15 13"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
};

export default DownloadButton;
