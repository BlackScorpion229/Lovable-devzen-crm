
export interface JobRequirement {
  id: string;
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
  deadline?: string;
  assignedResources?: string[];
  notes?: string;
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
