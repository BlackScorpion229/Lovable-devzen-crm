
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Building2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VendorsPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Vendor Management" 
          subtitle="Manage your IT staffing vendors and their contacts"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Vendors</h1>
                <p className="text-muted-foreground">Manage vendors and their contacts</p>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Vendor
            </Button>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground text-center">
              Vendor management module will be built here. This will include:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Vendor profiles and information</li>
              <li>• Multiple contacts per vendor</li>
              <li>• Vendor performance tracking</li>
              <li>• Contact management and communication history</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorsPage;
