
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ContactFormData, Contact } from '@/types/vendor';

interface ContactFormProps {
  onSave: (contact: ContactFormData) => void;
  onCancel: () => void;
  existingContacts: Contact[];
}

const ContactForm: React.FC<ContactFormProps> = ({ onSave, onCancel, existingContacts }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    position: '',
    isPrimary: existingContacts.length === 0 // First contact is primary by default
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // If this contact is set as primary, ensure no other contact is primary
    if (formData.isPrimary) {
      // This will be handled in the parent component
    }
    
    onSave(formData);
  };

  const handlePrimaryChange = (checked: boolean) => {
    setFormData({ ...formData, isPrimary: checked });
  };

  return (
    <div className="border rounded-lg p-4 bg-muted/30">
      <h4 className="font-medium mb-4">Add New Contact</h4>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name *</Label>
            <Input
              id="contact-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-position">Position</Label>
            <Input
              id="contact-position"
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email *</Label>
            <Input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-phone">Phone *</Label>
            <Input
              id="contact-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="primary-contact"
            checked={formData.isPrimary}
            onCheckedChange={handlePrimaryChange}
          />
          <Label htmlFor="primary-contact">Primary Contact</Label>
        </div>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Add Contact</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
