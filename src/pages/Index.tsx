
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import DashboardOverview from '@/components/dashboard/DashboardOverview';

const Index = () => {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        title="Dashboard" 
        subtitle="Overview of your IT staffing operations"
      />
      
      <main className="flex-1 px-6 py-6">
        <DashboardOverview />
      </main>
    </div>
  );
};

export default Index;
