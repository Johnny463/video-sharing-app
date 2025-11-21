import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, Home } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-xl">C</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            CloudClips
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant={location.pathname === "/" ? "default" : "ghost"}
            asChild
            className="gap-2"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Feed</span>
            </Link>
          </Button>
          <Button
            variant={location.pathname === "/upload" ? "default" : "ghost"}
            asChild
            className="gap-2"
          >
            <Link to="/upload">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Upload</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;