
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import ProcessFlowTable from '@/components/processFlow/ProcessFlowTable';
import ProcessFlowDialog from '@/components/processFlow/ProcessFlowDialog';
import { Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProcessFlowItem } from '@/types/processFlow';
import { useProcessFlows, useDeleteProcessFlow, useCreateProcessFlow, useUpdateProcessFlow } from '@/hooks/useProcessFlows';

const ProcessFlowPage = () => {
  const { data: processFlows = [], isLoading } = useProcessFlows();
  const deleteProcessFlowMutation = useDeleteProcessFlow();
  const createProcessFlowMutation = useCreateProcessFlow();
  const updateProcessFlowMutation = useUpdateProcessFlow();

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
    deleteProcessFlowMutation.mutate(flowId);
  };

  const handleSaveProcessFlow = (flowData: any) => {
    if (editingProcessFlow) {
      updateProcessFlowMutation.mutate({
        flowId: editingProcessFlow.id,
        flowData
      });
    } else {
      createProcessFlowMutation.mutate(flowData);
    }
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex flex-col">
        <Navbar 
          title="Process Flow" 
          subtitle="Track and manage recruitment processes"
        />
        <main className="flex-1 px-6 py-6">
          <div className="text-center">Loading process flows...</div>
        </main>
      </div>
    );
  }

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
          processFlow={editingProcessFlow}
          onSave={handleSaveProcessFlow}
        />
      </main>
    </div>
  );
};

export default ProcessFlowPage;
