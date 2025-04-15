
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PlusCircle, Trash2, Pencil, Check, X } from "lucide-react";
import { useToast } from '@/hooks/use-toast';

type Category = {
  id: string;
  name: string;
  icon?: string;
  color?: string;
};

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'Food', icon: '🍔' },
  { id: '2', name: 'Transportation', icon: '🚗' },
  { id: '3', name: 'Entertainment', icon: '🎬' },
  { id: '4', name: 'Education', icon: '📚' },
  { id: '5', name: 'Housing', icon: '🏠' },
  { id: '6', name: 'Utilities', icon: '💡' },
  { id: '7', name: 'Health', icon: '🏥' },
  { id: '8', name: 'Shopping', icon: '🛍️' },
  { id: '9', name: 'Other', icon: '📦' },
];

const ICONS = ['🍔', '🚗', '🎬', '📚', '🏠', '💡', '🏥', '🛍️', '📦', '💻', '✈️', '🎮', '🎵', '🎨', '💼', '🏋️', '💰', '🎁', '📱'];

const ExpenseCategories = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('📋');
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    // Load categories from localStorage
    const savedCategories = localStorage.getItem('expenseCategories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      // Initialize with default categories
      setCategories(DEFAULT_CATEGORIES);
      localStorage.setItem('expenseCategories', JSON.stringify(DEFAULT_CATEGORIES));
    }
  }, []);

  useEffect(() => {
    // Save categories to localStorage whenever they change
    if (categories.length > 0) {
      localStorage.setItem('expenseCategories', JSON.stringify(categories));
    }
  }, [categories]);

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const categoryExists = categories.some(
      category => category.name.toLowerCase() === newCategoryName.toLowerCase()
    );

    if (categoryExists) {
      toast({
        title: "Error",
        description: "A category with this name already exists",
        variant: "destructive",
      });
      return;
    }

    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: newCategoryName,
      icon: selectedIcon,
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName('');
    setSelectedIcon('📋');

    toast({
      title: "Success",
      description: "Category added successfully",
    });
  };

  const startEditing = (category: Category) => {
    setEditingCategory(category.id);
    setEditName(category.name);
    setSelectedIcon(category.icon || '📋');
  };

  const cancelEditing = () => {
    setEditingCategory(null);
    setEditName('');
  };

  const saveEdit = (id: string) => {
    if (!editName.trim()) {
      toast({
        title: "Error",
        description: "Category name cannot be empty",
        variant: "destructive",
      });
      return;
    }

    const categoryExists = categories.some(
      category => category.name.toLowerCase() === editName.toLowerCase() && category.id !== id
    );

    if (categoryExists) {
      toast({
        title: "Error",
        description: "A category with this name already exists",
        variant: "destructive",
      });
      return;
    }

    setCategories(categories.map(category => 
      category.id === id 
        ? { ...category, name: editName, icon: selectedIcon }
        : category
    ));
    
    setEditingCategory(null);
    setEditName('');

    toast({
      title: "Success",
      description: "Category updated successfully",
    });
  };

  const deleteCategory = (id: string) => {
    const categoryToDelete = categories.find(c => c.id === id);
    if (!categoryToDelete) return;
    
    // Check if it's one of the default categories
    if (DEFAULT_CATEGORIES.some(dc => dc.name === categoryToDelete.name)) {
      toast({
        title: "Cannot Delete",
        description: "Default categories cannot be deleted",
        variant: "destructive",
      });
      return;
    }

    setCategories(categories.filter(category => category.id !== id));
    toast({
      title: "Success",
      description: "Category deleted successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-muted/50 p-4 rounded-lg">
        <h3 className="font-medium mb-4">Add New Category</h3>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {ICONS.map(icon => (
              <Button
                key={icon}
                variant={selectedIcon === icon ? "default" : "outline"}
                size="sm"
                className="h-10 w-10 p-0"
                onClick={() => setSelectedIcon(icon)}
              >
                <span className="text-xl">{icon}</span>
              </Button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                placeholder="Category name"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <Button onClick={handleAddCategory}>
              <PlusCircle className="h-4 w-4 mr-2" /> Add Category
            </Button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Your Categories</h3>
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="w-[120px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map(category => (
                <TableRow key={category.id}>
                  <TableCell className="text-2xl">{category.icon}</TableCell>
                  <TableCell>
                    {editingCategory === category.id ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      category.name
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingCategory === category.id ? (
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm" onClick={() => saveEdit(category.id)}>
                          <Check className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={cancelEditing}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => startEditing(category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => deleteCategory(category.id)}
                          disabled={DEFAULT_CATEGORIES.some(dc => dc.name === category.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCategories;
