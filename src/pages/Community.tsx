
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ForumDiscussions from "@/components/community/ForumDiscussions";
import StudyGroups from "@/components/community/StudyGroups";
import PeerConnections from "@/components/community/PeerConnections";
import EventsCalendar from "@/components/community/EventsCalendar";
import { useToast } from "@/hooks/use-toast";

const Community = () => {
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("forum");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load saved community data
    const loadSavedData = () => {
      try {
        setIsLoading(false);
        console.log("Community component initialized");
      } catch (error) {
        console.error("Failed to load community data:", error);
        setIsLoading(false);
      }
    };

    // Simulate loading delay for demonstration
    setTimeout(() => {
      loadSavedData();
    }, 500);
  }, []);

  const handleNewPost = () => {
    toast({
      title: "Post Created",
      description: "Your post has been published successfully",
      duration: 3000,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-pulse-subtle flex flex-col items-center">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-universe-400 to-universe-600"></div>
          <div className="mt-4 h-4 bg-universe-200 dark:bg-universe-700 rounded w-24"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Community Hub</h1>
        <p className="text-universe-600 dark:text-universe-400 mt-2">
          Connect with peers, join study groups, and participate in academic discussions
        </p>
      </div>

      <Tabs
        defaultValue="forum"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="forum">Forum Discussions</TabsTrigger>
          <TabsTrigger value="groups">Study Groups</TabsTrigger>
          <TabsTrigger value="peers">Peer Connections</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
        </TabsList>

        <TabsContent value="forum" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Academic Discussions</CardTitle>
            </CardHeader>
            <CardContent>
              <ForumDiscussions onNewPost={handleNewPost} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Find Study Groups</CardTitle>
            </CardHeader>
            <CardContent>
              <StudyGroups />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="peers" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Connect with Peers</CardTitle>
            </CardHeader>
            <CardContent>
              <PeerConnections />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card className="glass-card card-hover">
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <EventsCalendar />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Community;
