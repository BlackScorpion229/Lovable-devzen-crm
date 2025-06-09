import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ResourceTable from '@/components/resource/ResourceTable';
import ResourceDialog from '@/components/resource/ResourceDialog';
import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Resource, ResourceFormData } from '@/types/resource';
import { useToast } from '@/hooks/use-toast';

const ResourcesPage = () => {
  const { toast } = useToast();
  
  const [resources, setResources] = useState<Resource[]>([
    {
      id: '1',
      name: 'Alice Johnson',
      techStack: ['Java', 'Spring Boot'],
      type: 'In-house',
      contact: 'alice.johnson@company.com',
      phone: '+1-555-0101',
      experience: 5,
      availability: 'Available',
      hourlyRate: 75,
      createdAt: '2024-01-15',
      notes: 'Senior developer with microservices experience',
      resumeFile: 'alice_resume.pdf'
    },
    {
      id: '2',
      name: 'Bob Martin',
      techStack: ['Python', 'Django'],
      type: 'In-house-Friends',
      contact: 'bob.martin@company.com',
      phone: '+1-555-0102',
      experience: 7,
      availability: 'On Project',
      hourlyRate: 85,
      createdAt: '2024-01-10',
      notes: 'Full-stack developer specializing in web applications'
    },
    {
      id: '3',
      name: 'Charlie Davis',
      techStack: ['JavaScript', 'React'],
      type: 'External-LinkedIn',
      contact: 'charlie.davis@example.com',
      phone: '+1-555-0103',
      experience: 4,
      availability: 'Available',
      hourlyRate: 70,
      createdAt: '2024-01-12',
      notes: 'Frontend specialist with React expertise'
    },
    {
      id: '4',
      name: 'Diana Evans',
      techStack: ['DevOps', 'AWS'],
      type: 'External-Email',
      contact: 'diana.evans@example.com',
      phone: '+1-555-0104',
      experience: 6,
      availability: 'Busy',
      hourlyRate: 90,
      createdAt: '2024-01-08',
      notes: 'DevOps engineer with cloud infrastructure experience'
    },
    {
      id: '5',
      name: 'Ethan Wilson',
      techStack: ['Data Science', 'Python'],
      type: 'External-Referral',
      contact: 'ethan.wilson@example.com',
      phone: '+1-555-0105',
      experience: 3,
      availability: 'Available',
      hourlyRate: 80,
      createdAt: '2024-01-20',
      notes: 'Data scientist with machine learning background'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredResources = resources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
    resource.contact.toLowerCase().includes(searchTerm.toLowerCase())
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
    setResources(resources.filter(r => r.id !== resourceId));
    toast({
      title: "Resource deleted",
      description: "The resource has been successfully removed.",
    });
  };

  const handleSaveResource = (resourceData: ResourceFormData) => {
    if (editingResource) {
      setResources(resources.map(r => 
        r.id === editingResource.id 
          ? { ...r, ...resourceData, resumeFile: resourceData.resumeFile?.name }
          : r
      ));
      toast({
        title: "Resource updated",
        description: "The resource has been successfully updated.",
      });
    } else {
      const newResource: Resource = {
        id: Date.now().toString(),
        ...resourceData,
        resumeFile: resourceData.resumeFile?.name,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setResources([...resources, newResource]);
      toast({
        title: "Resource added",
        description: "The new resource has been successfully added.",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        title="Resource Management" 
        subtitle="Manage in-house and external IT resources"
      />
      
      <main className="flex-1 px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">Manage your talent pool and skill sets</p>
          <Button onClick={handleAddResource} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Resource
          </Button>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search resources by name, tech stack, or contact..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/50 backdrop-blur-sm"
            />
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
          onSave={handleSaveResource}
          resource={editingResource}
        />
      </main>
    </div>
  );
};

export default ResourcesPage;
