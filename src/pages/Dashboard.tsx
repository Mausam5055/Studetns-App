import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuoteComponent from "@/components/dashboard/QuoteComponent";
import { 
  ClockFill, 
  ListTask, 
  Calendar3, 
  BookHalf, 
  ChevronRight,
  CheckCircleFill,
  Clock,
  CurrencyDollar,
  GraphUp,
  ArrowUpCircle,
  MusicNoteBeamed
} from "react-bootstrap-icons";

const Dashboard = () => {
  const [greeting, setGreeting] = useState<string>("");
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [todayAttendance, setTodayAttendance] = useState<number>(0);
  const [pendingTasks, setPendingTasks] = useState<number>(0);
  const [upcomingClass, setUpcomingClass] = useState<{ name: string; time: string } | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setTodayAttendance(85);
    setPendingTasks(4);
    setUpcomingClass({
      name: "Data Structures",
      time: "2:30 PM"
    });
  }, []);

  const username = user?.email ? user.email.split('@')[0] : 'Student';

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {greeting}, {username}! 👋
        </h1>
        <p className="text-universe-600 dark:text-universe-400">
          Track your academic progress and productivity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-3 md:col-span-2 glass-card card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/pomodoro">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover-scale w-full">
                  <ClockFill className="h-5 w-5" />
                  <span>Start Pomodoro</span>
                </Button>
              </Link>
              <Link to="/tasks">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover-scale w-full">
                  <ListTask className="h-5 w-5" />
                  <span>Add Task</span>
                </Button>
              </Link>
              <Link to="/timetable">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover-scale w-full">
                  <Calendar3 className="h-5 w-5" />
                  <span>View Timetable</span>
                </Button>
              </Link>
              <Link to="/notes">
                <Button variant="outline" className="h-24 flex flex-col items-center justify-center gap-2 hover-scale w-full">
                  <BookHalf className="h-5 w-5" />
                  <span>Create Note</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 md:col-span-1 glass-card card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl">Today's Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end justify-between">
              <span className="text-3xl font-bold">{todayAttendance}%</span>
              <span className="text-universe-500 text-sm">Goal: 90%</span>
            </div>
            <Progress value={todayAttendance} className="h-2" />
            <div className="flex items-center justify-between text-sm">
              <span className="text-universe-500">Classes attended: 5/6</span>
              <Button variant="link" size="sm" className="p-0 h-auto gap-1">
                Details <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="glass-card card-hover">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Pending Tasks</CardTitle>
            <ListTask className="h-5 w-5 text-universe-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-3xl font-bold">{pendingTasks}</div>
              <div className="text-sm text-universe-500">Due today: 2</div>
              <Link to="/tasks">
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View All Tasks
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card card-hover">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Class</CardTitle>
            <Clock className="h-5 w-5 text-universe-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-bold">{upcomingClass?.name}</div>
              <div className="text-sm text-universe-500">
                Today at {upcomingClass?.time}
              </div>
              <Link to="/timetable">
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  View Timetable
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card card-hover">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Study Music</CardTitle>
            <MusicNoteBeamed className="h-5 w-5 text-universe-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="text-lg font-medium">Focus Playlists</div>
              <div className="text-sm text-universe-500">
                Boost your concentration with curated study music
              </div>
              <Link to="/music">
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  Play Music
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <QuoteComponent />
    </div>
  );
};

export default Dashboard;
