
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import WorkoutTracker from "@/components/fitness/WorkoutTracker";
import DailyGoals from "@/components/fitness/DailyGoals";
import WeeklyProgress from "@/components/fitness/WeeklyProgress";
import ExerciseLibrary from "@/components/fitness/ExerciseLibrary";

const Fitness = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("tracker");

  useEffect(() => {
    // Load any saved fitness data from localStorage
    const loadSavedData = () => {
      try {
        // Just to show we're initializing the component
        console.log("Fitness component initialized");
      } catch (error) {
        console.error("Failed to load fitness data:", error);
      }
    };

    loadSavedData();
  }, []);

  const handleAddWorkout = () => {
    toast({
      title: "Workout Added",
      description: "Your workout has been logged successfully",
      duration: 3000,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Fitness Hub</h1>
        <p className="text-universe-600 dark:text-universe-400 mt-2">
          Track your workouts, set goals, and monitor your progress
        </p>
      </div>

      <Tabs
        defaultValue="tracker"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="tracker">Workout Tracker</TabsTrigger>
          <TabsTrigger value="goals">Daily Goals</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="exercises">Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="tracker" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle>Track Your Workout</CardTitle>
                <Button onClick={handleAddWorkout}>Add Workout</Button>
              </div>
            </CardHeader>
            <CardContent>
              <WorkoutTracker />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Daily Fitness Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <DailyGoals />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Weekly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <WeeklyProgress />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="exercises" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Exercise Library</CardTitle>
            </CardHeader>
            <CardContent>
              <ExerciseLibrary />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fitness;
