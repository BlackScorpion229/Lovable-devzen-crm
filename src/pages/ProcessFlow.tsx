
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProcessFlowTable from '@/components/processFlow/ProcessFlowTable';
import ProcessFlowDialog from '@/components/processFlow/ProcessFlowDialog';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProcessFlowItem } from '@/types/processFlow';
import { useToast } from '@/hooks/use-toast';

const ProcessFlowPage = () => {
  const { toast } = useToast();
  
  // Sample data using ProcessFlowItem type
  const [processFlows, setProcessFlows] = useState<ProcessFlowItem[]>([
    {
      id: '1',
      jobRequirementId: 'DZ-DS-0001',
      jobTitle: 'Senior Data Scientist',
      candidateName: 'John Smith',
      currentStage: 'Interview',
      startDate: '2024-01-15',
      expectedCompletionDate: '2024-03-15',
      status: 'Active',
      priority: 'High',
      notes: 'Initial screening completed, technical interview scheduled',
      history: [
        {
          id: '1',
          stageId: 'sourcing',
          stageName: 'Sourcing',
          enteredDate: '2024-01-15',
          completedDate: '2024-01-20',
          duration: 5,
          notes: 'Candidate sourced from LinkedIn',
          updatedBy: 'Alice Johnson'
        },
        {
          id: '2',
          stageId: 'screening',
          stageName: 'Screening',
          enteredDate: '2024-01-20',
          completedDate: '2024-01-25',
          duration: 5,
          notes: 'Phone screening completed successfully',
          updatedBy: 'Alice Johnson'
        }
      ]
    },
    {
      id: '2',
      jobRequirementId: 'DZ-DE-0001',
      jobTitle: 'Data Engineer',
      candidateName: 'Sarah Wilson',
      currentStage: 'Hired',
      startDate: '2024-01-10',
      expectedCompletionDate: '2024-02-10',
      status: 'Completed',
      priority: 'Medium',
      notes: 'Successfully placed candidate, contract signed',
      history: [
        {
          id: '3',
          stageId: 'sourcing',
          stageName: 'Sourcing',
          enteredDate: '2024-01-10',
          completedDate: '2024-01-12',
          duration: 2,
          notes: 'Candidate referred by existing employee',
          updatedBy: 'Bob Martin'
        }
      ]
    },
    {
      id: '3',
      jobRequirementId: 'DZ-DO-0001',
      jobTitle: 'DevOps Engineer',
      candidateName: 'Mike Davis',
      currentStage: 'Sourcing',
      startDate: '2024-01-20',
      status: 'Active',
      priority: 'High',
      notes: 'Actively sourcing candidates, several prospects identified',
      history: [
        {
          id: '4',
          stageId: 'sourcing',
          stageName: 'Sourcing',
          enteredDate: '2024-01-20',
          notes: 'Started candidate search',
          updatedBy: 'Charlie Davis'
        }
      ]
    },
    {
      id: '4',
      jobRequirementId: 'DZ-AI-0001',
      jobTitle: 'AI/ML Engineer',
      candidateName: 'Lisa Chen',
      currentStage: 'Client Review',
      startDate: '2024-02-05',
      expectedCompletionDate: '2024-04-05',
      status: 'OnHold',
      priority: 'Medium',
      notes: 'Waiting for client feedback on job requirements',
      history: [
        {
          id: '5',
          stageId: 'sourcing',
          stageName: 'Sourcing',
          enteredDate: '2024-02-05',
          completedDate: '2024-02-10',
          duration: 5,
          notes: 'Candidate sourced and initial contact made',
          updatedBy: 'Diana Evans'
        }
      ]
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProcessFlow, setEditingProcessFlow] = useState<ProcessFlowItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProcessFlows = processFlows.filter(flow =>
    flow.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.jobRequirementId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.currentStage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProcessFlow = () => {
    setEditingProcessFlow(null);
    setIsDialogOpen(true);
  };

  const handleEditProcessFlow = (processFlow: ProcessFlowItem) => {
    setEditingProcessFlow(processFlow);
    setIsDialogOpen(true);
  };

  const handleDeleteProcessFlow = (flowId: string) => {
    setProcessFlows(processFlows.filter(f => f.id !== flowId));
    toast({
      title: "Process flow deleted",
      description: "The process flow has been successfully removed.",
    });
  };

  const handleSaveProcessFlow = (flowData: Omit<ProcessFlowItem, 'id' | 'history'>) => {
    if (editingProcessFlow) {
      setProcessFlows(processFlows.map(f => 
        f.id === editingProcessFlow.id 
          ? { ...f, ...flowData }
          : f
      ));
      toast({
        title: "Process flow updated",
        description: "The process flow has been successfully updated.",
      });
    } else {
      const newProcessFlow: ProcessFlowItem = {
        id: Date.now().toString(),
        ...flowData,
        history: []
      };
      setProcessFlows([...processFlows, newProcessFlow]);
      toast({
        title: "Process flow added",
        description: "The new process flow has been successfully added.",
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col">
      <Navbar 
        title="Process Flow" 
        subtitle="Track and manage recruitment processes"
      />
      
      <main className="flex-1 px-6 py-6">
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">Monitor recruitment stages and progress</p>
          <Button onClick={handleAddProcessFlow} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Process Flow
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by job title, candidate, or job ID..."
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
          <ProcessFlowTable
            processFlows={filteredProcessFlows}
            onEdit={handleEditProcessFlow}
            onView={handleEditProcessFlow}
            onDelete={handleDeleteProcessFlow}
          />
        </div>

        <ProcessFlowDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveProcessFlow}
          processFlow={editingProcessFlow}
        />
      </main>
    </div>
  );
};

export default ProcessFlowPage;
