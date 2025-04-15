
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  CalendarCheck,
  Tag,
  Info
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  attendees: number;
  isRegistered: boolean;
};

const defaultEvents: Event[] = [
  {
    id: "event-1",
    title: "Programming Hackathon",
    description: "24-hour hackathon focused on developing educational applications. Prizes for top teams! Food and refreshments provided.",
    date: new Date(2025, 3, 20), // April 20, 2025
    time: "9:00 AM - 9:00 AM (next day)",
    location: "Computer Science Building, Main Hall",
    category: "Computer Science",
    attendees: 45,
    isRegistered: false,
  },
  {
    id: "event-2",
    title: "Research Symposium",
    description: "Annual research symposium featuring student and faculty presentations across all academic disciplines.",
    date: new Date(2025, 3, 25), // April 25, 2025
    time: "1:00 PM - 5:00 PM",
    location: "University Center, Grand Ballroom",
    category: "Academic",
    attendees: 120,
    isRegistered: false,
  },
  {
    id: "event-3",
    title: "Study Skills Workshop",
    description: "Learn effective study techniques and time management skills to improve your academic performance.",
    date: new Date(2025, 3, 18), // April 18, 2025
    time: "3:30 PM - 5:00 PM",
    location: "Library, Workshop Room 2",
    category: "Workshop",
    attendees: 28,
    isRegistered: false,
  },
  {
    id: "event-4",
    title: "Career Fair",
    description: "Connect with potential employers from various industries. Bring your resume and dress professionally.",
    date: new Date(2025, 4, 5), // May 5, 2025
    time: "10:00 AM - 3:00 PM",
    location: "Student Union Building, Main Floor",
    category: "Career",
    attendees: 200,
    isRegistered: false,
  },
];

const EventsCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [eventsOpen, setEventsOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Load events from localStorage or use defaults
    const savedEvents = localStorage.getItem("communityEvents");
    if (savedEvents) {
      // Parse stored events and convert date strings back to Date objects
      const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
      setEvents(parsedEvents);
    } else {
      setEvents(defaultEvents);
    }
  }, []);

  useEffect(() => {
    // Save events to localStorage whenever they change, converting Date objects to strings
    if (events.length > 0) {
      localStorage.setItem(
        "communityEvents", 
        JSON.stringify(events.map(event => ({
          ...event,
          date: event.date.toISOString()
        })))
      );
    }
  }, [events]);

  const handleRegister = (eventId: string) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            attendees: event.isRegistered ? event.attendees - 1 : event.attendees + 1,
            isRegistered: !event.isRegistered,
          };
        }
        return event;
      })
    );
  };

  const toggleEventDetails = (eventId: string) => {
    setEventsOpen(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  // Get dates that have events
  const eventDates = events.map(event => 
    event.date.toISOString().split('T')[0]
  );

  // Filter events for selected date
  const selectedDateEvents = selectedDate 
    ? events.filter(
        event => 
          event.date.getDate() === selectedDate.getDate() && 
          event.date.getMonth() === selectedDate.getMonth() && 
          event.date.getFullYear() === selectedDate.getFullYear()
      )
    : [];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1 h-fit">
        <CardContent className="p-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="border rounded-md p-3"
            modifiers={{
              hasEvent: (date) => {
                const dateStr = date.toISOString().split('T')[0];
                return eventDates.includes(dateStr);
              }
            }}
            modifiersClassNames={{
              hasEvent: "bg-primary/20 font-bold text-primary"
            }}
          />
        </CardContent>
      </Card>

      <div className="md:col-span-2 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-lg">
            {selectedDate ? (
              <>Events for {formatDate(selectedDate)}</>
            ) : (
              "Select a date to view events"
            )}
          </h3>
        </div>

        {selectedDateEvents.length > 0 ? (
          <div className="space-y-4">
            {selectedDateEvents.map((event) => (
              <Collapsible
                key={event.id}
                open={eventsOpen[event.id]}
                onOpenChange={() => toggleEventDetails(event.id)}
                className="bg-white dark:bg-universe-800 border border-universe-100 dark:border-universe-700 rounded-lg overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{event.title}</h3>
                        <Badge>{event.category}</Badge>
                      </div>
                      
                      <div className="flex items-center text-sm text-universe-500 mb-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{event.time}</span>
                      </div>
                      
                      <div className="flex items-center text-sm text-universe-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Info className="h-4 w-4" />
                        <span className="sr-only">Toggle details</span>
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4 pt-1 border-t border-universe-100 dark:border-universe-700">
                    <p className="text-sm text-universe-600 dark:text-universe-300 mb-3">
                      {event.description}
                    </p>
                    
                    <div className="flex items-center text-sm text-universe-500 mb-3">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{event.attendees} attending</span>
                    </div>
                    
                    <Button
                      onClick={() => handleRegister(event.id)}
                      variant={event.isRegistered ? "outline" : "default"}
                      className="w-full"
                    >
                      <CalendarCheck className="h-4 w-4 mr-1" />
                      {event.isRegistered ? "Registered" : "Register to Attend"}
                    </Button>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        ) : selectedDate ? (
          <div className="text-center p-8 bg-white dark:bg-universe-800 rounded-lg border border-universe-100 dark:border-universe-700">
            <div className="text-universe-500">No events scheduled for this day</div>
          </div>
        ) : (
          <div className="text-center p-8 bg-white dark:bg-universe-800 rounded-lg border border-universe-100 dark:border-universe-700">
            <div className="text-universe-500">Select a date to view events</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsCalendar;
