
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  PlusCircle,
  Trash,
  Calendar3,
  CheckCircleFill,
  ExclamationTriangle,
  Clock,
} from "react-bootstrap-icons";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  date: string;
  priority: "low" | "medium" | "high";
  category: string;
}

const initialCategories = [
  "Homework",
  "Exam Preparation",
  "Projects",
  "Reading",
  "Miscellaneous",
];

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskDate, setNewTaskDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [newTaskCategory, setNewTaskCategory] = useState(initialCategories[0]);
  const [categories, setCategories] = useState<string[]>(initialCategories);
  const [newCategory, setNewCategory] = useState("");
  const [filter, setFilter] = useState("all");
  const { toast } = useToast();

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    const savedCategories = localStorage.getItem("taskCategories");
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Save categories to localStorage whenever categories change
  useEffect(() => {
    localStorage.setItem("taskCategories", JSON.stringify(categories));
  }, [categories]);

  const addTask = () => {
    if (!newTask.trim()) {
      toast({
        title: "Error",
        description: "Task title cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask,
      completed: false,
      date: newTaskDate,
      priority: newTaskPriority,
      category: newTaskCategory,
    };

    setTasks([...tasks, task]);
    setNewTask("");
    
    toast({
      title: "Task added",
      description: "Your new task has been added",
    });
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Your task has been deleted",
    });
  };

  const addCategory = () => {
    if (!newCategory.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    if (categories.includes(newCategory)) {
      toast({
        title: "Error",
        description: "This category already exists",
        variant: "destructive",
      });
      return;
    }

    setCategories([...categories, newCategory]);
    setNewCategory("");
    toast({
      title: "Category added",
      description: "Your new category has been added",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 dark:text-red-400";
      case "medium":
        return "text-yellow-500 dark:text-yellow-400";
      case "low":
        return "text-green-500 dark:text-green-400";
      default:
        return "";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <ExclamationTriangle className="text-red-500 dark:text-red-400" />;
      case "medium":
        return <Clock className="text-yellow-500 dark:text-yellow-400" />;
      case "low":
        return <CheckCircleFill className="text-green-500 dark:text-green-400" />;
      default:
        return null;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    if (filter === "today")
      return task.date === new Date().toISOString().split("T")[0];
    if (filter === "upcoming")
      return new Date(task.date) > new Date();
    if (filter === "overdue")
      return new Date(task.date) < new Date() && !task.completed;
    return task.category === filter;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Tasks</h1>
        <p className="text-universe-600 dark:text-universe-400">
          Manage your tasks and to-do lists
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="glass-card card-hover mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Add New Task</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="What needs to be done?"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={addTask}>
                    <PlusCircle className="mr-2" /> Add
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-universe-500 mb-1 block">
                      Due Date
                    </label>
                    <Input
                      type="date"
                      value={newTaskDate}
                      onChange={(e) => setNewTaskDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-universe-500 mb-1 block">
                      Priority
                    </label>
                    <Select
                      value={newTaskPriority}
                      onValueChange={(value: "low" | "medium" | "high") =>
                        setNewTaskPriority(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-universe-500 mb-1 block">
                      Category
                    </label>
                    <Select
                      value={newTaskCategory}
                      onValueChange={setNewTaskCategory}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
            <div className="overflow-x-auto">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="today">Today</TabsTrigger>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="overdue">Overdue</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value={filter}>
              <Card className="glass-card">
                <CardHeader className="pb-2">
                  <CardTitle>
                    {filter.charAt(0).toUpperCase() + filter.slice(1)} Tasks{" "}
                    <span className="text-universe-500">
                      ({filteredTasks.length})
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-8 text-universe-500">
                      <div className="text-4xl mb-2">📋</div>
                      <p>No tasks found. Add a new task to get started!</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredTasks.map((task) => (
                        <div
                          key={task.id}
                          className={`flex items-center gap-2 p-2 rounded-md transition-all ${
                            task.completed
                              ? "bg-universe-100/50 dark:bg-universe-800/20"
                              : "bg-white dark:bg-universe-800/50"
                          }`}
                        >
                          <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => toggleTaskCompletion(task.id)}
                          />
                          <div className="flex-1 overflow-hidden">
                            <div
                              className={`${
                                task.completed
                                  ? "line-through text-universe-500"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </div>
                            <div className="flex items-center gap-3 text-xs text-universe-500">
                              <div className="flex items-center gap-1">
                                <Calendar3 className="h-3 w-3" />
                                {task.date}
                              </div>
                              <div className="flex items-center gap-1">
                                {getPriorityIcon(task.priority)}
                                <span className={getPriorityColor(task.priority)}>
                                  {task.priority.charAt(0).toUpperCase() +
                                    task.priority.slice(1)}
                                </span>
                              </div>
                              <div>{task.category}</div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTask(task.id)}
                          >
                            <Trash className="h-4 w-4 text-universe-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="glass-card card-hover mb-6">
            <CardHeader className="pb-2">
              <CardTitle>Categories</CardTitle>
              <CardDescription>
                Organize your tasks with categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="New category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <Button variant="outline" onClick={addCategory}>
                    Add
                  </Button>
                </div>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={filter === category ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setFilter(category)}
                    >
                      {category}
                      <span className="ml-auto bg-universe-200 dark:bg-universe-700 text-universe-700 dark:text-universe-200 rounded-full px-2 py-0.5 text-xs">
                        {tasks.filter((task) => task.category === category).length}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Task Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span>Completed</span>
                    <span>
                      {tasks.filter((task) => task.completed).length}/{tasks.length}
                    </span>
                  </div>
                  <div className="h-2 bg-universe-200 dark:bg-universe-700 rounded-full">
                    <div
                      className="h-2 bg-green-500 rounded-full"
                      style={{
                        width: `${
                          tasks.length
                            ? (tasks.filter((task) => task.completed).length /
                                tasks.length) *
                              100
                            : 0
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2">Priority Breakdown</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <ExclamationTriangle className="text-red-500" /> High
                      </span>
                      <span>{tasks.filter((task) => task.priority === "high").length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="text-yellow-500" /> Medium
                      </span>
                      <span>{tasks.filter((task) => task.priority === "medium").length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <CheckCircleFill className="text-green-500" /> Low
                      </span>
                      <span>{tasks.filter((task) => task.priority === "low").length}</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-universe-500 pt-2 border-t border-universe-200 dark:border-universe-700">
                  <p>Due today: {tasks.filter(task => task.date === new Date().toISOString().split("T")[0]).length}</p>
                  <p>Overdue: {tasks.filter(task => new Date(task.date) < new Date() && !task.completed).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
