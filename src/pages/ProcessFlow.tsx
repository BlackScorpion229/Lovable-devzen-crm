import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProcessFlowTable from '@/components/processFlow/ProcessFlowTable';
import ProcessFlowDialog from '@/components/processFlow/ProcessFlowDialog';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProcessFlow, ProcessFlowFormData } from '@/types/processFlow';
import { useToast } from '@/hooks/use-toast';

const ProcessFlowPage = () => {
  const { toast } = useToast();
  
  // Sample data with job IDs
  const [processFlows, setProcessFlows] = useState<ProcessFlow[]>([
    {
      id: '1',
      jobId: 'DZ-DS-0001',
      jobTitle: 'Senior Data Scientist',
      client: 'ABC Corp',
      status: 'In Progress',
      currentStage: 'Interview',
      assignedTo: 'Alice Johnson',
      priority: 'High',
      createdAt: '2024-01-15',
      updatedAt: '2024-02-01',
      notes: 'Initial screening completed, technical interview scheduled'
    },
    {
      id: '2',
      jobId: 'DZ-DE-0001',
      jobTitle: 'Data Engineer',
      client: 'XYZ Ltd',
      status: 'Completed',
      currentStage: 'Hired',
      assignedTo: 'Bob Martin',
      priority: 'Medium',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-30',
      notes: 'Successfully placed candidate, contract signed'
    },
    {
      id: '3',
      jobId: 'DZ-DO-0001',
      jobTitle: 'DevOps Engineer',
      client: 'TechFlow',
      status: 'In Progress',
      currentStage: 'Sourcing',
      assignedTo: 'Charlie Davis',
      priority: 'High',
      createdAt: '2024-01-20',
      updatedAt: '2024-02-05',
      notes: 'Actively sourcing candidates, several prospects identified'
    },
    {
      id: '4',
      jobId: 'DZ-AI-0001',
      jobTitle: 'AI/ML Engineer',
      client: 'InnovateTech',
      status: 'On Hold',
      currentStage: 'Client Review',
      assignedTo: 'Diana Evans',
      priority: 'Medium',
      createdAt: '2024-02-05',
      updatedAt: '2024-02-10',
      notes: 'Waiting for client feedback on job requirements'
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProcessFlow, setEditingProcessFlow] = useState<ProcessFlow | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProcessFlows = processFlows.filter(flow =>
    flow.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.jobId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    flow.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProcessFlow = () => {
    setEditingProcessFlow(null);
    setIsDialogOpen(true);
  };

  const handleEditProcessFlow = (processFlow: ProcessFlow) => {
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

  const handleSaveProcessFlow = (flowData: ProcessFlowFormData) => {
    if (editingProcessFlow) {
      setProcessFlows(processFlows.map(f => 
        f.id === editingProcessFlow.id 
          ? { ...f, ...flowData, updatedAt: new Date().toISOString().split('T')[0] }
          : f
      ));
      toast({
        title: "Process flow updated",
        description: "The process flow has been successfully updated.",
      });
    } else {
      const newProcessFlow: ProcessFlow = {
        id: Date.now().toString(),
        ...flowData,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
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
                placeholder="Search by job title, client, or assignee..."
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
