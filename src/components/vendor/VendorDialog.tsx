
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
import { Vendor, VendorFormData, Contact, ContactFormData } from '@/types/vendor';
import ContactForm from './ContactForm';
import { Plus, Trash2 } from 'lucide-react';

interface VendorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendor: Vendor | null;
  onSave: (vendor: Vendor) => void;
}

const VendorDialog: React.FC<VendorDialogProps> = ({ open, onOpenChange, vendor, onSave }) => {
  const [formData, setFormData] = useState<VendorFormData>({
    name: '',
    company: '',
    industry: '',
    status: 'active',
    notes: ''
  });
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    if (vendor) {
      setFormData({
        name: vendor.name,
        company: vendor.company,
        industry: vendor.industry || '',
        status: vendor.status,
        notes: vendor.notes || ''
      });
      setContacts(vendor.contacts);
    } else {
      setFormData({
        name: '',
        company: '',
        industry: '',
        status: 'active',
        notes: ''
      });
      setContacts([]);
    }
  }, [vendor]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (contacts.length === 0) {
      alert('Please add at least one contact');
      return;
    }

    const vendorData: Vendor = {
      id: vendor?.id || '',
      ...formData,
      contacts,
      createdAt: vendor?.createdAt || new Date().toISOString().split('T')[0]
    };

    onSave(vendorData);
  };

  const handleAddContact = (contactData: ContactFormData) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      ...contactData
    };
    setContacts([...contacts, newContact]);
    setShowContactForm(false);
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts(contacts.filter(c => c.id !== contactId));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{vendor ? 'Edit Vendor' : 'Add New Vendor'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vendor Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={formData.industry}
                onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Contacts</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowContactForm(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Contact
              </Button>
            </div>

            {contacts.length > 0 && (
              <div className="space-y-2 border rounded-lg p-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <div className="font-medium">{contact.name} {contact.isPrimary && '(Primary)'}</div>
                      <div className="text-sm text-muted-foreground">{contact.email} • {contact.phone}</div>
                      {contact.position && <div className="text-sm text-muted-foreground">{contact.position}</div>}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {showContactForm && (
              <ContactForm
                onSave={handleAddContact}
                onCancel={() => setShowContactForm(false)}
                existingContacts={contacts}
              />
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {vendor ? 'Update Vendor' : 'Add Vendor'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VendorDialog;
