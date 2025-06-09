
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Clock, Users, Plus } from 'lucide-react';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data for activities
  const todayActivities = [
    {
      id: '1',
      time: '09:00 AM',
      title: 'Technical Interview - Senior Data Scientist',
      client: 'ABC Corp',
      type: 'Interview',
      priority: 'High'
    },
    {
      id: '2',
      time: '02:00 PM',
      title: 'Client Meeting - Project Kickoff',
      client: 'XYZ Ltd',
      type: 'Meeting',
      priority: 'Medium'
    },
    {
      id: '3',
      time: '04:30 PM',
      title: 'Candidate Screening Call',
      client: 'TechFlow',
      type: 'Screening',
      priority: 'Low'
    }
  ];

  const upcomingActivities = [
    {
      id: '4',
      date: 'Tomorrow',
      time: '10:00 AM',
      title: 'Final Interview - DevOps Engineer',
      client: 'InnovateTech',
      type: 'Interview'
    },
    {
      id: '5',
      date: 'Dec 12',
      time: '11:30 AM',
      title: 'Contract Review Meeting',
      client: 'DataFlow Corp',
      type: 'Meeting'
    },
    {
      id: '6',
      date: 'Dec 15',
      time: '03:00 PM',
      title: 'Quarterly Business Review',
      client: 'Multiple Clients',
      type: 'Review'
    }
  ];

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
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5" />
                Calendar
              </CardTitle>
              <Button size="sm" className="shadow-md">
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
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

          {/* Today's Activities */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {todayActivities.map((activity) => (
                <div key={activity.id} className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-primary">{activity.time}</span>
                    <Badge className={getPriorityColor(activity.priority)}>{activity.priority}</Badge>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{activity.title}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{activity.client}</p>
                  <Badge className={getActivityColor(activity.type)}>{activity.type}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Upcoming Activities */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Upcoming Activities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingActivities.map((activity) => (
                <div key={activity.id} className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-white/20">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-primary">{activity.date} - {activity.time}</span>
                    <Badge className={getActivityColor(activity.type)}>{activity.type}</Badge>
                  </div>
                  <h4 className="font-semibold text-sm mb-1">{activity.title}</h4>
                  <p className="text-xs text-muted-foreground">{activity.client}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
