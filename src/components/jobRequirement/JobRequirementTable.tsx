
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
import { Edit2, Trash2, MapPin, DollarSign, Calendar, Users } from 'lucide-react';
import { JobRequirement } from '@/types/jobRequirement';

interface JobRequirementTableProps {
  jobRequirements: JobRequirement[];
  onEdit: (jobRequirement: JobRequirement) => void;
  onDelete: (jobRequirementId: string) => void;
}

const JobRequirementTable: React.FC<JobRequirementTableProps> = ({ 
  jobRequirements, 
  onEdit, 
  onDelete 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      case 'Inactive':
        return 'bg-red-100 text-red-800';
      case 'OnHold':
        return 'bg-yellow-100 text-yellow-800';
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
          <TableHead>Client</TableHead>
          <TableHead>Tech Stack</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Salary Range</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {jobRequirements.map((job) => (
          <TableRow key={job.id}>
            <TableCell>
              <div className="font-mono text-sm font-medium text-primary">{job.jobId}</div>
            </TableCell>
            <TableCell>
              <div>
                <div className="font-medium">{job.title}</div>
                {job.vendor && (
                  <div className="text-xs text-muted-foreground">via {job.vendor}</div>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="font-medium">{job.client}</div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {job.techStack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {job.techStack.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{job.techStack.length - 3}
                  </Badge>
                )}
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm">{job.location}</span>
              </div>
            </TableCell>
            <TableCell>
              <span className="text-sm">{job.experience} years</span>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(job.status)}>
                {job.status}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={getPriorityColor(job.priority)}>
                {job.priority}
              </Badge>
            </TableCell>
            <TableCell>
              {job.salary ? (
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">
                    {job.salary.min}k-{job.salary.max}k {job.salary.currency}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">Not specified</span>
              )}
            </TableCell>
            <TableCell>
              {job.deadline ? (
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm">{new Date(job.deadline).toLocaleDateString()}</span>
                </div>
              ) : (
                <span className="text-sm text-muted-foreground">No deadline</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(job)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(job.id)}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default JobRequirementTable;
