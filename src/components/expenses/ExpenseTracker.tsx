
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Trash2, DollarSign } from "lucide-react";

type Expense = {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
};

type ExpenseTrackerProps = {
  onAddExpense?: () => void;
};

const DEFAULT_CATEGORIES = [
  "Food", "Transportation", "Entertainment", "Education", 
  "Housing", "Utilities", "Health", "Shopping", "Other"
];

const ExpenseTracker = ({ onAddExpense }: ExpenseTrackerProps) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState<Omit<Expense, "id">>({
    amount: 0,
    category: "Other",
    description: "",
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    // Load expenses from localStorage
    const savedExpenses = localStorage.getItem("expenses");
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  useEffect(() => {
    // Save expenses to localStorage whenever the expenses state changes
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = () => {
    if (newExpense.amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const expense: Expense = {
      ...newExpense,
      id: crypto.randomUUID()
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({
      amount: 0,
      category: "Other",
      description: "",
      date: new Date().toISOString().split('T')[0]
    });

    if (onAddExpense) {
      onAddExpense();
    }
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h3 className="font-medium mb-4">Add New Expense</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <DollarSign className="absolute left-2 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="amount"
                    type="number"
                    className="pl-8"
                    placeholder="0.00"
                    value={newExpense.amount || ""}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: parseFloat(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={newExpense.category} 
                onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {DEFAULT_CATEGORIES.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Description"
                value={newExpense.description}
                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
              />
            </div>
            <Button className="w-full" onClick={handleAddExpense}>Add Expense</Button>
          </div>
        </div>
        <div className="bg-muted/50 p-4 rounded-lg flex flex-col">
          <h3 className="font-medium mb-4">Summary</h3>
          <div className="flex-1 flex flex-col justify-center items-center">
            <p className="text-lg text-muted-foreground">Total Expenses</p>
            <p className="text-4xl font-bold">{formatCurrency(totalExpenses)}</p>
            <p className="mt-4 text-sm text-muted-foreground">From {expenses.length} transactions</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Recent Expenses</h3>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenses.length > 0 ? (
                expenses.map(expense => (
                  <TableRow key={expense.id}>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.description || "—"}</TableCell>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell className="text-right font-medium">{formatCurrency(expense.amount)}</TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteExpense(expense.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                    No expenses recorded yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
