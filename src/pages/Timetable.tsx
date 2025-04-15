
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar3, PlusCircle, Trash, Google, ArrowRight } from "react-bootstrap-icons";
import { useToast } from "@/hooks/use-toast";

// Time slots for the timetable
const timeSlots = [
  "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"
];

// Days of the week
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

interface ClassEvent {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  color: string;
}

const colorOptions = [
  { name: "Blue", value: "bg-blue-100 border-blue-300 text-blue-800" },
  { name: "Green", value: "bg-green-100 border-green-300 text-green-800" },
  { name: "Purple", value: "bg-purple-100 border-purple-300 text-purple-800" },
  { name: "Yellow", value: "bg-yellow-100 border-yellow-300 text-yellow-800" },
  { name: "Red", value: "bg-red-100 border-red-300 text-red-800" },
  { name: "Gray", value: "bg-universe-200 border-universe-400 text-universe-700" }
];

const Timetable = () => {
  const [classes, setClasses] = useState<ClassEvent[]>([]);
  const [newClass, setNewClass] = useState<Partial<ClassEvent>>({
    day: "Monday",
    startTime: "9:00 AM",
    endTime: "10:00 AM",
    title: "",
    location: "",
    color: colorOptions[0].value
  });
  const { toast } = useToast();

  useEffect(() => {
    // Load saved classes from localStorage
    const savedClasses = localStorage.getItem("timetableClasses");
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
    } else {
      // Sample data for demonstration
      const sampleClasses = [
        {
          id: "class1",
          day: "Monday",
          startTime: "9:00 AM",
          endTime: "10:00 AM",
          title: "Computer Science",
          location: "Room 101",
          color: colorOptions[0].value
        },
        {
          id: "class2",
          day: "Wednesday",
          startTime: "1:00 PM",
          endTime: "3:00 PM",
          title: "Data Structures",
          location: "Lab 3",
          color: colorOptions[1].value
        },
        {
          id: "class3",
          day: "Friday",
          startTime: "11:00 AM",
          endTime: "12:00 PM",
          title: "Algorithms",
          location: "Room 202",
          color: colorOptions[2].value
        }
      ];
      setClasses(sampleClasses);
      localStorage.setItem("timetableClasses", JSON.stringify(sampleClasses));
    }
  }, []);

  const saveClasses = (updatedClasses: ClassEvent[]) => {
    setClasses(updatedClasses);
    localStorage.setItem("timetableClasses", JSON.stringify(updatedClasses));
  };

  const addClass = () => {
    // Validate form fields
    if (!newClass.title) {
      toast({
        title: "Missing information",
        description: "Please enter a class title",
        variant: "destructive"
      });
      return;
    }

    const newClassItem: ClassEvent = {
      id: `class_${Date.now()}`,
      day: newClass.day || "Monday",
      startTime: newClass.startTime || "9:00 AM",
      endTime: newClass.endTime || "10:00 AM",
      title: newClass.title || "",
      location: newClass.location || "",
      color: newClass.color || colorOptions[0].value
    };

    const updatedClasses = [...classes, newClassItem];
    saveClasses(updatedClasses);

    // Reset form
    setNewClass({
      day: "Monday",
      startTime: "9:00 AM",
      endTime: "10:00 AM",
      title: "",
      location: "",
      color: colorOptions[0].value
    });

    toast({
      title: "Class added",
      description: `${newClassItem.title} has been added to your timetable`
    });
  };

  const removeClass = (id: string) => {
    const updatedClasses = classes.filter(c => c.id !== id);
    saveClasses(updatedClasses);
    toast({
      title: "Class removed",
      description: "The class has been removed from your timetable"
    });
  };

  const getClassesForTimeSlot = (day: string, time: string) => {
    return classes.filter(c => {
      const timeIndex = timeSlots.indexOf(time);
      const startTimeIndex = timeSlots.indexOf(c.startTime);
      const endTimeIndex = timeSlots.indexOf(c.endTime);
      
      return c.day === day && timeIndex >= startTimeIndex && timeIndex < endTimeIndex;
    });
  };

  const isFirstSlotOfClass = (day: string, time: string, classItem: ClassEvent) => {
    return day === classItem.day && time === classItem.startTime;
  };

  const getClassDuration = (classItem: ClassEvent) => {
    const startIndex = timeSlots.indexOf(classItem.startTime);
    const endIndex = timeSlots.indexOf(classItem.endTime);
    return endIndex - startIndex;
  };

  const exportToGoogleCalendar = () => {
    toast({
      title: "Google Calendar",
      description: "This feature is coming soon. You'll be able to export your timetable to Google Calendar."
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Timetable</h1>
          <p className="text-universe-600 dark:text-universe-400">
            Manage your weekly class schedule
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2" /> Add Class
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Class Title
                  </Label>
                  <Input
                    id="title"
                    value={newClass.title}
                    onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                    className="col-span-3"
                    placeholder="e.g., Data Structures"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">
                    Day
                  </Label>
                  <Select 
                    value={newClass.day} 
                    onValueChange={(value) => setNewClass({ ...newClass, day: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="startTime" className="text-right">
                    Start Time
                  </Label>
                  <Select 
                    value={newClass.startTime} 
                    onValueChange={(value) => setNewClass({ ...newClass, startTime: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={`start-${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endTime" className="text-right">
                    End Time
                  </Label>
                  <Select 
                    value={newClass.endTime} 
                    onValueChange={(value) => setNewClass({ ...newClass, endTime: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select end time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={`end-${time}`} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newClass.location}
                    onChange={(e) => setNewClass({ ...newClass, location: e.target.value })}
                    className="col-span-3"
                    placeholder="e.g., Room 101"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="color" className="text-right">
                    Color
                  </Label>
                  <Select 
                    value={newClass.color} 
                    onValueChange={(value) => setNewClass({ ...newClass, color: value })}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((color) => (
                        <SelectItem key={color.name} value={color.value}>
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full ${color.value.split(' ')[0]}`} />
                            <span className="ml-2">{color.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button onClick={() => {
                  addClass();
                  document.querySelector<HTMLButtonElement>('[data-state="open"] button[aria-label="Close"]')?.click();
                }}>
                  Add Class
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={exportToGoogleCalendar}>
            <Google className="mr-2" /> Google Calendar
          </Button>
        </div>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Calendar3 className="h-5 w-5" /> Weekly Schedule
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <div className="min-w-[800px]">
              {/* Timetable header */}
              <div className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-universe-300 dark:border-universe-700">
                <div className="p-2 font-medium"></div>
                {days.map((day) => (
                  <div key={day} className="p-2 text-center font-medium">
                    {day}
                  </div>
                ))}
              </div>

              {/* Timetable body */}
              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-[100px_repeat(6,1fr)] border-b border-universe-200 dark:border-universe-800">
                  <div className="p-2 font-medium text-sm">{time}</div>
                  {days.map((day) => {
                    const classesInSlot = getClassesForTimeSlot(day, time);
                    return (
                      <div key={`${day}-${time}`} className="border-l border-universe-200 dark:border-universe-800 relative min-h-[50px]">
                        {classesInSlot.map((classItem) => {
                          if (isFirstSlotOfClass(day, time, classItem)) {
                            const duration = getClassDuration(classItem);
                            return (
                              <div 
                                key={classItem.id}
                                className={`absolute inset-0 m-1 p-2 rounded border ${classItem.color} flex flex-col`}
                                style={{ height: `calc(${duration * 100}% - 2px)` }}
                              >
                                <div className="flex justify-between items-start">
                                  <div className="font-medium text-sm">{classItem.title}</div>
                                  <button 
                                    onClick={() => removeClass(classItem.id)}
                                    className="text-universe-500 hover:text-red-500"
                                  >
                                    <Trash size={14} />
                                  </button>
                                </div>
                                <div className="text-xs mt-1">{classItem.location}</div>
                                <div className="text-xs text-universe-500 mt-auto">
                                  {classItem.startTime} - {classItem.endTime}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card mt-6">
        <CardHeader className="pb-2">
          <CardTitle>Google Calendar Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-medium mb-2">Sync your schedule with Google Calendar</h3>
              <p className="text-universe-600 dark:text-universe-400">
                Export your class schedule to Google Calendar to get reminders and access your timetable on all your devices.
              </p>
            </div>
            <Button onClick={exportToGoogleCalendar} className="md:self-start">
              Connect <ArrowRight className="ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card mt-6">
        <CardHeader className="pb-2">
          <CardTitle>Your Classes</CardTitle>
        </CardHeader>
        <CardContent>
          {classes.length === 0 ? (
            <div className="text-center py-8 text-universe-500">
              <Calendar3 className="h-12 w-12 mx-auto mb-4 text-universe-400" />
              <p>No classes added yet. Click "Add Class" to create your timetable.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {classes.map((classItem) => (
                <div 
                  key={classItem.id}
                  className={`p-4 rounded-lg border ${classItem.color}`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{classItem.title}</h3>
                    <button 
                      onClick={() => removeClass(classItem.id)} 
                      className="text-universe-500 hover:text-red-500"
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                  <p className="text-sm mt-1">{classItem.location}</p>
                  <div className="flex justify-between mt-3 text-sm text-universe-600 dark:text-universe-400">
                    <span>{classItem.day}</span>
                    <span>{classItem.startTime} - {classItem.endTime}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Timetable;
