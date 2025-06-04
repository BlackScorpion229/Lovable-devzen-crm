
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
import { Edit2, Trash2, Mail, Phone, FileText } from 'lucide-react';
import { Resource } from '@/types/resource';

interface ResourceTableProps {
  resources: Resource[];
  onEdit: (resource: Resource) => void;
  onDelete: (resourceId: string) => void;
}

const ResourceTable: React.FC<ResourceTableProps> = ({ resources, onEdit, onDelete }) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'In-house':
        return 'bg-blue-100 text-blue-800';
      case 'In-house-Friends':
        return 'bg-green-100 text-green-800';
      case 'External-LinkedIn':
        return 'bg-blue-100 text-blue-800';
      case 'External-Email':
        return 'bg-orange-100 text-orange-800';
      case 'External-Referral':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Busy':
        return 'bg-yellow-100 text-yellow-800';
      case 'On Project':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Tech Stack</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Experience</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead>Rate</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {resources.map((resource) => (
          <TableRow key={resource.id}>
            <TableCell>
              <div className="font-medium">{resource.name}</div>
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                {resource.techStack.map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getTypeColor(resource.type)}>
                {resource.type}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-3 h-3 text-muted-foreground" />
                  <a href={`mailto:${resource.contact}`} className="text-sm text-blue-600 hover:underline">
                    {resource.contact}
                  </a>
                </div>
                {resource.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm">{resource.phone}</span>
                  </div>
                )}
              </div>
            </TableCell>
            <TableCell>
              {resource.experience ? `${resource.experience} years` : 'N/A'}
            </TableCell>
            <TableCell>
              <Badge className={getAvailabilityColor(resource.availability)}>
                {resource.availability}
              </Badge>
            </TableCell>
            <TableCell>
              {resource.hourlyRate ? `$${resource.hourlyRate}/hr` : 'N/A'}
            </TableCell>
            <TableCell>
              {resource.resumeFile ? (
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <FileText className="h-4 w-4 text-blue-600" />
                </Button>
              ) : (
                <span className="text-sm text-muted-foreground">No file</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(resource)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(resource.id)}
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

export default ResourceTable;
