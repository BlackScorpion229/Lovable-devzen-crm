
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { GitBranch, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProcessFlowPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Process Flow" 
          subtitle="Track requirement fulfillment workflow"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Process Flow</h1>
                <p className="text-muted-foreground">Monitor requirement workflow stages</p>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Start New Process
            </Button>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground text-center">
              Process flow module will be built here. This will include:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Requirement lifecycle tracking</li>
              <li>• Status updates and stage management</li>
              <li>• Resource allocation workflow</li>
              <li>• Client communication tracking</li>
              <li>• Timeline and milestone management</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProcessFlowPage;
