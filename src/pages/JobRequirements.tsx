
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import JobRequirementTable from '@/components/jobRequirement/JobRequirementTable';
import JobRequirementDialog from '@/components/jobRequirement/JobRequirementDialog';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobRequirement } from '@/types/jobRequirement';
import { useJobRequirements, useDeleteJobRequirement } from '@/hooks/useJobRequirements';

const JobRequirementsPage = () => {
  const { data: jobRequirements = [], isLoading } = useJobRequirements();
  const deleteJobMutation = useDeleteJobRequirement();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobRequirement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = jobRequirements.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddJob = () => {
    setEditingJob(null);
    setIsDialogOpen(true);
  };

  const handleEditJob = (job: JobRequirement) => {
    setEditingJob(job);
    setIsDialogOpen(true);
  };

  const handleDeleteJob = (jobId: string) => {
    deleteJobMutation.mutate(jobId);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <Navbar 
          title="Job Requirements" 
          subtitle="Manage client job requirements and openings"
        />
        <main className="flex-1 px-6 py-6">
          <div className="text-center">Loading job requirements...</div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        title="Job Requirements" 
        subtitle="Manage client job requirements and openings"
      />
      
      <main className="flex-1 px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">Track client requirements and job openings</p>
          <Button onClick={handleAddJob} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Job Requirement
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by title, client, job ID, or skills..."
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
          <JobRequirementTable
            jobRequirements={filteredJobs}
            onEdit={handleEditJob}
            onView={handleEditJob}
            onDelete={handleDeleteJob}
          />
        </div>

        <JobRequirementDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          jobRequirement={editingJob}
        />
      </main>
    </div>
  );
};

export default JobRequirementsPage;
