import { Song, Playlist } from '@/types/music';

// Mock data for music service
const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Lo-fi Study Beat',
    artist: 'Chill Beats',
    album: 'Study Session Vol. 1',
    duration: 183,
    coverUrl: 'https://picsum.photos/seed/lofi1/300/300',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3'
  },
  {
    id: '2',
    title: 'Deep Focus',
    artist: 'Ambient Works',
    album: 'Concentration',
    duration: 240,
    coverUrl: 'https://picsum.photos/seed/ambient1/300/300',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-hip-hop-02-621.mp3'
  },
  {
    id: '3',
    title: 'Midnight Coding',
    artist: 'Code Tunes',
    album: 'Late Night Sessions',
    duration: 210,
    coverUrl: 'https://picsum.photos/seed/coding1/300/300',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3'
  },
  {
    id: '4',
    title: 'Jazz Coffee',
    artist: 'Morning Blend',
    album: 'Wake Up',
    duration: 195,
    coverUrl: 'https://picsum.photos/seed/jazz1/300/300',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-a-very-happy-christmas-897.mp3'
  },
  {
    id: '5',
    title: 'Classical Study',
    artist: 'Academia',
    album: 'Mozart for Studying',
    duration: 320,
    coverUrl: 'https://picsum.photos/seed/classical1/300/300',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-spirit-of-the-orient-545.mp3'
  },
  {
    id: '6',
    title: 'Nature Sounds',
    artist: 'Peaceful Mind',
    album: 'Forest Retreat',
    duration: 600,
    coverUrl: 'https://picsum.photos/seed/nature1/300/300',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-serene-view-443.mp3'
  },
  {
    id: '7',
    title: 'Electronic Focus',
    artist: 'Circuit Beats',
    album: 'Digital Flow',
    duration: 245,
    coverUrl: 'https://picsum.photos/seed/electronic1/300/300',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3'
  },
  {
    id: '8',
    title: 'Piano Meditation',
    artist: 'Keys & Mind',
    album: 'Tranquil Keys',
    duration: 278,
    coverUrl: 'https://picsum.photos/seed/piano1/300/300',
    audioUrl: 'https://assets.mixkit.co/music/preview/mixkit-piano-reflections-22-621.mp3'
  },
];

const mockPlaylists: Playlist[] = [
  {
    id: 'p1',
    name: 'Study Essentials',
    description: 'Perfect tracks for deep focus and studying',
    songCount: 15,
    duration: '1hr 24min',
    coverUrl: 'https://picsum.photos/seed/study1/300/300',
  },
  {
    id: 'p2',
    name: 'Coding Playlist',
    description: 'Beats to help you concentrate while coding',
    songCount: 12,
    duration: '58min',
    coverUrl: 'https://picsum.photos/seed/code1/300/300',
  },
  {
    id: 'p3',
    name: 'Relaxation',
    description: 'Calm your mind with these peaceful tracks',
    songCount: 8,
    duration: '42min',
    coverUrl: 'https://picsum.photos/seed/relax1/300/300',
  },
];

const mockFocusPlaylists: Playlist[] = [
  {
    id: 'fp1',
    name: 'Deep Focus',
    description: 'Ambient sounds for maximum concentration',
    songCount: 6,
    duration: '2hr 10min',
    coverUrl: 'https://picsum.photos/seed/deepfocus/300/300',
  },
  {
    id: 'fp2',
    name: 'Lofi Beats',
    description: 'Chill beats to study and relax',
    songCount: 12,
    duration: '1hr 30min',
    coverUrl: 'https://picsum.photos/seed/lofibeats/300/300',
  },
  {
    id: 'fp3',
    name: 'Classical Focus',
    description: 'Classical music proven to enhance focus',
    songCount: 8,
    duration: '2hr 45min',
    coverUrl: 'https://picsum.photos/seed/classical/300/300',
  },
];

// Function to fetch music data
export const fetchMusicData = async () => {
  // In a real app, this would be an API call
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Get favorites from localStorage or use empty array
  const savedFavorites = localStorage.getItem('favorite-songs');
  const favorites = savedFavorites 
    ? JSON.parse(savedFavorites) 
    : mockSongs.slice(0, 2).map(song => ({ ...song, isFavorite: true }));
  
  return {
    songs: mockSongs,
    playlists: mockPlaylists,
    focusPlaylists: mockFocusPlaylists,
    favorites,
  };
};

// Additional functions that would be implemented in a real application:
// export const addSongToFavorites = async (songId: string) => { ... };
// export const removeSongFromFavorites = async (songId: string) => { ... };
// export const createPlaylist = async (playlistData: Partial<Playlist>) => { ... };
// export const addSongToPlaylist = async (songId: string, playlistId: string) => { ... };
