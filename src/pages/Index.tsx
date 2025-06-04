
import React from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/layout/AppSidebar';
import Navbar from '@/components/layout/Navbar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { Building2, Users, Briefcase, GitBranch, CheckCircle, XCircle, Pause, Clock } from 'lucide-react';

const Index = () => {
  const quickStats = [
    {
      title: "Active Vendors",
      value: "12",
      icon: Building2,
      description: "Vendors currently providing services"
    },
    {
      title: "Available Resources",
      value: "45",
      icon: Users,
      description: "In-house and external resources"
    },
    {
      title: "Total Job Requirements",
      value: "23",
      icon: Briefcase,
      description: "All job requirements in system"
    },
    {
      title: "Active Processes",
      value: "15",
      icon: GitBranch,
      description: "Requirements in progress"
    }
  ];

  const jobRequirementStats = [
    {
      title: "Active",
      value: "8",
      icon: CheckCircle,
      description: "Currently active job requirements",
      color: "text-green-600"
    },
    {
      title: "Closed",
      value: "10",
      icon: XCircle,
      description: "Successfully closed requirements",
      color: "text-blue-600"
    },
    {
      title: "Inactive",
      value: "3",
      icon: Pause,
      description: "Temporarily inactive requirements",
      color: "text-gray-600"
    },
    {
      title: "On Hold",
      value: "2",
      icon: Clock,
      description: "Requirements on hold",
      color: "text-yellow-600"
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Navbar 
            title="Dashboard" 
            subtitle="DevZen IT Staffing CRM"
          />
          
          <main className="flex-1 px-6 py-6">
            <DashboardOverview />
            
            <section className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Quick Overview</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {quickStats.map((stat, index) => (
                  <div key={stat.title} className="bg-card rounded-lg border p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-3 mb-2">
                      <stat.icon className="w-8 h-8 text-primary" />
                      <div>
                        <h3 className="font-semibold text-lg">{stat.value}</h3>
                        <p className="text-sm font-medium">{stat.title}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.description}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Job Requirements Status</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {jobRequirementStats.map((stat, index) => (
                    <div key={stat.title} className="bg-card rounded-lg border p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-2">
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        <div>
                          <h3 className="font-semibold text-2xl">{stat.value}</h3>
                          <p className="text-sm font-medium">{stat.title}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card rounded-lg border p-6">
                <h3 className="text-xl font-semibold mb-4">Welcome to DevZen IT Staffing CRM</h3>
                <p className="text-muted-foreground mb-4">
                  Your comprehensive solution for managing IT staffing operations. Use the navigation menu to access:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• <strong>Vendors:</strong> Manage your vendor relationships and contacts</li>
                  <li>• <strong>Resources:</strong> Track in-house and external talent pool</li>
                  <li>• <strong>Job Requirements:</strong> Handle job postings and requirements</li>
                  <li>• <strong>Process Flow:</strong> Monitor requirement fulfillment workflow</li>
                  <li>• <strong>Calendar:</strong> View scheduled activities and job flows</li>
                </ul>
              </div>
            </section>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
