
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ExpenseTracker from "@/components/expenses/ExpenseTracker";
import BudgetPlanner from "@/components/expenses/BudgetPlanner";
import ExpenseAnalytics from "@/components/expenses/ExpenseAnalytics";
import ExpenseCategories from "@/components/expenses/ExpenseCategories";

const Expenses = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("tracker");

  useEffect(() => {
    // Load any saved expense data from localStorage
    const loadSavedData = () => {
      try {
        console.log("Expenses component initialized");
      } catch (error) {
        console.error("Failed to load expense data:", error);
      }
    };

    loadSavedData();
  }, []);

  const handleAddExpense = () => {
    toast({
      title: "Expense Added",
      description: "Your expense has been recorded successfully",
      duration: 3000,
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Expense Manager</h1>
        <p className="text-universe-600 dark:text-universe-400 mt-2">
          Track your expenses, manage your budget, and analyze your spending habits
        </p>
      </div>

      <Tabs
        defaultValue="tracker"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="tracker">Expense Tracker</TabsTrigger>
          <TabsTrigger value="budget">Budget Planner</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="tracker" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Track Your Expenses</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseTracker onAddExpense={handleAddExpense} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Budget Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <BudgetPlanner />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Expense Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseAnalytics />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <ExpenseCategories />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Expenses;
