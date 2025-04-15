
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type WorkoutEntry = {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weight: number;
  date: string;
};

const EXERCISE_TYPES = [
  "Bench Press", "Squat", "Deadlift", "Pull-up", "Push-up",
  "Shoulder Press", "Bicep Curl", "Tricep Extension", "Leg Press", 
  "Leg Curl", "Calf Raise", "Lat Pulldown", "Row", "Plank"
];

const WorkoutTracker: React.FC = () => {
  const { toast } = useToast();
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>(() => {
    const saved = localStorage.getItem("fitness_workouts");
    return saved ? JSON.parse(saved) : [];
  });
  
  const [exercise, setExercise] = useState<string>("");
  const [sets, setSets] = useState<number>(3);
  const [reps, setReps] = useState<number>(10);
  const [weight, setWeight] = useState<number>(0);

  const handleAddWorkout = () => {
    if (!exercise) {
      toast({
        title: "Missing Information",
        description: "Please select an exercise",
        variant: "destructive",
      });
      return;
    }

    const newWorkout: WorkoutEntry = {
      id: Date.now().toString(),
      exercise,
      sets,
      reps,
      weight,
      date: new Date().toLocaleDateString(),
    };

    const updatedWorkouts = [...workouts, newWorkout];
    setWorkouts(updatedWorkouts);
    localStorage.setItem("fitness_workouts", JSON.stringify(updatedWorkouts));

    // Reset form
    setExercise("");
    setSets(3);
    setReps(10);
    setWeight(0);

    toast({
      title: "Workout Added",
      description: `Added ${exercise} to your workout log`,
    });
  };

  const handleRemoveWorkout = (id: string) => {
    const updatedWorkouts = workouts.filter(workout => workout.id !== id);
    setWorkouts(updatedWorkouts);
    localStorage.setItem("fitness_workouts", JSON.stringify(updatedWorkouts));
    
    toast({
      title: "Workout Removed",
      description: "Workout entry has been deleted",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="exercise" className="block text-sm font-medium mb-1">Exercise</label>
            <Select value={exercise} onValueChange={setExercise}>
              <SelectTrigger>
                <SelectValue placeholder="Select exercise" />
              </SelectTrigger>
              <SelectContent>
                {EXERCISE_TYPES.map((ex) => (
                  <SelectItem key={ex} value={ex}>{ex}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label htmlFor="sets" className="block text-sm font-medium mb-1">Sets</label>
              <Input 
                id="sets" 
                type="number" 
                min="1"
                value={sets}
                onChange={(e) => setSets(parseInt(e.target.value) || 0)} 
              />
            </div>
            <div>
              <label htmlFor="reps" className="block text-sm font-medium mb-1">Reps</label>
              <Input 
                id="reps" 
                type="number" 
                min="1"
                value={reps}
                onChange={(e) => setReps(parseInt(e.target.value) || 0)} 
              />
            </div>
            <div>
              <label htmlFor="weight" className="block text-sm font-medium mb-1">Weight (kg)</label>
              <Input 
                id="weight" 
                type="number" 
                min="0"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value) || 0)} 
              />
            </div>
          </div>
          
          <Button onClick={handleAddWorkout} className="w-full">Add Exercise</Button>
        </div>
        
        <div className="bg-universe-100 dark:bg-universe-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Today's Focus</h3>
          <p className="text-universe-600 dark:text-universe-400 mb-2">Suggested exercises for today:</p>
          <ul className="list-disc pl-5 space-y-1 text-sm">
            <li>Upper body strength training</li>
            <li>Core workout (15 minutes)</li>
            <li>Light cardio (20-30 minutes)</li>
          </ul>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium mb-3">Recent Workouts</h3>
        {workouts.length > 0 ? (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exercise</TableHead>
                  <TableHead className="text-center">Sets</TableHead>
                  <TableHead className="text-center">Reps</TableHead>
                  <TableHead className="text-center">Weight (kg)</TableHead>
                  <TableHead className="text-center">Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {workouts.map((workout) => (
                  <TableRow key={workout.id}>
                    <TableCell>{workout.exercise}</TableCell>
                    <TableCell className="text-center">{workout.sets}</TableCell>
                    <TableCell className="text-center">{workout.reps}</TableCell>
                    <TableCell className="text-center">{workout.weight}</TableCell>
                    <TableCell className="text-center">{workout.date}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleRemoveWorkout(workout.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <p className="text-universe-500 text-center py-4">No workouts logged yet. Add your first workout above!</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutTracker;
