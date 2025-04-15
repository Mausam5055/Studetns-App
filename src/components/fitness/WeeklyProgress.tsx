
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const weeklyWorkoutData = [
  { day: "Mon", workouts: 2, duration: 45, calories: 320 },
  { day: "Tue", workouts: 1, duration: 30, calories: 220 },
  { day: "Wed", workouts: 3, duration: 60, calories: 450 },
  { day: "Thu", workouts: 0, duration: 0, calories: 0 },
  { day: "Fri", workouts: 2, duration: 50, calories: 380 },
  { day: "Sat", workouts: 1, duration: 40, calories: 300 },
  { day: "Sun", workouts: 0, duration: 0, calories: 0 },
];

const calorieData = [
  { date: "Week 1", calories: 1800 },
  { date: "Week 2", calories: 2100 },
  { date: "Week 3", calories: 1950 },
  { date: "Week 4", calories: 2400 },
];

const WeeklyProgress: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-universe-500 mb-1">Total Workouts</p>
              <p className="text-3xl font-bold">9</p>
              <p className="text-xs text-green-500 mt-1">+2 from last week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-universe-500 mb-1">Active Minutes</p>
              <p className="text-3xl font-bold">225</p>
              <p className="text-xs text-green-500 mt-1">+45 from last week</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm text-universe-500 mb-1">Calories Burned</p>
              <p className="text-3xl font-bold">1,670</p>
              <p className="text-xs text-green-500 mt-1">+220 from last week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Weekly Workout Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyWorkoutData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Bar dataKey="duration" name="Minutes" fill="#9b87f5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Monthly Calories Burned</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={calorieData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888" strokeOpacity={0.2} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#8B5CF6" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeeklyProgress;
