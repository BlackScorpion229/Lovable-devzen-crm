import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Phone, Video, MessageSquare, Clock } from 'lucide-react';
import { format } from 'date-fns';

const CalendarPage: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const allActivities = [
    {
      id: '1',
      title: 'Screening Call - John Doe',
      type: 'Screening Call',
      time: '10:00 AM',
      date: '2024-06-05',
      status: 'Scheduled',
      color: 'bg-blue-100 text-blue-800',
      icon: Phone
    },
    {
      id: '2',
      title: 'Client Interview - Jane Smith',
      type: 'Client Call',
      time: '2:00 PM',
      date: '2024-06-05',
      status: 'In Progress',
      color: 'bg-green-100 text-green-800',
      icon: Video
    },
    {
      id: '3',
      title: 'Technical Round - Mike Johnson',
      type: 'Technical Interview',
      time: '11:00 AM',
      date: '2024-06-06',
      status: 'Pending',
      color: 'bg-yellow-100 text-yellow-800',
      icon: MessageSquare
    },
    {
      id: '4',
      title: 'Follow-up Call - Sarah Wilson',
      type: 'Follow-up',
      time: '3:30 PM',
      date: '2024-06-06',
      status: 'Confirmed',
      color: 'bg-purple-100 text-purple-800',
      icon: Phone
    },
    {
      id: '5',
      title: 'Final Interview - Alex Brown',
      type: 'Final Round',
      time: '9:00 AM',
      date: format(new Date(), 'yyyy-MM-dd'),
      status: 'Scheduled',
      color: 'bg-blue-100 text-blue-800',
      icon: Video
    },
    {
      id: '6',
      title: 'Reference Check - Lisa Davis',
      type: 'Reference Call',
      time: '4:00 PM',
      date: format(new Date(), 'yyyy-MM-dd'),
      status: 'Pending',
      color: 'bg-yellow-100 text-yellow-800',
      icon: Phone
    }
  ];

  const upcomingActivities = allActivities.filter(activity => 
    new Date(activity.date) >= new Date()
  ).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const selectedDateActivities = date ? allActivities.filter(activity => 
    activity.date === format(date, 'yyyy-MM-dd')
  ) : [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        title="Calendar" 
        subtitle="Schedule and track job requirement activities"
      />
      
      <main className="flex-1 px-6 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <CalendarDays className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold">Calendar</h1>
              <p className="text-muted-foreground">Track job requirement workflows and activities</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Calendar View</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Status Legend */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg">Status Legend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Scheduled</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm">In Progress</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Pending</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Confirmed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-fit">
              {/* Selected Date Activities */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <CalendarDays className="w-5 h-5" />
                    {date ? format(date, 'MMM d, yyyy') : 'Selected Date'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedDateActivities.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateActivities.map((activity) => (
                        <div key={activity.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex gap-2">
                              <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                                <activity.icon className="w-3 h-3" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{activity.title}</h4>
                                <p className="text-xs text-muted-foreground">{activity.type}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <Clock className="w-3 h-3 text-muted-foreground" />
                                  <span className="text-xs font-medium">{activity.time}</span>
                                </div>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(activity.status)} text-xs`}>
                              {activity.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <CalendarDays className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">No activities for this date</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upcoming Activities */}
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="w-5 h-5" />
                    Upcoming Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingActivities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex gap-2">
                            <div className="p-1.5 bg-primary/10 text-primary rounded-md">
                              <activity.icon className="w-3 h-3" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{activity.title}</h4>
                              <p className="text-xs text-muted-foreground">{activity.type}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-medium">{activity.date}</span>
                                <span className="text-xs text-muted-foreground">{activity.time}</span>
                              </div>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(activity.status)} text-xs`}>
                            {activity.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CalendarPage;
