
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Briefcase, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const JobRequirementsPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Job Requirements" 
          subtitle="Manage job postings and requirements from vendors"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Job Requirements</h1>
                <p className="text-muted-foreground">Track and manage job postings</p>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Job Requirement
            </Button>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground text-center">
              Job requirements module will be built here. This will include:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Job posting management</li>
              <li>• Requirement specifications and skills needed</li>
              <li>• Client and vendor association</li>
              <li>• Priority and urgency levels</li>
              <li>• Application tracking</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default JobRequirementsPage;
