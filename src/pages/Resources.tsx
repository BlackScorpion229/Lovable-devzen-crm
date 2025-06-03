
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Users, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ResourcesPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Resource Management" 
          subtitle="Manage in-house and external IT resources"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Resources</h1>
                <p className="text-muted-foreground">Manage your talent pool and skill sets</p>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Resource
            </Button>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground text-center">
              Resource management module will be built here. This will include:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• In-house resource profiles and skills</li>
              <li>• External resource database</li>
              <li>• Skill matrix and technology stacks</li>
              <li>• Availability and scheduling</li>
              <li>• Performance tracking</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ResourcesPage;
