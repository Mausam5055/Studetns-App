
import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { Song } from '@/types/music';
import { useToast } from '@/components/ui/use-toast';

interface MusicPlayerContextType {
  currentSong: Song | null;
  playlist: Song[];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playSong: (song: Song) => void;
  playPlaylist: (playlistId: string) => void;
  togglePlay: () => void;
  nextSong: () => void;
  previousSong: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTo: (time: number) => void;
}

const MusicPlayerContext = createContext<MusicPlayerContextType | undefined>(undefined);

export const MusicPlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [playlist, setPlaylist] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const { toast } = useToast();
  
  // Audio element reference
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element on mount
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    
    // Set initial volume
    audio.volume = volume / 100;
    
    // Set up event listeners
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Mock function to get songs by playlist ID
  const getSongsByPlaylistId = (playlistId: string): Song[] => {
    // In a real app, this would fetch from API or local state
    return [
      { id: '1', title: 'Lo-fi Study Beat', artist: 'Chill Beats', duration: 183, coverUrl: 'https://picsum.photos/seed/lofi1/300/300', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3' },
      { id: '2', title: 'Deep Focus', artist: 'Ambient Works', duration: 240, coverUrl: 'https://picsum.photos/seed/ambient1/300/300', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3' },
      { id: '3', title: 'Midnight Coding', artist: 'Code Tunes', duration: 210, coverUrl: 'https://picsum.photos/seed/coding1/300/300', audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3' },
    ];
  };

  // Event handlers for audio element
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(Math.floor(audioRef.current.currentTime));
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(Math.floor(audioRef.current.duration));
    }
  };

  const handleEnded = () => {
    nextSong();
  };

  const playSong = (song: Song) => {
    setCurrentSong(song);
    
    if (audioRef.current) {
      // Set the new source
      audioRef.current.src = song.audioUrl || '';
      audioRef.current.load();
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
        toast({
          title: "Playback Error",
          description: "There was an error playing this track",
          variant: "destructive"
        });
      });
      setIsPlaying(true);
    }
    
    toast({
      title: "Now Playing",
      description: `${song.title} by ${song.artist}`,
    });
  };

  const playPlaylist = (playlistId: string) => {
    const songs = getSongsByPlaylistId(playlistId);
    if (songs.length > 0) {
      setPlaylist(songs);
      playSong(songs[0]);
      
      toast({
        title: "Playlist Started",
        description: `Playing ${songs.length} songs`,
      });
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error('Error playing audio:', err);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    if (playlist.length <= 1) return;
    
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playSong(playlist[nextIndex]);
  };

  const previousSong = () => {
    if (playlist.length <= 1) return;
    
    const currentIndex = playlist.findIndex(song => song.id === currentSong?.id);
    const prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    playSong(playlist[prevIndex]);
  };

  const setVolume = (value: number) => {
    setVolumeState(value);
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
      if (value > 0 && isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !isMuted;
      audioRef.current.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Load saved music state from localStorage when component mounts
  useEffect(() => {
    const savedState = localStorage.getItem('music-player-state');
    if (savedState) {
      try {
        const { savedSong, savedPlaylist, savedVolume } = JSON.parse(savedState);
        if (savedVolume !== undefined) setVolumeState(savedVolume);
        if (savedPlaylist) setPlaylist(savedPlaylist);
        if (savedSong) {
          setCurrentSong(savedSong);
          
          // Don't autoplay on initial load
          // If you want autoplay, you'd need to handle user interaction first
          // due to browser autoplay policies
        }
      } catch (err) {
        console.error("Error parsing saved music state", err);
      }
    }
  }, []);

  // Save music state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('music-player-state', JSON.stringify({
      savedSong: currentSong,
      savedPlaylist: playlist,
      savedVolume: volume,
    }));
  }, [currentSong, playlist, volume]);

  return (
    <MusicPlayerContext.Provider
      value={{
        currentSong,
        playlist,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        playSong,
        playPlaylist,
        togglePlay,
        nextSong,
        previousSong,
        setVolume,
        toggleMute,
        seekTo,
      }}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => {
  const context = useContext(MusicPlayerContext);
  if (context === undefined) {
    throw new Error('useMusicPlayer must be used within a MusicPlayerProvider');
  }
  return context;
};
