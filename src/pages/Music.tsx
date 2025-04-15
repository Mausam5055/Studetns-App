
import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import MusicPlayer from "@/components/music/MusicPlayer";
import PlaylistCard from "@/components/music/PlaylistCard";
import SongCard from "@/components/music/SongCard";
import { useMusicPlayer } from "@/hooks/use-music-player";
import { fetchMusicData } from "@/lib/music-service";
import { MusicNoteBeamed, Search, SortDown } from "react-bootstrap-icons";

const Music = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFocusMode, setShowFocusMode] = useState(false);
  const { currentSong, playlist, isPlaying, togglePlay, nextSong, previousSong } = useMusicPlayer();
  
  const { data: musicData, isLoading } = useQuery({
    queryKey: ['music-data'],
    queryFn: fetchMusicData,
  });
  
  const filteredSongs = musicData?.songs?.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];
  
  const toggleFocusMode = () => {
    setShowFocusMode(!showFocusMode);
    toast({
      title: showFocusMode ? "Focus mode disabled" : "Focus mode enabled",
      description: showFocusMode 
        ? "Music player has returned to normal mode." 
        : "Music player is now optimized for studying.",
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MusicNoteBeamed className="text-purple-500" />
            Music Player
          </h1>
          <p className="text-universe-600 dark:text-universe-400 mt-1">
            Listen to music while you study
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-2">
            <Label htmlFor="focus-mode" className="cursor-pointer">Focus Mode</Label>
            <Switch id="focus-mode" checked={showFocusMode} onCheckedChange={toggleFocusMode} />
          </div>
        </div>
      </div>
      
      {!showFocusMode ? (
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-3">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-universe-500" />
                <Input
                  placeholder="Search songs or artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="icon" className="hidden sm:flex">
                <SortDown />
              </Button>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Songs</TabsTrigger>
                <TabsTrigger value="playlists">Playlists</TabsTrigger>
                <TabsTrigger value="favorites">Favorites</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(6)].map((_, i) => (
                        <Card key={i} className="h-[150px] animate-pulse">
                          <CardContent className="p-4 flex items-center gap-4">
                            <div className="w-20 h-20 bg-universe-200 dark:bg-universe-700 rounded-md"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-24 bg-universe-200 dark:bg-universe-700 rounded"></div>
                              <div className="h-3 w-16 bg-universe-200 dark:bg-universe-700 rounded"></div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <>
                      {filteredSongs.map((song) => (
                        <SongCard key={song.id} song={song} />
                      ))}
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="playlists" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    <>
                      {[...Array(3)].map((_, i) => (
                        <Card key={i} className="h-[200px] animate-pulse">
                          <CardContent className="p-4">
                            <div className="w-full h-24 bg-universe-200 dark:bg-universe-700 rounded-md mb-4"></div>
                            <div className="h-4 w-32 bg-universe-200 dark:bg-universe-700 rounded mb-2"></div>
                            <div className="h-3 w-20 bg-universe-200 dark:bg-universe-700 rounded"></div>
                          </CardContent>
                        </Card>
                      ))}
                    </>
                  ) : (
                    <>
                      {musicData?.playlists?.map((playlist) => (
                        <PlaylistCard key={playlist.id} playlist={playlist} />
                      ))}
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="favorites" className="mt-6">
                {musicData?.favorites?.length ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {musicData.favorites.map((song) => (
                      <SongCard key={song.id} song={song} isFavorite />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No favorite songs yet</h3>
                    <p className="text-universe-500 max-w-md mx-auto">
                      Add songs to your favorites by clicking the heart icon on any song.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 xl:static xl:bottom-auto xl:left-auto xl:right-auto bg-white dark:bg-universe-900 border-t border-universe-200 dark:border-universe-800 xl:border p-4 xl:p-6 xl:rounded-lg shadow-lg xl:shadow-none">
            <MusicPlayer
              song={currentSong}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              onNext={nextSong}
              onPrevious={previousSong}
              compact={true}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card p-6 flex flex-col">
            <h2 className="text-xl font-medium mb-4">Focus Music</h2>
            <p className="text-universe-500 mb-6">
              Play background music designed to help you concentrate and study more effectively.
            </p>
            
            <div className="space-y-6 flex-1">
              {musicData?.focusPlaylists?.map((playlist) => (
                <Button 
                  key={playlist.id} 
                  variant="outline" 
                  className="w-full justify-start h-auto py-3 px-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white">
                      <MusicNoteBeamed />
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{playlist.name}</div>
                      <div className="text-xs text-universe-500">{playlist.description}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="mt-6">
              <MusicPlayer
                song={currentSong}
                isPlaying={isPlaying}
                onTogglePlay={togglePlay}
                onNext={nextSong}
                onPrevious={previousSong}
                compact={false}
              />
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-medium mb-4">Study Timer</h2>
            <p className="text-universe-500 mb-6">
              The music will automatically stop when your study session ends.
            </p>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>Study Session Length</Label>
                <div className="flex items-center gap-4">
                  <Slider defaultValue={[25]} max={60} step={5} />
                  <span className="font-medium w-12 text-center">25m</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Break Length</Label>
                <div className="flex items-center gap-4">
                  <Slider defaultValue={[5]} max={15} step={1} />
                  <span className="font-medium w-12 text-center">5m</span>
                </div>
              </div>
              
              <Button className="w-full">Start Focus Session</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Music;
