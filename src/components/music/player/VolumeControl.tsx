
import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX } from 'lucide-react';

interface VolumeControlProps {
  volume: number;
  isMuted: boolean;
  onVolumeChange: (value: number[]) => void;
  onToggleMute: () => void;
}

const VolumeControl = ({
  volume,
  isMuted,
  onVolumeChange,
  onToggleMute,
}: VolumeControlProps) => {
  return (
    <div className="hidden sm:flex items-center gap-2">
      <Button variant="ghost" size="icon" onClick={onToggleMute}>
        {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
      </Button>
      <Slider
        value={[isMuted ? 0 : volume]}
        min={0}
        max={100}
        step={1}
        onValueChange={onVolumeChange}
        className="w-24"
      />
    </div>
  );
};

export default VolumeControl;
