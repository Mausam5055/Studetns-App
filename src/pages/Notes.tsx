
import React, { useState, useEffect } from "react";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { 
  PencilIcon, 
  TrashIcon, 
  PlusCircleIcon,
  SearchIcon,
  FolderIcon,
  TagIcon,
  ImageIcon,
  CalendarIcon,
  FileTextIcon,
  BookIcon
} from "lucide-react";
import NoteCard from "@/components/notes/NoteCard";
import EmptyNotes from "@/components/notes/EmptyNotes";

export type Note = {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  createdAt: string;
  updatedAt: string;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("study");
  const [noteColor, setNoteColor] = useState("#f1f5f9");
  
  const categories = [
    { id: "all", name: "All Notes", icon: <BookIcon size={16} /> },
    { id: "study", name: "Study", icon: <FileTextIcon size={16} /> },
    { id: "personal", name: "Personal", icon: <FolderIcon size={16} /> },
    { id: "projects", name: "Projects", icon: <PencilIcon size={16} /> },
    { id: "important", name: "Important", icon: <TagIcon size={16} /> },
  ];

  const colors = [
    "#f1f5f9", // Light gray
    "#fee2e2", // Light red
    "#e0f2fe", // Light blue
    "#d1fae5", // Light green
    "#fef3c7", // Light yellow
    "#f3e8ff", // Light purple
  ];

  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("universe_notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("universe_notes", JSON.stringify(notes));
  }, [notes]);

  const openCreateDialog = () => {
    setEditingNote(null);
    setTitle("");
    setContent("");
    setCategory("study");
    setNoteColor("#f1f5f9");
    setIsDialogOpen(true);
  };

  const openEditDialog = (note: Note) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
    setNoteColor(note.color);
    setIsDialogOpen(true);
  };

  const handleSaveNote = () => {
    if (!title.trim()) {
      toast.error("Please add a title to your note");
      return;
    }

    const currentDate = new Date().toISOString();

    if (editingNote) {
      // Update existing note
      const updatedNotes = notes.map(note => 
        note.id === editingNote.id 
          ? { 
              ...note, 
              title, 
              content, 
              category, 
              color: noteColor,
              updatedAt: currentDate 
            }
          : note
      );
      setNotes(updatedNotes);
      toast.success("Note updated successfully");
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        title,
        content,
        category,
        color: noteColor,
        createdAt: currentDate,
        updatedAt: currentDate
      };
      
      setNotes([newNote, ...notes]);
      toast.success("Note created successfully");
    }
    
    setIsDialogOpen(false);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setNotes(notes.filter(note => note.id !== id));
      toast.success("Note deleted successfully");
    }
  };

  // Filter notes based on search term and active category
  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "all" || note.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Notes</h1>
        <p className="text-universe-600 dark:text-universe-400">
          Organize your thoughts, ideas, and study materials
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-64 space-y-4">
          <Button 
            onClick={openCreateDialog} 
            className="w-full gap-2"
          >
            <PlusCircleIcon size={16} /> New Note
          </Button>
          
          <div className="relative">
            <SearchIcon size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-universe-500" />
            <Input 
              placeholder="Search notes..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Card>
            <CardContent className="p-3">
              <nav className="space-y-1">
                {categories.map(cat => (
                  <Button
                    key={cat.id}
                    variant={activeCategory === cat.id ? "secondary" : "ghost"}
                    className={`w-full justify-start text-sm ${activeCategory === cat.id ? 'font-medium' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    {cat.icon}
                    <span className="ml-2">{cat.name}</span>
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Notes Grid */}
        <div className="flex-1">
          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredNotes.map(note => (
                <NoteCard 
                  key={note.id} 
                  note={note}
                  onEdit={() => openEditDialog(note)}
                  onDelete={() => handleDeleteNote(note.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyNotes onCreateNote={openCreateDialog} />
          )}
        </div>
      </div>

      {/* Create/Edit Note Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingNote ? "Edit Note" : "Create New Note"}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid w-full gap-1.5">
              <Input
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="grid w-full gap-1.5">
              <Textarea
                placeholder="Write your note..."
                className="min-h-[200px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            <div className="grid w-full gap-1.5">
              <label className="text-sm font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                {categories.filter(cat => cat.id !== "all").map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid w-full gap-1.5">
              <label className="text-sm font-medium">Note Color</label>
              <div className="flex flex-wrap gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    style={{ backgroundColor: color }}
                    className={`w-6 h-6 rounded-full border ${noteColor === color ? 'ring-2 ring-primary' : 'border-universe-200'}`}
                    onClick={() => setNoteColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNote}>
              {editingNote ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Notes;
