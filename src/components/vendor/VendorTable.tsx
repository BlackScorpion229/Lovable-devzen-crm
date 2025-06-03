
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
import { Edit2, Trash2, Mail, Phone } from 'lucide-react';
import { Vendor } from '@/types/vendor';

interface VendorTableProps {
  vendors: Vendor[];
  onEdit: (vendor: Vendor) => void;
  onDelete: (vendorId: string) => void;
}

const VendorTable: React.FC<VendorTableProps> = ({ vendors, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Vendor Name</TableHead>
          <TableHead>Point of Contacts</TableHead>
          <TableHead>Email(s)</TableHead>
          <TableHead>Phone(s)</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors.map((vendor) => (
          <TableRow key={vendor.id}>
            <TableCell>
              <div>
                <div className="font-medium">{vendor.name}</div>
                <div className="text-sm text-muted-foreground">{vendor.company}</div>
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                {vendor.contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-2">
                    <span className="text-sm">{contact.name}</span>
                    {contact.isPrimary && (
                      <Badge variant="secondary" className="text-xs">Primary</Badge>
                    )}
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                {vendor.contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-2">
                    <Mail className="w-3 h-3 text-muted-foreground" />
                    <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:underline">
                      {contact.email}
                    </a>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <div className="space-y-1">
                {vendor.contacts.map((contact) => (
                  <div key={contact.id} className="flex items-center gap-2">
                    <Phone className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm">{contact.phone}</span>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell>
              <Badge className={getStatusColor(vendor.status)}>
                {vendor.status}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(vendor)}
                  className="h-8 w-8 p-0"
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(vendor.id)}
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

export default VendorTable;
