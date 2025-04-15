
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import { MusicPlayerProvider } from "@/hooks/use-music-player";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pomodoro from "./pages/Pomodoro";
import Calculators from "./pages/Calculators";
import Tasks from "./pages/Tasks";
import Timetable from "./pages/Timetable";
import Notes from "./pages/Notes";
import Music from "./pages/Music";
import Fitness from "./pages/Fitness";
import Expenses from "./pages/Expenses";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

// Layouts
import DashboardLayout from "./components/layout/DashboardLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <MusicPlayerProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              
              {/* Protected routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/calculators" element={<Calculators />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/timetable" element={<Timetable />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/music" element={<Music />} />
                <Route path="/fitness" element={<Fitness />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/community" element={<Community />} />
                {/* Add other protected routes here */}
              </Route>

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </MusicPlayerProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
