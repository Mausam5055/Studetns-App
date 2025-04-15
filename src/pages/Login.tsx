
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Google, BoxArrowInRight } from "react-bootstrap-icons";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [supabaseAvailable, setSupabaseAvailable] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if Supabase is properly configured
    setSupabaseAvailable(isSupabaseConfigured());
    
    if (!isSupabaseConfigured()) {
      toast({
        title: "Development Mode",
        description: "Supabase environment variables missing. Using mock authentication.",
        variant: "default",
        duration: 5000,
      });
    }
  }, [toast]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      if (supabaseAvailable) {
        // Use Supabase authentication
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          throw error;
        }
      } else {
        // Mock login for development
        // In a real app, you would validate credentials with a backend
      }

      toast({
        title: "Success",
        description: "Login successful",
      });
      
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("user", JSON.stringify({ email }));
      
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    
    try {
      if (supabaseAvailable) {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${window.location.origin}/dashboard`,
          }
        });

        if (error) {
          throw error;
        }

        toast({
          title: "Redirecting to Google",
          description: "Please complete the authentication",
        });
      } else {
        // Mock Google login for development
        toast({
          title: "Development Mode",
          description: "Google login simulated in development mode",
        });
        
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("user", JSON.stringify({ email: "student@university.edu" }));
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to login with Google",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-universe-900 p-4">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-universe-200 to-universe-300 dark:from-universe-800 dark:to-universe-700" />
      
      <Card className="w-full max-w-md animate-fade-in glass-card">
        <CardHeader className="space-y-2 text-center">
          <div className="flex justify-center">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-universe-400 to-universe-600 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-white">U</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">UniVerse</CardTitle>
          <CardDescription>Your complete student companion</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="university@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/50 dark:bg-universe-800/50"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-universe-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/50 dark:bg-universe-800/50"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log in"} <BoxArrowInRight className="ml-2" />
            </Button>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-universe-200 dark:border-universe-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background dark:bg-universe-900 px-2 text-universe-500">
                OR CONTINUE WITH
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            type="button"
            className="w-full"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <Google className="mr-2" />
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center text-sm">
          <p className="text-universe-500">
            Don't have an account?{" "}
            <a href="#" className="text-universe-800 dark:text-universe-200 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
