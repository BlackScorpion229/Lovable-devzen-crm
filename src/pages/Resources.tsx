
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ResourceTable from '@/components/resource/ResourceTable';
import ResourceDialog from '@/components/resource/ResourceDialog';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Resource } from '@/types/resource';
import { useResources, useDeleteResource } from '@/hooks/useResources';

const ResourcesPage = () => {
  const { data: resources = [], isLoading } = useResources();
  const deleteResourceMutation = useDeleteResource();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddResource = () => {
    setEditingResource(null);
    setIsDialogOpen(true);
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setIsDialogOpen(true);
  };

  const handleDeleteResource = (resourceId: string) => {
    deleteResourceMutation.mutate(resourceId);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <Navbar 
          title="Resource Management" 
          subtitle="Manage human resources and talent pool"
        />
        <main className="flex-1 px-6 py-6">
          <div className="text-center">Loading resources...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        title="Resource Management" 
        subtitle="Manage human resources and talent pool"
      />
      
      <main className="flex-1 px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">Track and manage your talent pool</p>
          <Button onClick={handleAddResource} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Resource
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, skills, or type..."
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
          <ResourceTable
            resources={filteredResources}
            onEdit={handleEditResource}
            onDelete={handleDeleteResource}
          />
        </div>

        <ResourceDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          resource={editingResource}
        />
      </main>
    </div>
  );
};

export default ResourcesPage;
