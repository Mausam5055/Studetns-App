
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { Note } from "@/pages/Notes";

interface NoteCardProps {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
}

const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (error) {
      return "Unknown date";
    }
  };

  return (
    <Card 
      className="overflow-hidden hover:-translate-y-1 transition-all duration-200"
      style={{ backgroundColor: note.color }}
    >
      <CardContent className="pt-6">
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{note.title}</h3>
        <p className="text-sm text-universe-600 dark:text-universe-300 line-clamp-4 min-h-[80px]">
          {note.content || "No content"}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-white/50 dark:bg-universe-900/30 py-2">
        <div className="flex items-center text-xs text-universe-500">
          <CalendarIcon size={12} className="mr-1" />
          <span>{formatDate(note.updatedAt)}</span>
        </div>
        <div className="flex gap-1">
          <Button size="sm" variant="ghost" onClick={onEdit}>
            <PencilIcon size={14} />
            <span className="sr-only">Edit</span>
          </Button>
          <Button size="sm" variant="ghost" className="text-red-500" onClick={onDelete}>
            <TrashIcon size={14} />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
