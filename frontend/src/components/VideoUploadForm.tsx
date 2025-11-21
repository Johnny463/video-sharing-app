import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Upload, X, Film } from "lucide-react";
import { toast } from "sonner";

import { uploadVideo } from "@/lib/api";   // ✅ USE BACKEND API

const VideoUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
    } else {
      toast.error("Please select a video file");
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      if (!title) setTitle(file.name.replace(/\.[^/.]+$/, ""));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a video file");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a title");
      return;
    }

    setIsUploading(true);

    // Build formData for API call
    const formData = new FormData();
    formData.append("video", selectedFile);
    formData.append("title", title);

    try {
      // ✅ CALL YOUR REAL BACKEND API
      const response = await uploadVideo(formData);

      toast.success("Video uploaded successfully!");

      // Reset form
      setSelectedFile(null);
      setTitle("");
      if (fileInputRef.current) fileInputRef.current.value = "";

    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-6 sm:p-8 shadow-card border-border bg-card">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Title Input */}
        <div className="space-y-2">
          <Label htmlFor="title">Video Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Enter a catchy title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Upload Area */}
        <div className="space-y-2">
          <Label>Video File</Label>

          {!selectedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-lg p-12 text-center cursor-pointer
                transition-all 
                ${dragActive ? "border-primary bg-primary/10" : "border-border bg-muted"}
              `}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <p className="text-lg font-medium">
                  {dragActive ? "Drop your video..." : "Drag & drop your video"}
                </p>
                <p className="text-sm text-muted-foreground">or click to browse</p>
              </div>
            </div>
          ) : (
            <div className="border border-border rounded-lg p-4 bg-muted/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
                    <Film className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={removeFile}>
                  <X className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!selectedFile || isUploading}
          className="w-full"
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </Button>

      </form>
    </Card>
  );
};

export default VideoUploadForm;
