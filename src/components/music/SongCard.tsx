
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, HeartFill, Heart, ThreeDots } from 'react-bootstrap-icons';
import { formatTime } from '@/lib/utils';
import { Song } from '@/types/music';
import { useMusicPlayer } from '@/hooks/use-music-player';

interface SongCardProps {
  song: Song;
  isFavorite?: boolean;
}

const SongCard = ({ song, isFavorite = false }: SongCardProps) => {
  const { playSong, currentSong, isPlaying, togglePlay } = useMusicPlayer();
  
  const isCurrentSong = currentSong?.id === song.id;
  
  const handlePlay = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      playSong(song);
    }
  };
  
  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, we would call a function to toggle favorite status
    console.log('Toggle favorite for song:', song.id);
  };
  
  const handleMoreOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    // In a real app, we would show a dropdown with more options
    console.log('Show more options for song:', song.id);
  };
  
  return (
    <Card 
      className="overflow-hidden hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      onClick={handlePlay}
    >
      <CardContent className="p-0">
        <div className="relative group">
          <img
            src={song.coverUrl || "https://placehold.co/400x400?text=Album"}
            alt={song.title}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              size="icon"
              className="h-12 w-12 rounded-full bg-white/90 text-black hover:bg-white"
            >
              {isCurrentSong && isPlaying ? (
                <div className="w-4 h-4 flex items-center gap-0.5">
                  <div className="w-1 h-full bg-black animate-[soundwave_0.8s_infinite] rounded-sm"></div>
                  <div className="w-1 h-3/4 bg-black animate-[soundwave_0.7s_infinite_0.2s] rounded-sm"></div>
                  <div className="w-1 h-1/2 bg-black animate-[soundwave_0.6s_infinite_0.4s] rounded-sm"></div>
                </div>
              ) : (
                <Play className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium line-clamp-1">{song.title}</h3>
              <p className="text-universe-500 text-sm line-clamp-1">{song.artist}</p>
            </div>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full"
                onClick={toggleFavorite}
              >
                {isFavorite ? (
                  <HeartFill className="text-red-500" />
                ) : (
                  <Heart />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 rounded-full"
                onClick={handleMoreOptions}
              >
                <ThreeDots />
              </Button>
            </div>
          </div>
          
          <div className="text-xs text-universe-500 mt-2">
            {song.album && <span>{song.album} • </span>}
            <span>{formatTime(song.duration || 0)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SongCard;
