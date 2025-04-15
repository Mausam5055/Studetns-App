
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  UserPlus, 
  Users, 
  BookOpen, 
  Search, 
  MessageSquare,
  GraduationCap,
  Mail
} from "lucide-react";

type Peer = {
  id: string;
  name: string;
  major: string;
  courses: string[];
  bio: string;
  avatarUrl: string;
  isConnected: boolean;
  isOnline: boolean;
};

const defaultPeers: Peer[] = [
  {
    id: "peer-1",
    name: "Jordan Taylor",
    major: "Computer Science",
    courses: ["Data Structures", "Algorithms", "Web Development"],
    bio: "Third-year CS student interested in AI and web technologies. Always looking for project collaborators!",
    avatarUrl: "",
    isConnected: false,
    isOnline: true,
  },
  {
    id: "peer-2",
    name: "Casey Rivera",
    major: "Mathematics",
    courses: ["Linear Algebra", "Calculus III", "Probability"],
    bio: "Math major with a minor in Computer Science. I enjoy tutoring and connecting with other STEM students.",
    avatarUrl: "",
    isConnected: false,
    isOnline: false,
  },
  {
    id: "peer-3",
    name: "Taylor Kim",
    major: "Physics",
    courses: ["Classical Mechanics", "Electromagnetism", "Math Methods"],
    bio: "Physics student researching quantum computing. Looking for study partners for upcoming exams.",
    avatarUrl: "",
    isConnected: false,
    isOnline: true,
  },
  {
    id: "peer-4",
    name: "Alex Johnson",
    major: "Chemistry",
    courses: ["Organic Chemistry", "Biochemistry", "Physical Chemistry"],
    bio: "Pre-med student passionate about biochemistry research. Happy to help with chemistry coursework.",
    avatarUrl: "",
    isConnected: false,
    isOnline: false,
  },
];

const PeerConnections = () => {
  const [peers, setPeers] = useState<Peer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMajor, setFilterMajor] = useState("All");

  useEffect(() => {
    // Load peers from localStorage or use defaults
    const savedPeers = localStorage.getItem("peerConnections");
    if (savedPeers) {
      setPeers(JSON.parse(savedPeers));
    } else {
      setPeers(defaultPeers);
    }
  }, []);

  useEffect(() => {
    // Save peers to localStorage whenever they change
    if (peers.length > 0) {
      localStorage.setItem("peerConnections", JSON.stringify(peers));
    }
  }, [peers]);

  const handleConnect = (peerId: string) => {
    setPeers(
      peers.map((peer) => {
        if (peer.id === peerId) {
          return {
            ...peer,
            isConnected: !peer.isConnected,
          };
        }
        return peer;
      })
    );
  };

  const filteredPeers = peers.filter(
    (peer) =>
      (filterMajor === "All" || peer.major === filterMajor) &&
      (peer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        peer.major.toLowerCase().includes(searchTerm.toLowerCase()) ||
        peer.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        peer.courses.some(course => course.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  const majors = ["All", "Computer Science", "Mathematics", "Physics", "Chemistry", "Biology", "Literature", "History", "Engineering"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-universe-500" />
          <Input
            placeholder="Search peers by name, major, or courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <select
          value={filterMajor}
          onChange={(e) => setFilterMajor(e.target.value)}
          className="p-2 border rounded-md bg-background text-sm"
        >
          {majors.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
      </div>

      {filteredPeers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPeers.map((peer) => (
            <div
              key={peer.id}
              className="bg-white dark:bg-universe-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-universe-100 dark:border-universe-700 flex"
            >
              <div className="mr-4">
                <div className="h-16 w-16 rounded-full bg-universe-200 dark:bg-universe-700 flex items-center justify-center relative">
                  <span className="text-2xl font-medium">
                    {peer.name.charAt(0)}
                  </span>
                  {peer.isOnline && (
                    <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-universe-800"></span>
                  )}
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-medium">{peer.name}</h3>
                    <div className="flex items-center text-sm text-universe-500">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      <span>{peer.major}</span>
                    </div>
                  </div>
                  <Badge variant={peer.isOnline ? "default" : "outline"}>
                    {peer.isOnline ? "Online" : "Offline"}
                  </Badge>
                </div>
                
                <p className="text-sm text-universe-600 dark:text-universe-300 mt-2 mb-2">
                  {peer.bio}
                </p>
                
                <div className="mb-3">
                  <div className="flex items-center text-xs text-universe-500 mb-1">
                    <BookOpen className="h-3 w-3 mr-1" />
                    <span>Current Courses:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {peer.courses.map((course, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant={peer.isConnected ? "outline" : "default"}
                    className="flex-1"
                    onClick={() => handleConnect(peer.id)}
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    {peer.isConnected ? "Connected" : "Connect"}
                  </Button>
                  
                  <Button size="sm" variant="outline" className="flex-1">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Message
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8">
          <div className="text-universe-500 mb-2">No peers found matching your criteria</div>
          <div className="text-sm">Try adjusting your search or filter settings</div>
        </div>
      )}
    </div>
  );
};

export default PeerConnections;
