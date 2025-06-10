
export interface ProcessFlowStage {
  id: string;
  name: string;
  description: string;
  order: number;
  color: string;
}

export interface ProcessFlowItem {
  id: string;
  jobRequirementId: string;
  jobTitle: string;
  candidateName: string;
  currentStage: string;
  startDate: string;
  expectedCompletionDate?: string;
  status: 'Active' | 'Completed' | 'OnHold' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  notes?: string;
  history: ProcessFlowHistory[];
}

export interface ProcessFlowHistory {
  id: string;
  stageId: string;
  stageName: string;
  enteredDate: string;
  completedDate?: string;
  duration?: number;
  notes?: string;
  updatedBy: string;
}

export interface ProcessFlowFormData {
  jobRequirementId: string;
  candidateName: string;
  currentStage: string;
  startDate: string;
  expectedCompletionDate?: string;
  status: 'Active' | 'Completed' | 'OnHold' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  notes?: string;
}

// Legacy types for backward compatibility
export interface ProcessFlow {
  id: string;
  jobId: string;
  jobTitle: string;
  client: string;
  status: string;
  currentStage: string;
  assignedTo: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
}
