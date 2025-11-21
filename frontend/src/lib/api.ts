// Remove trailing slash to avoid `//api/...`
export const API_URL =
  "https://video-sharing-backend-d4bwckg2excdbggc.canadacentral-01.azurewebsites.net";

export async function fetchVideos() {
  const res = await fetch(`${API_URL}/api/videos`);
  if (!res.ok) throw new Error("Failed to fetch videos");
  return res.json();
}

export async function uploadVideo(data: any) {
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: data,
  });

  if (!res.ok) throw new Error("Upload failed");
  return res.json();
}
