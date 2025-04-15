
import React, { useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Song } from '@/types/music';
import SongInfo from './player/SongInfo';
import MusicPlayerControls from './player/MusicPlayerControls';
import MusicPlayerProgressBar from './player/MusicPlayerProgressBar';
import VolumeControl from './player/VolumeControl';
import { useMusicPlayer } from '@/hooks/use-music-player';

interface MusicPlayerProps {
  song?: Song | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrevious: () => void;
  compact?: boolean;
}

const MusicPlayer = ({ 
  song, 
  isPlaying, 
  onTogglePlay, 
  onNext, 
  onPrevious, 
  compact = false 
}: MusicPlayerProps) => {
  const { 
    currentTime, 
    duration, 
    volume, 
    isMuted, 
    setVolume, 
    toggleMute, 
    seekTo 
  } = useMusicPlayer();
  
  const [isFavorite, setIsFavorite] = React.useState(false);
  
  useEffect(() => {
    if (song) {
      setIsFavorite(song.isFavorite || false);
    }
  }, [song]);
  
  const handleProgressChange = (value: number[]) => {
    seekTo(value[0]);
  };
  
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  if (!song) {
    return (
      <Card className="flex items-center justify-center h-[80px] p-4">
        <p className="text-universe-500">No song is currently playing</p>
      </Card>
    );
  }
  
  if (compact) {
    return (
      <div className="flex items-center justify-between">
        <SongInfo
          song={song}
          isFavorite={isFavorite}
          onToggleFavorite={toggleFavorite}
          compact={true}
        />
        
        <MusicPlayerControls
          isPlaying={isPlaying}
          onTogglePlay={onTogglePlay}
          onNext={onNext}
          onPrevious={onPrevious}
          compact={true}
        />
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <SongInfo
        song={song}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
      
      <div className="space-y-2">
        <MusicPlayerProgressBar
          currentTime={currentTime}
          duration={duration || song.duration}
          onProgressChange={handleProgressChange}
        />
        
        <div className="flex items-center justify-between">
          <MusicPlayerControls
            isPlaying={isPlaying}
            onTogglePlay={onTogglePlay}
            onNext={onNext}
            onPrevious={onPrevious}
          />
          
          <VolumeControl
            volume={volume}
            isMuted={isMuted}
            onVolumeChange={handleVolumeChange}
            onToggleMute={toggleMute}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
