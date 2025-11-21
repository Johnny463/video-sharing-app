import { BlobServiceClient } from "@azure/storage-blob";

const connStr = process.env.AZURE_STORAGE_CONNECTION_STRING;
if (!connStr) {
  console.warn("AZURE_STORAGE_CONNECTION_STRING not set – uploads will fail.");
}

const blobServiceClient = connStr
  ? BlobServiceClient.fromConnectionString(connStr)
  : null;

export const getVideoContainerClient = () => {
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME || "videos";
  if (!blobServiceClient) return null;
  return blobServiceClient.getContainerClient(containerName);
};

export const getThumbnailContainerClient = () => {
  const containerName =
    process.env.AZURE_STORAGE_THUMBNAIL_CONTAINER_NAME || "thumbnails";
  if (!blobServiceClient) return null;
  return blobServiceClient.getContainerClient(containerName);
};
