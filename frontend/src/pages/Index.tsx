import { useEffect, useState } from "react";
import Header from "@/components/Header";
import VideoCard from "@/components/VideoCard";
import { Skeleton } from "@/components/ui/skeleton";

interface Video {
  id: string;
  title: string;
  thumbnail: string;      // use thumbnail (matches VideoCard)
  videoUrl: string;
  views: number;
  createdAt: string;
}

const Index = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("/api/videos");

        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }

        const data = await response.json();

        // Map backend shape → frontend shape
        const apiVideos: Video[] = (data.videos || []).map((v: any) => ({
          id: v.id,
          title: v.title,
          thumbnail: v.thumbnailUrl,     // backend uses thumbnailUrl
          videoUrl: v.videoUrl,
          views: v.views ?? 0,
          createdAt: v.createdAt,
        }));

        setVideos(apiVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);

        // Mock data for local/dev
        const mockVideos: Video[] = [
          {
            id: "1",
            title: "Amazing Sunset Timelapse",
            thumbnail:
              "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=400&h=700&fit=crop",
            videoUrl:
              "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            views: 15234,
            createdAt: new Date(
              Date.now() - 2 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: "2",
            title: "Cooking Tutorial: Perfect Pasta",
            thumbnail:
              "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=700&fit=crop",
            videoUrl:
              "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            views: 8921,
            createdAt: new Date(
              Date.now() - 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: "3",
            title: "Urban Dance Performance",
            thumbnail:
              "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=400&h=700&fit=crop",
            videoUrl:
              "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            views: 23456,
            createdAt: new Date(
              Date.now() - 1 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: "4",
            title: "DIY Home Decor Ideas",
            thumbnail:
              "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=400&h=700&fit=crop",
            videoUrl:
              "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            views: 12789,
            createdAt: new Date(
              Date.now() - 7 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: "5",
            title: "Mountain Biking Adventure",
            thumbnail:
              "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=400&h=700&fit=crop",
            videoUrl:
              "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            views: 34567,
            createdAt: new Date(
              Date.now() - 3 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
          {
            id: "6",
            title: "Quick Workout Routine",
            thumbnail:
              "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=700&fit=crop",
            videoUrl:
              "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
            views: 19234,
            createdAt: new Date(
              Date.now() - 4 * 24 * 60 * 60 * 1000
            ).toISOString(),
          },
        ];
        setVideos(mockVideos);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
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
