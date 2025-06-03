
export interface Resource {
  id: string;
  name: string;
  techStack: string[];
  type: 'In-house' | 'External';
  source: 'Internal' | 'LinkedIn' | 'Email' | 'Friend' | 'Referral';
  contact: string;
  phone?: string;
  experience?: number;
  availability: 'Available' | 'Busy' | 'On Project';
  hourlyRate?: number;
  createdAt: string;
  notes?: string;
}

export interface ResourceFormData {
  name: string;
  techStack: string[];
  type: 'In-house' | 'External';
  source: 'Internal' | 'LinkedIn' | 'Email' | 'Friend' | 'Referral';
  contact: string;
  phone?: string;
  experience?: number;
  availability: 'Available' | 'Busy' | 'On Project';
  hourlyRate?: number;
  notes?: string;
}
