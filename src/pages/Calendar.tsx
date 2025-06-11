
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Clock, Users } from 'lucide-react';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data for activities
  const allActivities = [
    {
      id: '1',
      date: new Date(),
      time: '09:00 AM',
      title: 'Technical Interview - Senior Data Scientist',
      client: 'ABC Corp',
      type: 'Interview',
      priority: 'High'
    },
    {
      id: '2',
      date: new Date(),
      time: '02:00 PM',
      title: 'Client Meeting - Project Kickoff',
      client: 'XYZ Ltd',
      type: 'Meeting',
      priority: 'Medium'
    },
    {
      id: '3',
      date: new Date(),
      time: '04:30 PM',
      title: 'Candidate Screening Call',
      client: 'TechFlow',
      type: 'Screening',
      priority: 'Low'
    },
    {
      id: '4',
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: '10:00 AM',
      title: 'Final Interview - DevOps Engineer',
      client: 'InnovateTech',
      type: 'Interview',
      priority: 'High'
    },
    {
      id: '5',
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      time: '11:30 AM',
      title: 'Contract Review Meeting',
      client: 'DataFlow Corp',
      type: 'Meeting',
      priority: 'Medium'
    },
    {
      id: '6',
      date: new Date(Date.now() + 259200000), // 3 days from now
      time: '03:00 PM',
      title: 'Quarterly Business Review',
      client: 'Multiple Clients',
      type: 'Review',
      priority: 'Low'
    },
    {
      id: '7',
      date: new Date(Date.now() + 345600000), // 4 days from now
      time: '01:00 PM',
      title: 'Team Sync Meeting',
      client: 'Internal',
      type: 'Meeting',
      priority: 'Medium'
    },
    {
      id: '8',
      date: new Date(Date.now() + 432000000), // 5 days from now
      time: '09:30 AM',
      title: 'New Client Onboarding',
      client: 'StartupTech',
      type: 'Meeting',
      priority: 'High'
    }
  ];

  // Get activities for selected date
  const getSelectedDateActivities = () => {
    if (!selectedDate) return [];
    
    const selectedDateStr = selectedDate.toDateString();
    return allActivities.filter(activity => 
      activity.date.toDateString() === selectedDateStr
    );
  };

  // Get next 5 days activities
  const getNext5DaysActivities = () => {
    const today = new Date();
    const next5Days = [];
    
    for (let i = 1; i <= 5; i++) {
      const date = new Date(today.getTime() + (i * 86400000));
      const dayActivities = allActivities.filter(activity => 
        activity.date.toDateString() === date.toDateString()
      );
      
      if (dayActivities.length > 0) {
        next5Days.push(...dayActivities.map(activity => ({
          ...activity,
          dateLabel: i === 1 ? 'Tomorrow' : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        })));
      }
    }
    
    return next5Days;
  };

  const selectedDateActivities = getSelectedDateActivities();
  const upcomingActivities = getNext5DaysActivities();

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'Interview':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Meeting':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Screening':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Review':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSelectedDateLabel = () => {
    if (!selectedDate) return 'No Date Selected';
    
    const today = new Date();
    const selectedDateStr = selectedDate.toDateString();
    const todayStr = today.toDateString();
    
    if (selectedDateStr === todayStr) {
      return "Today's Activities";
    }
    
    return `Activities for ${selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    })}`;
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        title="Calendar" 
        subtitle="Manage your schedule and appointments"
      />
      
      <main className="flex-1 px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Widget */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0"
              />
            </CardContent>
          </Card>

          {/* Selected Date Activities */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {getSelectedDateLabel()}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDateActivities.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No activities scheduled for this date
                </p>
              ) : (
                selectedDateActivities.map((activity) => (
                  <div key={activity.id} className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-primary">{activity.time}</span>
                      <Badge className={getPriorityColor(activity.priority)}>{activity.priority}</Badge>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground mb-2">{activity.client}</p>
                    <Badge className={getActivityColor(activity.type)}>{activity.type}</Badge>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Next 5 Days Activities */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Next 5 Days Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingActivities.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No upcoming activities in the next 5 days
                </p>
              ) : (
                upcomingActivities.map((activity) => (
                  <div key={activity.id} className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-sm font-medium text-primary">
                        {activity.dateLabel} - {activity.time}
                      </span>
                      <Badge className={getActivityColor(activity.type)}>{activity.type}</Badge>
                    </div>
                    <h4 className="font-semibold text-sm mb-1">{activity.title}</h4>
                    <p className="text-xs text-muted-foreground">{activity.client}</p>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
