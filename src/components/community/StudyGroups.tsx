
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users, BookOpen, Search } from "lucide-react";

type StudyGroup = {
  id: string;
  name: string;
  subject: string;
  description: string;
  meetingTime: string;
  meetingDay: string;
  location: string;
  memberCount: number;
  maxMembers: number;
  isMember: boolean;
};

const defaultGroups: StudyGroup[] = [
  {
    id: "group-1",
    name: "Calculus Masters",
    subject: "Mathematics",
    description: "Weekly study sessions for Calculus II, focusing on integration techniques and applications.",
    meetingTime: "4:00 PM",
    meetingDay: "Tuesday",
    location: "Library, Room 302",
    memberCount: 8,
    maxMembers: 12,
    isMember: false,
  },
  {
    id: "group-2",
    name: "Coding Club",
    subject: "Computer Science",
    description: "Programming practice sessions with a focus on algorithms and data structures.",
    meetingTime: "6:30 PM",
    meetingDay: "Thursday",
    location: "Computer Lab, Building B",
    memberCount: 15,
    maxMembers: 20,
    isMember: false,
  },
  {
    id: "group-3",
    name: "Physics Problem Solvers",
    subject: "Physics",
    description: "Group for tackling difficult physics problems and preparing for exams.",
    meetingTime: "3:30 PM",
    meetingDay: "Monday",
    location: "Science Center, Room 105",
    memberCount: 6,
    maxMembers: 10,
    isMember: false,
  },
];

const StudyGroups = () => {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("All");

  useEffect(() => {
    // Load groups from localStorage or use defaults
    const savedGroups = localStorage.getItem("studyGroups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    } else {
      setGroups(defaultGroups);
    }
  }, []);

  useEffect(() => {
    // Save groups to localStorage whenever they change
    if (groups.length > 0) {
      localStorage.setItem("studyGroups", JSON.stringify(groups));
    }
  }, [groups]);

  const handleJoinGroup = (groupId: string) => {
    setGroups(
      groups.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            memberCount: group.isMember ? group.memberCount - 1 : group.memberCount + 1,
            isMember: !group.isMember,
          };
        }
        return group;
      })
    );
  };

  const filteredGroups = groups.filter(
    (group) =>
      (filterSubject === "All" || group.subject === filterSubject) &&
      (group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const subjects = ["All", "Mathematics", "Computer Science", "Physics", "Chemistry", "Biology", "Literature", "History"];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-universe-500" />
          <Input
            placeholder="Search study groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
        
        <select
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="p-2 border rounded-md bg-background text-sm"
        >
          {subjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>

      {filteredGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white dark:bg-universe-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-universe-100 dark:border-universe-700"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-lg">{group.name}</h3>
                <Badge variant="outline">{group.subject}</Badge>
              </div>
              
              <p className="text-sm text-universe-600 dark:text-universe-300 mb-3">
                {group.description}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-universe-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{group.meetingDay}</span>
                </div>
                
                <div className="flex items-center text-sm text-universe-500">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{group.meetingTime}</span>
                </div>
                
                <div className="flex items-center text-sm text-universe-500">
                  <BookOpen className="h-4 w-4 mr-2" />
                  <span>{group.location}</span>
                </div>
                
                <div className="flex items-center text-sm text-universe-500">
                  <Users className="h-4 w-4 mr-2" />
                  <span>
                    {group.memberCount} / {group.maxMembers} members
                  </span>
                </div>
              </div>
              
              <Button
                onClick={() => handleJoinGroup(group.id)}
                variant={group.isMember ? "outline" : "default"}
                className="w-full"
                disabled={!group.isMember && group.memberCount >= group.maxMembers}
              >
                {group.isMember ? "Leave Group" : group.memberCount >= group.maxMembers ? "Group Full" : "Join Group"}
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center p-8">
          <div className="text-universe-500 mb-2">No study groups found matching your criteria</div>
          <div className="text-sm">Try adjusting your search or filter settings</div>
        </div>
      )}
    </div>
  );
};

export default StudyGroups;
