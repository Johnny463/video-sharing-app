import Header from "@/components/Header";
import VideoUploadForm from "@/components/VideoUploadForm";

const Upload = () => {
  return (
    <div className="min-h-screen gradient-dark">
      <Header />

      <main className="container mx-auto px-4 py-8 sm:py-12">
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
          
          {/* Page Title */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Upload Your Video
            </h1>
            <p className="text-lg text-muted-foreground">
              Share your moments with the world
            </p>
          </div>

          {/* Upload Form */}
          <VideoUploadForm />

          {/* Tips Section */}
          <div className="text-center space-y-4 pt-10">
            <h2 className="text-xl font-semibold text-foreground">
              Tips for great uploads
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              
              <div className="p-4 rounded-lg bg-card border border-border shadow-sm">
                <p className="font-medium text-primary mb-1">Keep it short</p>
                <p className="text-muted-foreground">
                  15–60 seconds works best
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border shadow-sm">
                <p className="font-medium text-primary mb-1">Good lighting</p>
                <p className="text-muted-foreground">
                  Natural light is your friend
                </p>
              </div>

              <div className="p-4 rounded-lg bg-card border border-border shadow-sm">
                <p className="font-medium text-primary mb-1">Catchy title</p>
                <p className="text-muted-foreground">
                  Make people want to watch
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Upload;
