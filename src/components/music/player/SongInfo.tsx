
import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Song } from '@/types/music';

interface SongInfoProps {
  song: Song;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  compact?: boolean;
}

const SongInfo = ({
  song,
  isFavorite,
  onToggleFavorite,
  compact = false,
}: SongInfoProps) => {
  if (compact) {
    return (
      <div className="flex items-center">
        <img
          src={song.coverUrl || "https://placehold.co/200x200?text=Album"}
          alt={song.title}
          className="w-12 h-12 rounded mr-3 object-cover"
        />
        <div>
          <h4 className="font-medium text-sm line-clamp-1">{song.title}</h4>
          <p className="text-universe-500 text-xs line-clamp-1">{song.artist}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex items-center gap-4">
      <img
        src={song.coverUrl || "https://placehold.co/200x200?text=Album"}
        alt={song.title}
        className="w-16 h-16 rounded-md object-cover"
      />
      <div className="flex-1">
        <h3 className="font-medium line-clamp-1">{song.title}</h3>
        <p className="text-universe-500 text-sm">{song.artist}</p>
      </div>
      <Button variant="ghost" size="icon" onClick={onToggleFavorite}>
        {isFavorite ? <Heart className="fill-current text-red-500" /> : <Heart />}
      </Button>
    </div>
  );
};

export default SongInfo;
