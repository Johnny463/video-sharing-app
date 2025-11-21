import { useEffect, useState } from "react";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { Skeleton } from "@/components/ui/skeleton";

// USE THE API FUNCTIONS
import { fetchVideos } from "@/lib/api";

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl: string;
  views: number;
  createdAt: string;
}

const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const data = await fetchVideos();

        const apiVideos: Video[] = (data.videos || []).map((v: any) => ({
          id: v.id,
          title: v.title,
          thumbnail: v.thumbnail,
          videoUrl: v.videoUrl,
          views: v.views ?? 0,
          createdAt: v.createdAt,
        }));

        setVideos(apiVideos);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  return (
    <div className="min-h-screen gradient-dark">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Trending Videos
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover what's popular right now
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[9/16] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <VideoCard key={video.id} {...video} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">
              No videos yet. Be the first to upload!
            </p>
            <a
              href="/upload"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium shadow-glow hover:bg-primary/90 transition-smooth"
            >
              Upload Your First Video
            </a>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
