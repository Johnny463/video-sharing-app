import { Card } from "@/components/ui/card";
import { Play } from "lucide-react";
import { useState } from "react";

interface VideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views?: number;
  createdAt?: string;
}

const VideoCard = ({ title, thumbnail, videoUrl, views, createdAt }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const formatViews = (count?: number) => {
    if (!count) return "0 views";
    if (count < 1000) return `${count} views`;
    if (count < 1000000) return `${(count / 1000).toFixed(1)}K views`;
    return `${(count / 1000000).toFixed(1)}M views`;
  };

  const formatDate = (date?: string) => {
    if (!date) return "";
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <Card className="group overflow-hidden bg-card border-border hover:border-primary/50 transition-all duration-300 shadow-card hover:shadow-glow animate-scale-in">
      <div className="relative aspect-[9/16] bg-muted overflow-hidden">
        {!isPlaying ? (
          <>
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Play video"
            >
              <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-glow">
                <Play className="h-8 w-8 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </button>
          </>
        ) : (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-cover"
            playsInline
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{formatViews(views)}</span>
          {createdAt && (
            <>
              <span>•</span>
              <span>{formatDate(createdAt)}</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VideoCard;