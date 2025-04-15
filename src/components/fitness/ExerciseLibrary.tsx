
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

type Exercise = {
  id: string;
  name: string;
  target: string;
  equipment: string;
  difficulty: string;
  instructions: string[];
  image?: string;
};

const EXERCISE_DATA: Exercise[] = [
  {
    id: "1",
    name: "Bench Press",
    target: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    instructions: [
      "Lie on a flat bench with your feet on the ground.",
      "Grip the barbell with hands slightly wider than shoulder-width apart.",
      "Unrack the bar and lower it to your chest.",
      "Press the bar back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    image: "https://placekitten.com/300/200" // Placeholder image
  },
  {
    id: "2",
    name: "Squat",
    target: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    instructions: [
      "Stand with your feet shoulder-width apart.",
      "Place the barbell across your upper back, resting on your traps.",
      "Bend at the knees and hips to lower your body.",
      "Keep your chest up and back straight.",
      "Lower until your thighs are parallel to the ground.",
      "Push through your heels to return to the starting position."
    ],
    image: "https://placekitten.com/300/201" // Placeholder image
  },
  {
    id: "3",
    name: "Pull-up",
    target: "Back",
    equipment: "Body Weight",
    difficulty: "Advanced",
    instructions: [
      "Grip a pull-up bar with hands slightly wider than shoulder-width.",
      "Hang with arms fully extended.",
      "Pull your body up until your chin is above the bar.",
      "Lower your body back to the starting position with control.",
      "Repeat for the desired number of repetitions."
    ],
    image: "https://placekitten.com/300/202" // Placeholder image
  },
  {
    id: "4",
    name: "Push-up",
    target: "Chest",
    equipment: "Body Weight",
    difficulty: "Beginner",
    instructions: [
      "Start in a plank position with hands slightly wider than shoulder-width.",
      "Keep your body in a straight line from head to heels.",
      "Lower your chest to the ground by bending your elbows.",
      "Push back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    image: "https://placekitten.com/300/203" // Placeholder image
  },
  {
    id: "5",
    name: "Deadlift",
    target: "Back",
    equipment: "Barbell",
    difficulty: "Advanced",
    instructions: [
      "Stand with feet hip-width apart, barbell over your mid-foot.",
      "Bend at the hips and knees to grip the bar with hands shoulder-width apart.",
      "Keep your back straight and chest up.",
      "Drive through your heels to stand up, lifting the bar.",
      "Lower the bar back to the ground with control."
    ],
    image: "https://placekitten.com/300/204" // Placeholder image
  },
  {
    id: "6",
    name: "Plank",
    target: "Core",
    equipment: "Body Weight",
    difficulty: "Beginner",
    instructions: [
      "Start in a push-up position, then bend your elbows 90° and rest your weight on your forearms.",
      "Keep your body in a straight line from head to heels.",
      "Engage your core and hold the position.",
      "Breathe normally and hold for the designated time."
    ],
    image: "https://placekitten.com/300/205" // Placeholder image
  },
];

const ExerciseLibrary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTarget, setFilterTarget] = useState("All");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const targetMuscleGroups = ["All", "Chest", "Back", "Legs", "Shoulders", "Arms", "Core"];
  const difficultyLevels = ["All", "Beginner", "Intermediate", "Advanced"];

  const filteredExercises = EXERCISE_DATA.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTarget = filterTarget === "All" || exercise.target === filterTarget;
    const matchesDifficulty = filterDifficulty === "All" || exercise.difficulty === filterDifficulty;
    
    return matchesSearch && matchesTarget && matchesDifficulty;
  });

  return (
    <div>
      <div className="mb-6 space-y-4">
        <Input
          placeholder="Search exercises..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={filterTarget} onValueChange={setFilterTarget}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by muscle group" />
            </SelectTrigger>
            <SelectContent>
              {targetMuscleGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by difficulty" />
            </SelectTrigger>
            <SelectContent>
              {difficultyLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="grid">
        <TabsList className="mb-4">
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="detail">
            {selectedExercise ? selectedExercise.name : "Exercise Details"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredExercises.length > 0 ? (
              filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="border border-universe-200 dark:border-universe-700 rounded-lg overflow-hidden cursor-pointer hover:border-universe-400 transition-all duration-200 hover:shadow-md"
                  onClick={() => setSelectedExercise(exercise)}
                >
                  <div className="bg-universe-100 dark:bg-universe-800 h-32 flex items-center justify-center">
                    <span className="text-4xl">{exercise.target === "Chest" ? "💪" : exercise.target === "Back" ? "🔙" : exercise.target === "Legs" ? "🦵" : exercise.target === "Core" ? "⭕" : "🏋️"}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{exercise.name}</h3>
                    <div className="flex justify-between mt-2 text-sm text-universe-500">
                      <span>{exercise.target}</span>
                      <span>{exercise.difficulty}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-universe-500">No exercises found matching your criteria.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="detail">
          {selectedExercise ? (
            <div className="border border-universe-200 dark:border-universe-700 rounded-lg overflow-hidden">
              <div className="bg-universe-100 dark:bg-universe-800 h-48 flex items-center justify-center">
                <span className="text-6xl">{selectedExercise.target === "Chest" ? "💪" : selectedExercise.target === "Back" ? "🔙" : selectedExercise.target === "Legs" ? "🦵" : selectedExercise.target === "Core" ? "⭕" : "🏋️"}</span>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedExercise.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-universe-100 dark:bg-universe-800 rounded text-sm">
                    {selectedExercise.target}
                  </span>
                  <span className="px-2 py-1 bg-universe-100 dark:bg-universe-800 rounded text-sm">
                    {selectedExercise.equipment}
                  </span>
                  <span className="px-2 py-1 bg-universe-100 dark:bg-universe-800 rounded text-sm">
                    {selectedExercise.difficulty}
                  </span>
                </div>
                
                <h3 className="font-medium mb-2 text-lg">Instructions:</h3>
                <ol className="list-decimal pl-5 space-y-2 mb-6">
                  {selectedExercise.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                
                {/* Back button for mobile */}
                <button 
                  onClick={() => setSelectedExercise(null)} 
                  className="text-universe-500 hover:text-universe-700 text-sm md:hidden"
                >
                  ← Back to exercises
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-universe-500">Select an exercise to view details.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExerciseLibrary;
