
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import {
  HouseDoorFill,
  Calendar3,
  ClockFill,
  ListTask,
  Book,
  Calculator,
  PersonFill,
  ChatDots,
  MusicNoteBeamed,
  Heart,
  CurrencyDollar,
  MoonStars,
  SunFill,
  BoxArrowRight,
  ChevronLeft,
  ChevronRight,
} from "react-bootstrap-icons";

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
};

const SidebarItem = ({ icon, label, to, active = false, collapsed = false }: SidebarItemProps) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
        active
          ? "bg-universe-200 dark:bg-universe-700 text-universe-800 dark:text-universe-100"
          : "text-universe-600 dark:text-universe-400 hover:bg-universe-100 dark:hover:bg-universe-800/50"
      } ${collapsed ? "justify-center" : ""}`}
    >
      <div className="text-lg">{icon}</div>
      {!collapsed && <span className="text-sm font-medium">{label}</span>}
    </Link>
  );
};

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div
      className={`h-screen flex flex-col border-r border-universe-200 dark:border-universe-800 bg-white dark:bg-universe-900 shadow-sm transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b border-universe-200 dark:border-universe-800">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-universe-400 to-universe-600 flex items-center justify-center">
              <span className="text-sm font-bold text-white">U</span>
            </div>
            <h1 className="text-lg font-bold">UniVerse</h1>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={`${collapsed ? "mx-auto" : ""}`}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>

      <div className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <SidebarItem
          icon={<HouseDoorFill />}
          label="Dashboard"
          to="/dashboard"
          active={location.pathname === "/dashboard"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Calendar3 />}
          label="Timetable"
          to="/timetable"
          active={location.pathname === "/timetable"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<ClockFill />}
          label="Pomodoro"
          to="/pomodoro"
          active={location.pathname === "/pomodoro"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Calculator />}
          label="Calculators"
          to="/calculators"
          active={location.pathname.startsWith("/calculators")}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<ListTask />}
          label="Tasks"
          to="/tasks"
          active={location.pathname === "/tasks"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Book />}
          label="Notes"
          to="/notes"
          active={location.pathname === "/notes"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<MusicNoteBeamed />}
          label="Music Player"
          to="/music"
          active={location.pathname === "/music"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<Heart />}
          label="Fitness"
          to="/fitness"
          active={location.pathname === "/fitness"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<CurrencyDollar />}
          label="Expenses"
          to="/expenses"
          active={location.pathname === "/expenses"}
          collapsed={collapsed}
        />
        <SidebarItem
          icon={<ChatDots />}
          label="Community"
          to="/community"
          active={location.pathname === "/community"}
          collapsed={collapsed}
        />
      </div>

      <div className="p-4 border-t border-universe-200 dark:border-universe-800 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          className={`${collapsed ? "justify-center" : "justify-start"} w-full`}
        >
          {theme === "dark" ? <SunFill className="mr-2" /> : <MoonStars className="mr-2" />}
          {!collapsed && <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className={`${collapsed ? "justify-center" : "justify-start"} w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20`}
        >
          <BoxArrowRight className="mr-2" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
