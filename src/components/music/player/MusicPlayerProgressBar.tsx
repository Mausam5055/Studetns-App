
import React from 'react';
import { Slider } from '@/components/ui/slider';
import { formatTime } from '@/lib/utils';

interface MusicPlayerProgressBarProps {
  currentTime: number;
  duration: number;
  onProgressChange: (value: number[]) => void;
}

const MusicPlayerProgressBar = ({
  currentTime,
  duration,
  onProgressChange,
}: MusicPlayerProgressBarProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-xs text-universe-500 w-10 text-right">
        {formatTime(currentTime)}
      </span>
      <Slider
        value={[currentTime]}
        min={0}
        max={duration}
        step={1}
        onValueChange={onProgressChange}
        className="flex-1"
      />
      <span className="text-xs text-universe-500 w-10">
        {formatTime(duration)}
      </span>
    </div>
  );
};

export default MusicPlayerProgressBar;
