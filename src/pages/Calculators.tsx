
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, PlusCircle, Trash } from "react-bootstrap-icons";

// CGPA Calculator
const CGPACalculator = () => {
  const [courses, setCourses] = useState([
    { name: "Course 1", credits: 3, grade: "A" },
    { name: "Course 2", credits: 4, grade: "B+" },
    { name: "Course 3", credits: 3, grade: "A-" },
  ]);
  const [cgpa, setCGPA] = useState<number | null>(null);
  const [totalCredits, setTotalCredits] = useState<number>(0);

  const gradePoints = {
    "A+": 4.0,
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    "D+": 1.3,
    D: 1.0,
    F: 0.0,
  };

  const addCourse = () => {
    setCourses([...courses, { name: `Course ${courses.length + 1}`, credits: 3, grade: "A" }]);
  };

  const removeCourse = (index: number) => {
    const newCourses = [...courses];
    newCourses.splice(index, 1);
    setCourses(newCourses);
  };

  const updateCourse = (index: number, field: string, value: string | number) => {
    const newCourses = [...courses];
    newCourses[index] = { ...newCourses[index], [field]: value };
    setCourses(newCourses);
  };

  const calculateCGPA = () => {
    let totalPoints = 0;
    let credits = 0;

    courses.forEach((course) => {
      const grade = course.grade as keyof typeof gradePoints;
      const courseCredits = Number(course.credits);
      totalPoints += gradePoints[grade] * courseCredits;
      credits += courseCredits;
    });

    if (credits > 0) {
      setCGPA(Number((totalPoints / credits).toFixed(2)));
      setTotalCredits(credits);
    } else {
      setCGPA(0);
      setTotalCredits(0);
    }
  };

  const getGradeColor = (grade: string) => {
    const gradeValue = gradePoints[grade as keyof typeof gradePoints] || 0;
    if (gradeValue >= 3.7) return "text-green-600 dark:text-green-400";
    if (gradeValue >= 3.0) return "text-blue-600 dark:text-blue-400";
    if (gradeValue >= 2.0) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getCGPAColor = (cgpa: number) => {
    if (cgpa >= 3.7) return "text-green-600 dark:text-green-400";
    if (cgpa >= 3.0) return "text-blue-600 dark:text-blue-400";
    if (cgpa >= 2.0) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" /> CGPA Calculator
        </CardTitle>
        <CardDescription>
          Calculate your Cumulative Grade Point Average
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            {courses.map((course, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Course Name"
                    value={course.name}
                    onChange={(e) => updateCourse(index, "name", e.target.value)}
                  />
                </div>
                <div className="w-20">
                  <Input
                    type="number"
                    placeholder="Credits"
                    min="1"
                    max="6"
                    value={course.credits}
                    onChange={(e) => updateCourse(index, "credits", e.target.value)}
                  />
                </div>
                <div className="w-24">
                  <Select
                    value={course.grade}
                    onValueChange={(value) => updateCourse(index, "grade", value)}
                  >
                    <SelectTrigger className={getGradeColor(course.grade)}>
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(gradePoints).map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCourse(index)}
                >
                  <Trash className="text-red-500" />
                </Button>
              </div>
            ))}
          </div>

          <Button variant="outline" onClick={addCourse} className="w-full">
            <PlusCircle className="mr-2" /> Add Course
          </Button>

          <Button onClick={calculateCGPA} className="w-full">
            Calculate CGPA
          </Button>

          {cgpa !== null && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-universe-800/50">
              <div className="text-center">
                <div className="text-sm text-universe-500 mb-1">Your CGPA</div>
                <div className={`text-3xl font-bold ${getCGPAColor(cgpa)}`}>
                  {cgpa}
                </div>
                <div className="text-sm text-universe-500 mt-1">
                  Total Credits: {totalCredits}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Attendance Calculator
const AttendanceCalculator = () => {
  const [totalClasses, setTotalClasses] = useState(60);
  const [attendedClasses, setAttendedClasses] = useState(48);
  const [targetPercentage, setTargetPercentage] = useState(75);
  const [result, setResult] = useState<string | null>(null);

  const calculateAttendance = () => {
    const currentPercentage = (attendedClasses / totalClasses) * 100;
    const classesNeeded = Math.ceil(
      (targetPercentage * totalClasses - 100 * attendedClasses) / (100 - targetPercentage)
    );

    if (currentPercentage >= targetPercentage) {
      setResult(
        `You have ${currentPercentage.toFixed(
          2
        )}% attendance. You can miss ${Math.floor(
          (attendedClasses - (targetPercentage / 100) * totalClasses) /
            (targetPercentage / 100)
        )} more classes and still meet your target.`
      );
    } else {
      setResult(
        `You have ${currentPercentage.toFixed(
          2
        )}% attendance. You need to attend ${classesNeeded} more classes to reach ${targetPercentage}% attendance.`
      );
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" /> Attendance Calculator
        </CardTitle>
        <CardDescription>
          Calculate your attendance percentage and required classes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="total-classes">Total Classes</Label>
            <Input
              id="total-classes"
              type="number"
              value={totalClasses}
              onChange={(e) => setTotalClasses(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="attended-classes">Classes Attended</Label>
            <Input
              id="attended-classes"
              type="number"
              value={attendedClasses}
              onChange={(e) => setAttendedClasses(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="target-percentage">Target Percentage (%)</Label>
            <Input
              id="target-percentage"
              type="number"
              value={targetPercentage}
              onChange={(e) => setTargetPercentage(Number(e.target.value))}
            />
          </div>

          <Button onClick={calculateAttendance} className="w-full">
            Calculate
          </Button>

          {result && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-universe-800/50">
              <p>{result}</p>
              <div className="mt-2">
                <div className="flex justify-between text-sm text-universe-500 mb-1">
                  <span>Current</span>
                  <span>{((attendedClasses / totalClasses) * 100).toFixed(1)}%</span>
                </div>
                <div className="h-2 bg-universe-200 dark:bg-universe-700 rounded-full">
                  <div
                    className={`h-2 rounded-full ${
                      (attendedClasses / totalClasses) * 100 >= targetPercentage
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                    style={{
                      width: `${(attendedClasses / totalClasses) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-sm text-universe-500 mt-1">
                  <span>Target</span>
                  <span>{targetPercentage}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Main Calculator Page
const Calculators = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Academic Calculators</h1>
        <p className="text-universe-600 dark:text-universe-400">
          Tools to help you track your academic progress
        </p>
      </div>

      <Tabs defaultValue="cgpa" className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="cgpa">CGPA Calculator</TabsTrigger>
          <TabsTrigger value="attendance">Attendance Calculator</TabsTrigger>
        </TabsList>
        <TabsContent value="cgpa">
          <CGPACalculator />
        </TabsContent>
        <TabsContent value="attendance">
          <AttendanceCalculator />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Calculators;
