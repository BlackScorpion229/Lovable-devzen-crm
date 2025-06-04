
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ProcessFlowItem } from '@/types/processFlow';

interface ProcessFlowDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (processFlow: Omit<ProcessFlowItem, 'id' | 'history'>) => void;
  processFlow?: ProcessFlowItem;
}

const ProcessFlowDialog: React.FC<ProcessFlowDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  processFlow
}) => {
  const [formData, setFormData] = useState({
    jobRequirementId: '',
    jobTitle: '',
    candidateName: '',
    currentStage: '',
    startDate: '',
    expectedCompletionDate: '',
    status: 'Active' as const,
    priority: 'Medium' as const,
    notes: ''
  });

  useEffect(() => {
    if (processFlow) {
      setFormData({
        jobRequirementId: processFlow.jobRequirementId,
        jobTitle: processFlow.jobTitle,
        candidateName: processFlow.candidateName,
        currentStage: processFlow.currentStage,
        startDate: processFlow.startDate,
        expectedCompletionDate: processFlow.expectedCompletionDate || '',
        status: processFlow.status,
        priority: processFlow.priority,
        notes: processFlow.notes || ''
      });
    } else {
      setFormData({
        jobRequirementId: '',
        jobTitle: '',
        candidateName: '',
        currentStage: 'Initial Screening',
        startDate: new Date().toISOString().split('T')[0],
        expectedCompletionDate: '',
        status: 'Active',
        priority: 'Medium',
        notes: ''
      });
    }
  }, [processFlow, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const stages = [
    'Initial Screening',
    'Phone Interview',
    'Technical Assessment',
    'Client Interview',
    'Reference Check',
    'Offer Discussion',
    'Background Check',
    'Onboarding'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {processFlow ? 'Edit Process Flow' : 'Add New Process Flow'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="candidateName">Candidate Name</Label>
              <Input
                id="candidateName"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="currentStage">Current Stage</Label>
              <Select
                value={formData.currentStage}
                onValueChange={(value) => setFormData({ ...formData, currentStage: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select stage" />
                </SelectTrigger>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage} value={stage}>
                      {stage}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="OnHold">On Hold</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value: any) => setFormData({ ...formData, priority: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="expectedCompletionDate">Expected Completion Date</Label>
            <Input
              id="expectedCompletionDate"
              type="date"
              value={formData.expectedCompletionDate}
              onChange={(e) => setFormData({ ...formData, expectedCompletionDate: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {processFlow ? 'Update' : 'Add'} Process Flow
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProcessFlowDialog;
