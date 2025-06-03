
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Contact, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactsPage = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Contact Management" 
          subtitle="Manage all vendor contacts and communication"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Contact className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Contacts</h1>
                <p className="text-muted-foreground">Manage vendor contacts and communication</p>
              </div>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Contact
            </Button>
          </div>

          <div className="bg-card rounded-lg border p-6">
            <p className="text-muted-foreground text-center">
              Contact management module will be built here. This will include:
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>• Contact profiles and details</li>
              <li>• Communication history</li>
              <li>• Contact preferences and availability</li>
              <li>• Vendor association management</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ContactsPage;
