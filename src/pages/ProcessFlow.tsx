
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { GitBranch, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ProcessFlowTable from '@/components/processFlow/ProcessFlowTable';
import ProcessFlowDialog from '@/components/processFlow/ProcessFlowDialog';
import { ProcessFlowItem } from '@/types/processFlow';

const ProcessFlowPage = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlow, setEditingFlow] = useState<ProcessFlowItem | undefined>();
  
  // Sample data
  const [processFlows, setProcessFlows] = useState<ProcessFlowItem[]>([
    {
      id: '1',
      jobRequirementId: 'JR001',
      jobTitle: 'Senior React Developer',
      candidateName: 'John Smith',
      currentStage: 'Client Interview',
      startDate: '2024-01-15',
      expectedCompletionDate: '2024-02-15',
      status: 'Active',
      priority: 'High',
      notes: 'Strong technical skills, good cultural fit',
      history: []
    },
    {
      id: '2',
      jobRequirementId: 'JR002',
      jobTitle: 'DevOps Engineer',
      candidateName: 'Sarah Johnson',
      currentStage: 'Technical Assessment',
      startDate: '2024-01-20',
      expectedCompletionDate: '2024-02-20',
      status: 'Active',
      priority: 'Medium',
      notes: 'AWS certification, 5 years experience',
      history: []
    },
    {
      id: '3',
      jobRequirementId: 'JR003',
      jobTitle: 'Full Stack Developer',
      candidateName: 'Mike Wilson',
      currentStage: 'Offer Discussion',
      startDate: '2024-01-10',
      expectedCompletionDate: '2024-02-10',
      status: 'Active',
      priority: 'Urgent',
      notes: 'Excellent performance in all rounds',
      history: []
    }
  ]);

  const handleAdd = () => {
    setEditingFlow(undefined);
    setIsDialogOpen(true);
  };

  const handleEdit = (flow: ProcessFlowItem) => {
    setEditingFlow(flow);
    setIsDialogOpen(true);
  };

  const handleView = (flow: ProcessFlowItem) => {
    console.log('Viewing flow:', flow);
    // Implement view functionality
  };

  const handleSave = (flowData: Omit<ProcessFlowItem, 'id' | 'history'>) => {
    if (editingFlow) {
      setProcessFlows(flows => flows.map(flow => 
        flow.id === editingFlow.id 
          ? { ...flow, ...flowData }
          : flow
      ));
    } else {
      const newFlow: ProcessFlowItem = {
        id: Date.now().toString(),
        ...flowData,
        history: []
      };
      setProcessFlows(flows => [...flows, newFlow]);
    }
  };

  const filteredFlows = processFlows.filter(flow => {
    const matchesSearch = flow.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flow.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         flow.currentStage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || flow.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusCounts = () => {
    return {
      total: processFlows.length,
      active: processFlows.filter(f => f.status === 'Active').length,
      completed: processFlows.filter(f => f.status === 'Completed').length,
      onHold: processFlows.filter(f => f.status === 'OnHold').length,
      cancelled: processFlows.filter(f => f.status === 'Cancelled').length
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className={cn(
        "flex-1 flex flex-col",
        !isMobile && "ml-64"
      )}>
        <Navbar 
          title="Process Flow" 
          subtitle="Track requirement fulfillment workflow"
        />
        
        <main className="flex-1 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold">Process Flow</h1>
                <p className="text-muted-foreground">Monitor requirement workflow stages</p>
              </div>
            </div>
            <Button onClick={handleAdd} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Start New Process
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="bg-card rounded-lg border p-4">
              <div className="text-2xl font-bold text-primary">{statusCounts.total}</div>
              <div className="text-sm text-muted-foreground">Total Processes</div>
            </div>
            <div className="bg-card rounded-lg border p-4">
              <div className="text-2xl font-bold text-green-600">{statusCounts.active}</div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="bg-card rounded-lg border p-4">
              <div className="text-2xl font-bold text-blue-600">{statusCounts.completed}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="bg-card rounded-lg border p-4">
              <div className="text-2xl font-bold text-yellow-600">{statusCounts.onHold}</div>
              <div className="text-sm text-muted-foreground">On Hold</div>
            </div>
            <div className="bg-card rounded-lg border p-4">
              <div className="text-2xl font-bold text-red-600">{statusCounts.cancelled}</div>
              <div className="text-sm text-muted-foreground">Cancelled</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by job title, candidate, or stage..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="OnHold">On Hold</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Process Flow Table */}
          <div className="bg-card rounded-lg border">
            <ProcessFlowTable
              processFlows={filteredFlows}
              onEdit={handleEdit}
              onView={handleView}
            />
          </div>

          {/* Dialog */}
          <ProcessFlowDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onSave={handleSave}
            processFlow={editingFlow}
          />
        </main>
      </div>
    </div>
  );
};

export default ProcessFlowPage;
