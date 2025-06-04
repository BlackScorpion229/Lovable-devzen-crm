
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit2, Eye, Clock, Calendar } from 'lucide-react';
import { ProcessFlowItem } from '@/types/processFlow';

interface ProcessFlowTableProps {
  processFlows: ProcessFlowItem[];
  onEdit: (processFlow: ProcessFlowItem) => void;
  onView: (processFlow: ProcessFlowItem) => void;
}

const ProcessFlowTable: React.FC<ProcessFlowTableProps> = ({ 
  processFlows, 
  onEdit, 
  onView 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      case 'OnHold':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Medium':
        return 'bg-blue-100 text-blue-800';
      case 'Low':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Job ID</TableHead>
          <TableHead>Job Title</TableHead>
          <TableHead>Candidate</TableHead>
          <TableHead>Current Stage</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Expected Completion</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {processFlows.map((flow) => (
          <TableRow key={flow.id}>
            <TableCell>
              <div className="font-mono text-sm font-medium text-primary">{flow.jobRequirementId}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{flow.jobTitle}</div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{flow.candidateName}</div>
            </TableCell>
            <TableCell>
              <Badge variant="outline">{flow.currentStage}</Badge>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(flow.status)}>
                {flow.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getPriorityColor(flow.priority)}>
                {flow.priority}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm">{new Date(flow.startDate).toLocaleDateString()}</span>
              </div>
            </TableCell>
            <TableCell>
              {flow.expectedCompletionDate ? (
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{new Date(flow.expectedCompletionDate).toLocaleDateString()}</span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Not set</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onView(flow)}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(flow)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProcessFlowTable;
