
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play } from 'react-bootstrap-icons';
import { useMusicPlayer } from '@/hooks/use-music-player';
import { Playlist } from '@/types/music';

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  const { playPlaylist } = useMusicPlayer();
  
  const handlePlayPlaylist = () => {
    playPlaylist(playlist.id);
  };
  
  return (
    <Card className="overflow-hidden hover:-translate-y-1 transition-all duration-200">
      <CardContent className="p-0">
        <div className="relative group">
          <img
            src={playlist.coverUrl || "https://placehold.co/400x400?text=Playlist"}
            alt={playlist.name}
            className="w-full h-40 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button 
              size="icon"
              className="h-12 w-12 rounded-full bg-white/90 text-black hover:bg-white"
              onClick={handlePlayPlaylist}
            >
              <Play className="h-6 w-6" />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-medium">{playlist.name}</h3>
          <p className="text-universe-500 text-sm line-clamp-2">{playlist.description}</p>
          <div className="text-xs text-universe-500 mt-2">
            {playlist.songCount} songs • {playlist.duration}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;
