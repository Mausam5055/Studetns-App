
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useToast } from "@/components/ui/use-toast";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if Supabase is properly configured
        if (isSupabaseConfigured()) {
          // Check Supabase session
          const { data } = await supabase.auth.getSession();
          
          if (data.session) {
            setIsLoading(false);
            return;
          }
        } else {
          // Show warning about missing environment variables
          toast({
            title: "Development Mode",
            description: "Supabase environment variables missing. Using local authentication.",
            variant: "default",
            duration: 5000,
          });
        }
        
        // Fall back to localStorage check
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        
        if (!isLoggedIn) {
          navigate("/");
          return;
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error("Auth check failed:", error);
        
        // Fall back to localStorage check
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        if (isLoggedIn) {
          setIsLoading(false);
        } else {
          navigate("/");
        }
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-universe-900">
        <div className="animate-pulse-subtle">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-universe-400 to-universe-600 flex items-center justify-center">
            <span className="text-xl font-bold text-white">U</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full">
      <Sidebar />
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-20">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
