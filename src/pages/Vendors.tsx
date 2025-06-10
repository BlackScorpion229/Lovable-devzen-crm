import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import VendorTable from '@/components/vendor/VendorTable';
import VendorDialog from '@/components/vendor/VendorDialog';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Vendor } from '@/types/vendor';
import { useVendors, useDeleteVendor, useCreateVendor, useUpdateVendor } from '@/hooks/useVendors';

const VendorsPage = () => {
  const { data: vendors = [], isLoading } = useVendors();
  const deleteVendorMutation = useDeleteVendor();
  const createVendorMutation = useCreateVendor();
  const updateVendorMutation = useUpdateVendor();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVendors = vendors.filter(vendor =>
    vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.industry?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.contacts.some(contact => 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAddVendor = () => {
    setEditingVendor(null);
    setIsDialogOpen(true);
  };

  const handleEditVendor = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setIsDialogOpen(true);
  };

  const handleDeleteVendor = (vendorId: string) => {
    deleteVendorMutation.mutate(vendorId);
  };

  const handleSaveVendor = (vendor: Vendor) => {
    const { contacts, ...vendorData } = vendor;
    
    if (editingVendor) {
      updateVendorMutation.mutate({
        vendorId: editingVendor.id,
        vendorData: {
          ...vendorData,
          contacts: contacts.map(contact => ({ ...contact, isPrimary: contact.isPrimary }))
        }
      });
    } else {
      createVendorMutation.mutate({
        ...vendorData,
        contacts: contacts.map(contact => ({ ...contact, isPrimary: contact.isPrimary }))
      });
    }
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <Navbar 
          title="Vendor Management" 
          subtitle="Manage vendor relationships and contacts"
        />
        <main className="flex-1 px-6 py-6">
          <div className="text-center">Loading vendors...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        title="Vendor Management" 
        subtitle="Manage vendor relationships and contacts"
      />
      
      <main className="flex-1 px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">Manage your vendor network and contacts</p>
          <Button onClick={handleAddVendor} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Vendor
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search vendors, contacts, or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/50 backdrop-blur-sm"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 bg-white/50 backdrop-blur-sm">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        <div className="glass-card rounded-lg border">
          <VendorTable
            vendors={filteredVendors}
            onEdit={handleEditVendor}
            onDelete={handleDeleteVendor}
          />
        </div>

        <VendorDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          vendor={editingVendor}
          onSave={handleSaveVendor}
        />
      </main>
    </div>
  );
};

export default VendorsPage;
