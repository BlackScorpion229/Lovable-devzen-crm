
export interface Resource {
  id: string;
  name: string;
  techStack: string[];
  type: 'In-house' | 'In-house-Friends' | 'External-LinkedIn' | 'External-Email' | 'External-Referral';
  contact: string;
  phone?: string;
  experience?: number;
  availability: 'Available' | 'Busy' | 'On Project';
  hourlyRate?: number;
  createdAt: string;
  notes?: string;
  resumeFile?: string;
}

export interface ResourceFormData {
  name: string;
  techStack: string[];
  type: 'In-house' | 'In-house-Friends' | 'External-LinkedIn' | 'External-Email' | 'External-Referral';
  contact: string;
  phone?: string;
  experience?: number;
  availability: 'Available' | 'Busy' | 'On Project';
  hourlyRate?: number;
  notes?: string;
  resumeFile?: File;
}
