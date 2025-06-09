import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { JobRequirement, JobRequirementFormData } from '@/types/jobRequirement';

interface JobRequirementDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: JobRequirementFormData) => void;
  jobRequirement?: JobRequirement | null;
}

const JobRequirementDialog: React.FC<JobRequirementDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  jobRequirement
}) => {
  const [formData, setFormData] = useState<JobRequirementFormData>({
    title: '',
    client: '',
    vendor: '',
    description: '',
    techStack: [],
    experience: 0,
    location: '',
    salary: {
      min: 0,
      max: 0,
      currency: 'USD'
    },
    status: 'Active',
    priority: 'Medium',
    deadline: '',
    assignedResources: [],
    notes: ''
  });

  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    if (jobRequirement) {
      setFormData({
        title: jobRequirement.title,
        client: jobRequirement.client,
        vendor: jobRequirement.vendor || '',
        description: jobRequirement.description,
        techStack: jobRequirement.techStack,
        experience: jobRequirement.experience,
        location: jobRequirement.location,
        salary: jobRequirement.salary || { min: 0, max: 0, currency: 'USD' },
        status: jobRequirement.status,
        priority: jobRequirement.priority,
        deadline: jobRequirement.deadline || '',
        assignedResources: jobRequirement.assignedResources || [],
        notes: jobRequirement.notes || ''
      });
    } else {
      setFormData({
        title: '',
        client: '',
        vendor: '',
        description: '',
        techStack: [],
        experience: 0,
        location: '',
        salary: {
          min: 0,
          max: 0,
          currency: 'USD'
        },
        status: 'Active',
        priority: 'Medium',
        deadline: '',
        assignedResources: [],
        notes: ''
      });
    }
  }, [jobRequirement, isOpen]);

  const handleInputChange = (field: keyof JobRequirementFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSalaryChange = (field: 'min' | 'max' | 'currency', value: any) => {
    setFormData(prev => ({
      ...prev,
      salary: {
        ...prev.salary!,
        [field]: field === 'currency' ? value : parseInt(value) || 0
      }
    }));
  };

  const addTechStack = () => {
    if (newTech.trim() && !formData.techStack.includes(newTech.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, newTech.trim()]
      }));
      setNewTech('');
    }
  };

  const removeTechStack = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {jobRequirement ? 'Edit Job Requirement' : 'Add New Job Requirement'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">Client *</Label>
              <Input
                id="client"
                value={formData.client}
                onChange={(e) => handleInputChange('client', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="vendor">Vendor</Label>
              <Input
                id="vendor"
                value={formData.vendor}
                onChange={(e) => handleInputChange('vendor', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience (Years) *</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', parseInt(e.target.value) || 0)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Closed">Closed</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="OnHold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
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

            <div className="space-y-2">
              <Label htmlFor="deadline">Deadline</Label>
              <Input
                id="deadline"
                type="date"
                value={formData.deadline}
                onChange={(e) => handleInputChange('deadline', e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Job Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label>Tech Stack</Label>
            <div className="flex gap-2">
              <Input
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                placeholder="Add technology..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
              />
              <Button type="button" onClick={addTechStack} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechStack(tech)}
                    className="ml-1 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Salary Range</Label>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="salaryMin">Minimum (K)</Label>
                <Input
                  id="salaryMin"
                  type="number"
                  min="0"
                  value={formData.salary?.min || ''}
                  onChange={(e) => handleSalaryChange('min', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salaryMax">Maximum (K)</Label>
                <Input
                  id="salaryMax"
                  type="number"
                  min="0"
                  value={formData.salary?.max || ''}
                  onChange={(e) => handleSalaryChange('max', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={formData.salary?.currency} onValueChange={(value) => handleSalaryChange('currency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                    <SelectItem value="INR">INR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {jobRequirement ? 'Update' : 'Create'} Job Requirement
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JobRequirementDialog;
