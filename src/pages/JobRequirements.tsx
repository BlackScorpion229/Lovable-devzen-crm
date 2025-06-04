
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Briefcase, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import JobRequirementTable from '@/components/jobRequirement/JobRequirementTable';
import JobRequirementDialog from '@/components/jobRequirement/JobRequirementDialog';
import { JobRequirement, JobRequirementFormData } from '@/types/jobRequirement';

const JobRequirementsPage = () => {
  const isMobile = useIsMobile();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJobRequirement, setEditingJobRequirement] = useState<JobRequirement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Sample data
  const [jobRequirements, setJobRequirements] = useState<JobRequirement[]>([
    {
      id: '1',
      title: 'Senior React Developer',
      client: 'TechCorp Inc.',
      vendor: 'Vertex Solutions',
      description: 'Looking for an experienced React developer to join our frontend team.',
      techStack: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      experience: 5,
      location: 'New York, NY',
      salary: { min: 120, max: 150, currency: 'USD' },
      status: 'Active',
      priority: 'High',
      createdAt: '2024-06-01',
      deadline: '2024-06-15',
      assignedResources: ['res1', 'res2'],
      notes: 'Remote work available'
    },
    {
      id: '2',
      title: 'DevOps Engineer',
      client: 'StartupXYZ',
      description: 'DevOps engineer needed for cloud infrastructure management.',
      techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
      experience: 3,
      location: 'San Francisco, CA',
      salary: { min: 100, max: 130, currency: 'USD' },
      status: 'Active',
      priority: 'Medium',
      createdAt: '2024-06-02',
      deadline: '2024-06-20',
      notes: 'On-site required'
    },
    {
      id: '3',
      title: 'Full Stack Developer',
      client: 'Enterprise Solutions',
      vendor: 'Tech Recruiters Pro',
      description: 'Full stack developer for enterprise web applications.',
      techStack: ['Java', 'Spring Boot', 'Angular', 'PostgreSQL'],
      experience: 4,
      location: 'Austin, TX',
      status: 'OnHold',
      priority: 'Low',
      createdAt: '2024-05-28',
      notes: 'Budget approval pending'
    }
  ]);

  const stats = {
    total: jobRequirements.length,
    active: jobRequirements.filter(job => job.status === 'Active').length,
    closed: jobRequirements.filter(job => job.status === 'Closed').length,
    inactive: jobRequirements.filter(job => job.status === 'Inactive').length,
    onHold: jobRequirements.filter(job => job.status === 'OnHold').length,
  };

  const filteredJobRequirements = jobRequirements.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAddJobRequirement = () => {
    setEditingJobRequirement(null);
    setIsDialogOpen(true);
  };

  const handleEditJobRequirement = (jobRequirement: JobRequirement) => {
    setEditingJobRequirement(jobRequirement);
    setIsDialogOpen(true);
  };

  const handleDeleteJobRequirement = (jobRequirementId: string) => {
    setJobRequirements(prev => prev.filter(job => job.id !== jobRequirementId));
  };

  const handleSaveJobRequirement = (data: JobRequirementFormData) => {
    if (editingJobRequirement) {
      setJobRequirements(prev => prev.map(job => 
        job.id === editingJobRequirement.id 
          ? { ...job, ...data }
          : job
      ));
    } else {
      const newJobRequirement: JobRequirement = {
        id: Date.now().toString(),
        ...data,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setJobRequirements(prev => [...prev, newJobRequirement]);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'OnHold': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
            <Button onClick={handleAddJobRequirement} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Job Requirement
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.total}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.active}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Closed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-600">{stats.closed}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Inactive</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">{stats.inactive}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">On Hold</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{stats.onHold}</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by title, client, or tech stack..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="OnHold">On Hold</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Job Requirements Table */}
          <Card>
            <CardContent className="p-0">
              <JobRequirementTable
                jobRequirements={filteredJobRequirements}
                onEdit={handleEditJobRequirement}
                onDelete={handleDeleteJobRequirement}
              />
            </CardContent>
          </Card>

          {/* Dialog */}
          <JobRequirementDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSaveJobRequirement}
            editingJobRequirement={editingJobRequirement}
          />
        </main>
      </div>
    </div>
  );
};

export default JobRequirementsPage;
