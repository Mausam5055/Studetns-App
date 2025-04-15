
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  PlayFill,
  PauseFill,
  ArrowClockwise,
  GearFill,
  XLg,
} from "react-bootstrap-icons";

const Pomodoro = () => {
  const [mode, setMode] = useState<"work" | "break" | "longBreak">("work");
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    autoStartBreaks: true,
    autoStartPomodoros: false,
    volume: 50,
  });
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            // Timer completed
            setIsActive(false);
            const notification = new Audio("/notification.mp3");
            notification.volume = settings.volume / 100;
            notification.play().catch(err => console.error("Error playing notification:", err));
            
            // Handle transition to next mode
            if (mode === "work") {
              const newCount = pomodoroCount + 1;
              setPomodoroCount(newCount);
              
              if (newCount % settings.longBreakInterval === 0) {
                setMode("longBreak");
                setSeconds(settings.longBreakDuration * 60);
                if (settings.autoStartBreaks) setIsActive(true);
              } else {
                setMode("break");
                setSeconds(settings.breakDuration * 60);
                if (settings.autoStartBreaks) setIsActive(true);
              }
            } else {
              setMode("work");
              setSeconds(settings.workDuration * 60);
              if (settings.autoStartPomodoros) setIsActive(true);
            }
            
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode, pomodoroCount, settings]);

  // Format time as mm:ss
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleReset = () => {
    setIsActive(false);
    if (mode === "work") setSeconds(settings.workDuration * 60);
    else if (mode === "break") setSeconds(settings.breakDuration * 60);
    else setSeconds(settings.longBreakDuration * 60);
  };

  const handleModeChange = (newMode: "work" | "break" | "longBreak") => {
    setIsActive(false);
    setMode(newMode);
    if (newMode === "work") setSeconds(settings.workDuration * 60);
    else if (newMode === "break") setSeconds(settings.breakDuration * 60);
    else setSeconds(settings.longBreakDuration * 60);
  };

  const getBgColor = () => {
    if (mode === "work") return "bg-red-500/10 dark:bg-red-900/20";
    if (mode === "break") return "bg-green-500/10 dark:bg-green-900/20";
    return "bg-blue-500/10 dark:bg-blue-900/20";
  };

  const getTextColor = () => {
    if (mode === "work") return "text-red-600 dark:text-red-400";
    if (mode === "break") return "text-green-600 dark:text-green-400";
    return "text-blue-600 dark:text-blue-400";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Pomodoro Timer</h1>
        <p className="text-universe-600 dark:text-universe-400">
          Stay focused and productive with the Pomodoro technique
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <Card className="glass-card card-hover">
            <CardContent className="p-6 flex flex-col items-center">
              <div className="flex gap-2 mb-8">
                <Button
                  variant={mode === "work" ? "default" : "outline"}
                  onClick={() => handleModeChange("work")}
                >
                  Focus
                </Button>
                <Button
                  variant={mode === "break" ? "default" : "outline"}
                  onClick={() => handleModeChange("break")}
                >
                  Short Break
                </Button>
                <Button
                  variant={mode === "longBreak" ? "default" : "outline"}
                  onClick={() => handleModeChange("longBreak")}
                >
                  Long Break
                </Button>
              </div>

              <div className={`rounded-full p-16 ${getBgColor()} mb-8`}>
                <div className={`text-7xl font-bold ${getTextColor()}`}>
                  {formatTime(seconds)}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={() => setIsActive(!isActive)}
                  className="h-14 w-14 rounded-full"
                >
                  {isActive ? (
                    <PauseFill className="h-6 w-6" />
                  ) : (
                    <PlayFill className="h-6 w-6" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleReset}
                  className="h-14 w-14 rounded-full"
                >
                  <ArrowClockwise className="h-6 w-6" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowSettings(!showSettings)}
                  className="h-14 w-14 rounded-full"
                >
                  <GearFill className="h-6 w-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3">
          <Card className="glass-card card-hover">
            <CardHeader>
              <CardTitle>Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Pomodoros Completed</span>
                  <span className="font-semibold">{pomodoroCount}</span>
                </div>
                <div className="h-2 bg-universe-200 dark:bg-universe-700 rounded-full">
                  <div
                    className="h-2 bg-universe-500 rounded-full"
                    style={{
                      width: `${(pomodoroCount % settings.longBreakInterval) * 25}%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs text-universe-500 mt-1">
                  {settings.longBreakInterval - (pomodoroCount % settings.longBreakInterval)} until long break
                </div>
              </div>

              <div className="pt-4">
                <h3 className="font-semibold mb-2">Today's Focus</h3>
                <div className="text-2xl font-bold">
                  {Math.floor(pomodoroCount * settings.workDuration / 60)} hrs{" "}
                  {(pomodoroCount * settings.workDuration) % 60} mins
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showSettings && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Timer Settings</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(false)}
              >
                <XLg />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Focus Duration: {settings.workDuration} minutes</Label>
                  <Slider
                    value={[settings.workDuration]}
                    min={1}
                    max={60}
                    step={1}
                    onValueChange={(value) =>
                      setSettings({ ...settings, workDuration: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Short Break: {settings.breakDuration} minutes</Label>
                  <Slider
                    value={[settings.breakDuration]}
                    min={1}
                    max={30}
                    step={1}
                    onValueChange={(value) =>
                      setSettings({ ...settings, breakDuration: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Long Break: {settings.longBreakDuration} minutes</Label>
                  <Slider
                    value={[settings.longBreakDuration]}
                    min={1}
                    max={60}
                    step={1}
                    onValueChange={(value) =>
                      setSettings({ ...settings, longBreakDuration: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>
                    Long Break Interval: Every {settings.longBreakInterval}{" "}
                    pomodoros
                  </Label>
                  <Slider
                    value={[settings.longBreakInterval]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) =>
                      setSettings({ ...settings, longBreakInterval: value[0] })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>Notification Volume: {settings.volume}%</Label>
                  <Slider
                    value={[settings.volume]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(value) =>
                      setSettings({ ...settings, volume: value[0] })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-start-breaks">Auto-start Breaks</Label>
                  <Switch
                    id="auto-start-breaks"
                    checked={settings.autoStartBreaks}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoStartBreaks: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="auto-start-pomodoros">Auto-start Pomodoros</Label>
                  <Switch
                    id="auto-start-pomodoros"
                    checked={settings.autoStartPomodoros}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, autoStartPomodoros: checked })
                    }
                  />
                </div>
              </div>

              <Button
                className="w-full"
                onClick={() => setShowSettings(false)}
              >
                Save Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Pomodoro;
