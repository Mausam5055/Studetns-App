
import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "react-bootstrap-icons";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-universe-900 p-4">
      <div className="text-center max-w-md animate-fade-in">
        <div className="text-9xl font-bold text-universe-300 dark:text-universe-700 mb-6">404</div>
        <h1 className="text-3xl font-bold mb-4">Page Not Found</h1>
        <p className="text-universe-600 dark:text-universe-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/dashboard">
            <ArrowLeftCircle className="mr-2" /> Back to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
