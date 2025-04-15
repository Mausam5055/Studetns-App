
import React, { useState, useEffect } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Circle, Edit2 } from "lucide-react";

type Goal = {
  id: string;
  name: string;
  target: number;
  current: number;
  unit: string;
  completed: boolean;
};

const DEFAULT_GOALS: Goal[] = [
  { id: '1', name: 'Daily Steps', target: 10000, current: 4200, unit: 'steps', completed: false },
  { id: '2', name: 'Water Intake', target: 8, current: 3, unit: 'glasses', completed: false },
  { id: '3', name: 'Active Minutes', target: 30, current: 15, unit: 'mins', completed: false },
  { id: '4', name: 'Stretching', target: 1, current: 0, unit: 'session', completed: false },
];

const DailyGoals: React.FC = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem("fitness_goals");
    return saved ? JSON.parse(saved) : DEFAULT_GOALS;
  });
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<number>(0);

  useEffect(() => {
    localStorage.setItem("fitness_goals", JSON.stringify(goals));
  }, [goals]);

  const handleUpdateProgress = (goalId: string, value: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedCurrent = Math.min(value, goal.target);
        const completed = updatedCurrent >= goal.target;
        
        if (completed && !goal.completed) {
          toast({
            title: "Goal Achieved! 🎉",
            description: `You've completed your ${goal.name.toLowerCase()} goal for today!`,
          });
        }
        
        return { ...goal, current: updatedCurrent, completed };
      }
      return goal;
    }));
    setEditingGoalId(null);
  };

  const startEditing = (goal: Goal) => {
    setEditingGoalId(goal.id);
    setEditValue(goal.current);
  };

  const toggleComplete = (goalId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCompleted = !goal.completed;
        const newCurrent = newCompleted ? goal.target : 0;
        
        if (newCompleted) {
          toast({
            title: "Goal Achieved! 🎉",
            description: `You've completed your ${goal.name.toLowerCase()} goal for today!`,
          });
        }
        
        return { ...goal, completed: newCompleted, current: newCurrent };
      }
      return goal;
    }));
  };

  const getProgressPercentage = (current: number, target: number) => {
    return Math.min(Math.round((current / target) * 100), 100);
  };

  return (
    <div className="space-y-6">
      <div className="bg-universe-100 dark:bg-universe-800/50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium mb-2">Daily Goal Progress</h3>
        <p className="text-sm text-universe-600 dark:text-universe-400">
          Track your daily activity goals and mark them as complete when you've finished.
          Click on a goal to update your progress.
        </p>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border border-universe-200 dark:border-universe-700 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleComplete(goal.id)}
                  className="text-universe-500 hover:text-universe-700 dark:hover:text-universe-300"
                >
                  {goal.completed ? 
                    <CheckCircle2 className="h-5 w-5 text-green-500" /> : 
                    <Circle className="h-5 w-5" />
                  }
                </button>
                <h4 className={`font-medium ${goal.completed ? 'line-through text-universe-400' : ''}`}>
                  {goal.name}
                </h4>
              </div>
              
              {editingGoalId !== goal.id && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => startEditing(goal)}
                  className="h-8 px-2"
                >
                  <Edit2 className="h-4 w-4 mr-1" />
                  Update
                </Button>
              )}
            </div>
            
            {editingGoalId === goal.id ? (
              <div className="flex items-center gap-3 mt-3">
                <Slider 
                  value={[editValue]} 
                  max={goal.target} 
                  step={1}
                  onValueChange={(values) => setEditValue(values[0])} 
                  className="flex-1"
                />
                <Input 
                  type="number" 
                  value={editValue}
                  onChange={(e) => setEditValue(Number(e.target.value))}
                  className="w-20" 
                />
                <Button 
                  size="sm"
                  onClick={() => handleUpdateProgress(goal.id, editValue)}
                >
                  Save
                </Button>
              </div>
            ) : (
              <>
                <Progress 
                  value={getProgressPercentage(goal.current, goal.target)}
                  className={`h-2 ${goal.completed ? 'bg-green-200 dark:bg-green-900' : ''}`}
                />
                <div className="flex justify-between mt-1 text-sm">
                  <span className={goal.completed ? 'text-green-600 dark:text-green-400' : ''}>
                    {goal.current} / {goal.target} {goal.unit}
                  </span>
                  <span className="text-universe-500">
                    {getProgressPercentage(goal.current, goal.target)}%
                  </span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Button variant="outline" className="w-full">
          Reset Today's Goals
        </Button>
      </div>
    </div>
  );
};

export default DailyGoals;
