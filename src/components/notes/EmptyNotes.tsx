
import React from "react";
import { FileTextIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyNotesProps {
  onCreateNote: () => void;
}

const EmptyNotes = ({ onCreateNote }: EmptyNotesProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 bg-universe-100 dark:bg-universe-800 rounded-full flex items-center justify-center mb-4">
        <FileTextIcon size={24} className="text-universe-500" />
      </div>
      <h3 className="text-xl font-medium mb-2">No notes yet</h3>
      <p className="text-universe-500 mb-6 max-w-md">
        Create your first note to keep track of your ideas, lecture notes, or anything else you want to remember.
      </p>
      <Button onClick={onCreateNote}>
        <PlusCircleIcon size={16} className="mr-2" />
        Create your first note
      </Button>
    </div>
  );
};

export default EmptyNotes;
