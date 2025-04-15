
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, Rewind, Shuffle, Repeat } from 'lucide-react';

interface MusicPlayerControlsProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  compact?: boolean;
}

const MusicPlayerControls = ({
  isPlaying,
  onTogglePlay,
  onNext,
  onPrevious,
  compact = false,
}: MusicPlayerControlsProps) => {
  return (
    <div className={`flex items-center ${compact ? 'gap-2' : 'justify-between'}`}>
      {!compact && (
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Shuffle className="text-universe-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Repeat className="text-universe-500" />
          </Button>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={onPrevious}>
          <Rewind />
        </Button>
        <Button 
          size="icon" 
          onClick={onTogglePlay}
          className={compact ? "" : "bg-purple-500 hover:bg-purple-600 text-white"}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>
        <Button variant="ghost" size="icon" onClick={onNext}>
          <SkipForward />
        </Button>
      </div>
    </div>
  );
};

export default MusicPlayerControls;
