
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, PlusCircle, DollarSign, BarChart3, PieChart } from "lucide-react";

type BudgetItem = {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
};

const DEFAULT_BUDGET_CATEGORIES = [
  "Food", "Transportation", "Entertainment", "Education", 
  "Housing", "Utilities", "Health", "Shopping", "Other"
];

const BudgetPlanner = () => {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([]);
  const [totalBudget, setTotalBudget] = useState<number>(0);
  const [newBudgetCategory, setNewBudgetCategory] = useState<string>("");
  const [newBudgetAmount, setNewBudgetAmount] = useState<number>(0);

  useEffect(() => {
    // Load budget items from localStorage
    const savedBudget = localStorage.getItem("budgetItems");
    if (savedBudget) {
      setBudgetItems(JSON.parse(savedBudget));
    } else {
      // Initialize with default categories if nothing is saved
      const initialBudget = DEFAULT_BUDGET_CATEGORIES.map(category => ({
        id: crypto.randomUUID(),
        category,
        budgeted: 0,
        spent: 0
      }));
      setBudgetItems(initialBudget);
    }
    
    // Load expenses to calculate spending by category
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      const expenses = JSON.parse(savedExpenses);
      updateSpentAmounts(expenses);
    }
  }, []);

  useEffect(() => {
    // Save budget items to localStorage
    localStorage.setItem("budgetItems", JSON.stringify(budgetItems));
    // Calculate total budget
    const total = budgetItems.reduce((sum, item) => sum + item.budgeted, 0);
    setTotalBudget(total);
  }, [budgetItems]);

  const updateSpentAmounts = (expenses: any[]) => {
    const spentByCategory: Record<string, number> = {};
    
    expenses.forEach(expense => {
      if (spentByCategory[expense.category]) {
        spentByCategory[expense.category] += expense.amount;
      } else {
        spentByCategory[expense.category] = expense.amount;
      }
    });

    setBudgetItems(prevItems => 
      prevItems.map(item => ({
        ...item,
        spent: spentByCategory[item.category] || 0
      }))
    );
  };

  const handleUpdateBudget = (id: string, value: number) => {
    setBudgetItems(prevItems =>
      prevItems.map(item => 
        item.id === id 
          ? { ...item, budgeted: value } 
          : item
      )
    );
  };

  const handleAddCategory = () => {
    if (!newBudgetCategory.trim()) {
      alert("Please enter a category name");
      return;
    }

    const exists = budgetItems.some(
      item => item.category.toLowerCase() === newBudgetCategory.toLowerCase()
    );

    if (exists) {
      alert("This category already exists");
      return;
    }

    const newItem: BudgetItem = {
      id: crypto.randomUUID(),
      category: newBudgetCategory,
      budgeted: newBudgetAmount,
      spent: 0
    };

    setBudgetItems([...budgetItems, newItem]);
    setNewBudgetCategory("");
    setNewBudgetAmount(0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const calculateProgress = (spent: number, budgeted: number) => {
    if (budgeted === 0) return 0;
    return Math.min(Math.round((spent / budgeted) * 100), 100);
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Monthly Budget</h3>
          <div className="flex items-center">
            <span className="font-medium">Total: </span>
            <span className="ml-2 font-bold">{formatCurrency(totalBudget)}</span>
          </div>
        </div>
        
        <div className="space-y-4">
          {budgetItems.map(item => (
            <div key={item.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>{item.category}</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">
                    {formatCurrency(item.spent)} / {formatCurrency(item.budgeted)}
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Progress 
                    value={calculateProgress(item.spent, item.budgeted)} 
                    className={`h-2 ${
                      item.spent > item.budgeted ? "bg-red-200" : ""
                    }`}
                  />
                </div>
                <div className="w-24">
                  <div className="flex">
                    <DollarSign className="h-5 w-5 mr-1 text-muted-foreground" />
                    <Input
                      type="number"
                      value={item.budgeted || ""}
                      onChange={(e) => handleUpdateBudget(item.id, parseFloat(e.target.value) || 0)}
                      className="pl-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="New Category"
                value={newBudgetCategory}
                onChange={(e) => setNewBudgetCategory(e.target.value)}
              />
              <div className="flex w-24">
                <DollarSign className="h-5 w-5 mr-1 text-muted-foreground" />
                <Input
                  type="number"
                  placeholder="0"
                  value={newBudgetAmount || ""}
                  onChange={(e) => setNewBudgetAmount(parseFloat(e.target.value) || 0)}
                  className="pl-0"
                />
              </div>
              <Button size="sm" onClick={handleAddCategory}>
                <PlusCircle className="h-4 w-4 mr-1" /> Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="flex justify-center items-center gap-2">
          <BarChart3 className="h-5 w-5" /> View Monthly Report
        </Button>
        <Button variant="outline" className="flex justify-center items-center gap-2">
          <PieChart className="h-5 w-5" /> Budget Analysis
        </Button>
      </div>
    </div>
  );
};

export default BudgetPlanner;
