// app/not-found.jsx or pages/404.js
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HomeIcon, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted p-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* 404 Text with animated gradient effect */}
        <h1 className="text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse">
          404
        </h1>

        <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>

        <p className="text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved
          to another URL.
        </p>

        {/* Illustration */}
        {/* <div className="py-6">
          <svg
            className="w-64 h-64 mx-auto text-muted-foreground/50"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15l2-2 4 4" />
            <path d="M16 9l-4 4-2-2" />
          </svg>
        </div> */}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link href="/">
              <HomeIcon className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link href="javascript:history.back()">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
