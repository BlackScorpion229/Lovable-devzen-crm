import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import JobRequirementTable from '@/components/jobRequirement/JobRequirementTable';
import JobRequirementDialog from '@/components/jobRequirement/JobRequirementDialog';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JobRequirement, JobRequirementFormData } from '@/types/jobRequirement';
import { useToast } from '@/hooks/use-toast';

const JobRequirementsPage = () => {
  const { toast } = useToast();
  
  const [jobRequirements, setJobRequirements] = useState<JobRequirement[]>([
    {
      id: '1',
      jobId: 'DZ-DS-0001',
      title: 'Senior Data Scientist',
      client: 'ABC Corp',
      description: 'Looking for an experienced data scientist with expertise in machine learning and statistical analysis.',
      status: 'Active',
      priority: 'High',
      budget: 120000,
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      techStack: ['Python', 'TensorFlow', 'SQL', 'AWS'],
      experience: 5,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: '2',
      jobId: 'DZ-DE-0001',
      title: 'Data Engineer',
      client: 'XYZ Ltd',
      description: 'Seeking a skilled data engineer to build and maintain data pipelines.',
      status: 'Closed',
      priority: 'Medium',
      budget: 90000,
      startDate: '2024-02-15',
      endDate: '2024-11-30',
      techStack: ['Apache Spark', 'Kafka', 'Python', 'Docker'],
      experience: 3,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-25'
    },
    {
      id: '3',
      jobId: 'DZ-DO-0001',
      title: 'DevOps Engineer',
      client: 'TechFlow',
      description: 'DevOps engineer needed for cloud infrastructure management and CI/CD pipeline setup.',
      status: 'Active',
      priority: 'High',
      budget: 110000,
      startDate: '2024-03-15',
      endDate: '2024-12-15',
      techStack: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins'],
      experience: 4,
      createdAt: '2024-01-20',
      updatedAt: '2024-02-01'
    },
    {
      id: '4',
      jobId: 'DZ-AI-0001',
      title: 'AI/ML Engineer',
      client: 'InnovateTech',
      description: 'AI/ML Engineer for developing and deploying machine learning models.',
      status: 'Active',
      priority: 'High',
      budget: 130000,
      startDate: '2024-04-01',
      endDate: '2025-03-31',
      techStack: ['Python', 'PyTorch', 'MLOps', 'Azure'],
      experience: 6,
      createdAt: '2024-02-05',
      updatedAt: '2024-02-10'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingJobRequirement, setEditingJobRequirement] = useState<JobRequirement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobRequirements = jobRequirements.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddJobRequirement = () => {
    setEditingJobRequirement(null);
    setIsDialogOpen(true);
  };

  const handleEditJobRequirement = (jobRequirement: JobRequirement) => {
    setEditingJobRequirement(jobRequirement);
    setIsDialogOpen(true);
  };

  const handleDeleteJobRequirement = (jobId: string) => {
    setJobRequirements(jobRequirements.filter(j => j.id !== jobId));
    toast({
      title: "Job requirement deleted",
      description: "The job requirement has been successfully removed.",
    });
  };

  const generateJobId = (title: string): string => {
    const prefix = 'DZ';
    const titleMap: { [key: string]: string } = {
      'data scientist': 'DS',
      'data engineer': 'DE', 
      'devops': 'DO',
      'ai': 'AI',
      'ml': 'AI',
      'machine learning': 'AI'
    };
    
    const titleLower = title.toLowerCase();
    let category = 'GEN';
    
    for (const [key, value] of Object.entries(titleMap)) {
      if (titleLower.includes(key)) {
        category = value;
        break;
      }
    }
    
    const existingJobs = jobRequirements.filter(job => 
      job.jobId.startsWith(`${prefix}-${category}`)
    );
    const nextNumber = existingJobs.length + 1;
    
    return `${prefix}-${category}-${nextNumber.toString().padStart(4, '0')}`;
  };

  const handleSaveJobRequirement = (jobData: JobRequirementFormData) => {
    if (editingJobRequirement) {
      setJobRequirements(jobRequirements.map(j => 
        j.id === editingJobRequirement.id 
          ? { ...j, ...jobData, updatedAt: new Date().toISOString().split('T')[0] }
          : j
      ));
      toast({
        title: "Job requirement updated",
        description: "The job requirement has been successfully updated.",
      });
    } else {
      const newJobRequirement: JobRequirement = {
        id: Date.now().toString(),
        jobId: generateJobId(jobData.title),
        ...jobData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setJobRequirements([...jobRequirements, newJobRequirement]);
      toast({
        title: "Job requirement added",
        description: "The new job requirement has been successfully added.",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        title="Job Requirements" 
        subtitle="Manage job openings and requirements"
      />
      
      <main className="flex-1 px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">Track and manage job requirements and openings</p>
          <Button onClick={handleAddJobRequirement} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Job Requirement
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by title, client, job ID, or tech stack..."
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
            jobRequirements={filteredJobRequirements}
            onEdit={handleEditJobRequirement}
            onDelete={handleDeleteJobRequirement}
          />
        </div>

        <JobRequirementDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveJobRequirement}
          jobRequirement={editingJobRequirement}
        />
      </main>
    </div>
  );
};

export default JobRequirementsPage;
