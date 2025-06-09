export interface JobRequirement {
  id: string;
  jobId: string; // New field for unique job ID like DZ-DS-0001
  title: string;
  client: string;
  vendor?: string;
  description: string;
  techStack: string[];
  experience: number;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'Active' | 'Closed' | 'Inactive' | 'OnHold';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  createdAt: string;
  updatedAt: string;
  deadline?: string;
  assignedResources?: string[];
  notes?: string;
  budget?: number;
  startDate?: string;
  endDate?: string;
}

export interface JobRequirementFormData {
  title: string;
  client: string;
  vendor?: string;
  description: string;
  techStack: string[];
  experience: number;
  location: string;
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  status: 'Active' | 'Closed' | 'Inactive' | 'OnHold';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  deadline?: string;
  assignedResources?: string[];
  notes?: string;
}

// Helper function to generate job ID based on title
export const generateJobId = (title: string, existingJobs: JobRequirement[]): string => {
  const titleLower = title.toLowerCase();
  let prefix = 'DZ-GN'; // Default prefix for General
  
  if (titleLower.includes('data scientist') || titleLower.includes('data science')) {
    prefix = 'DZ-DS';
  } else if (titleLower.includes('data engineer') || titleLower.includes('data engineering')) {
    prefix = 'DZ-DE';
  } else if (titleLower.includes('devops') || titleLower.includes('dev ops')) {
    prefix = 'DZ-DO';
  } else if (titleLower.includes('ai') || titleLower.includes('artificial intelligence') || titleLower.includes('gen ai') || titleLower.includes('machine learning')) {
    prefix = 'DZ-AI';
  }
  
  // Find the highest number for this prefix
  const existingNumbers = existingJobs
    .filter(job => job.jobId.startsWith(prefix))
    .map(job => {
      const match = job.jobId.match(/(\d+)$/);
      return match ? parseInt(match[1]) : 0;
    });
  
  const nextNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) + 1 : 1;
  return `${prefix}-${nextNumber.toString().padStart(4, '0')}`;
};
