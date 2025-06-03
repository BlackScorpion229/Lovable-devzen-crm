
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Building2, Users, Briefcase, GitBranch } from 'lucide-react';

const Index = () => {
  const isMobile = useIsMobile();
  
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
      title: "Open Requirements",
      value: "8",
      icon: Briefcase,
      description: "Job requirements pending fulfillment"
    },
    {
      title: "Active Processes",
      value: "15",
      icon: GitBranch,
      description: "Requirements in progress"
    }
  ];

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
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
                <li>• <strong>Reports:</strong> View analytics and performance metrics</li>
              </ul>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Index;
