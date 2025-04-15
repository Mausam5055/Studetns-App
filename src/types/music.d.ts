
export interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number;  // in seconds
  coverUrl?: string;
  isFavorite?: boolean;
  audioUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverUrl?: string;
  songCount: number;
  duration: string;
  songs?: Song[];
}

export interface MusicState {
  currentSong: Song | null;
  playlist: Song[];
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  isMuted: boolean;
}
