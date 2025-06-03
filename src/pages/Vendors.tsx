
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Building2, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import VendorTable from '@/components/vendor/VendorTable';
import VendorDialog from '@/components/vendor/VendorDialog';
import { Vendor } from '@/types/vendor';

// Mock data for demonstration
const mockVendors: Vendor[] = [
  {
    id: '1',
    name: 'Vendor A',
    company: 'Tech Solutions Inc',
    industry: 'Software Development',
    status: 'active',
    createdAt: '2024-01-15',
    contacts: [
      { id: '1', name: 'John Doe', email: 'john.doe@vendora.com', phone: '+1 555-123-4567', position: 'Sales Manager', isPrimary: true },
      { id: '2', name: 'Jane Smith', email: 'jane.smith@vendora.com', phone: '+1 555-987-6543', position: 'Account Manager', isPrimary: false }
    ]
  },
  {
    id: '2',
    name: 'Vendor B',
    company: 'Digital Partners LLC',
    industry: 'IT Consulting',
    status: 'active',
    createdAt: '2024-01-20',
    contacts: [
      { id: '3', name: 'Michael Brown', email: 'michael.brown@vendorb.com', phone: '+1 555-222-3333', position: 'Director', isPrimary: true }
    ]
  },
  {
    id: '3',
    name: 'Vendor C',
    company: 'Innovation Corp',
    industry: 'Software Development',
    status: 'active',
    createdAt: '2024-02-01',
    contacts: [
      { id: '4', name: 'Linda Green', email: 'linda.green@vendorc.com', phone: '+1 555-444-5555', position: 'HR Manager', isPrimary: true },
      { id: '5', name: 'Robert White', email: 'robert.white@vendorc.com', phone: '+1 555-666-7777', position: 'Technical Lead', isPrimary: false }
    ]
  },
  {
    id: '4',
    name: 'Vendor D',
    company: 'Tech Innovations',
    industry: 'Cloud Services',
    status: 'active',
    createdAt: '2024-02-10',
    contacts: [
      { id: '6', name: 'Emily Clark', email: 'emily.clark@vendord.com', phone: '+1 555-888-9999', position: 'Operations Manager', isPrimary: true }
    ]
  },
  {
    id: '5',
    name: 'Vendor E',
    company: 'Digital Solutions',
    industry: 'Web Development',
    status: 'active',
    createdAt: '2024-02-15',
    contacts: [
      { id: '7', name: 'David Lee', email: 'david.lee@vendore.com', phone: '+1 555-101-2020', position: 'Project Manager', isPrimary: true }
    ]
  }
];

const VendorsPage = () => {
  const isMobile = useIsMobile();
  const [vendors, setVendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contacts.some(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAddVendor = () => {
    setSelectedVendor(null);
    setIsDialogOpen(true);
  };

  const handleEditVendor = (vendor: Vendor) => {
    setSelectedVendor(vendor);
    setIsDialogOpen(true);
  };

  const handleDeleteVendor = (vendorId: string) => {
    setVendors(vendors.filter(v => v.id !== vendorId));
  };

  const handleSaveVendor = (vendor: Vendor) => {
    if (selectedVendor) {
      setVendors(vendors.map(v => v.id === vendor.id ? vendor : v));
    } else {
      setVendors([...vendors, { ...vendor, id: Date.now().toString() }]);
    }
    setIsDialogOpen(false);
    setSelectedVendor(null);
  };

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
            <Button onClick={handleAddVendor} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Vendor
            </Button>
          </div>

          <div className="bg-card rounded-lg border">
            <div className="p-6 border-b">
              <div className="flex gap-4 items-center">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search vendors, contacts, or emails..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </Button>
              </div>
            </div>

            <VendorTable 
              vendors={filteredVendors}
              onEdit={handleEditVendor}
              onDelete={handleDeleteVendor}
            />
          </div>
        </main>
      </div>

      <VendorDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        vendor={selectedVendor}
        onSave={handleSaveVendor}
      />
    </div>
  );
};

export default VendorsPage;
