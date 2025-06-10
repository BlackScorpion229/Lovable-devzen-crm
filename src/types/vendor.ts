
export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  position?: string;
  isPrimary: boolean;
}

export interface Vendor {
  id: string;
  name: string;
  company: string;
  industry?: string;
  status: 'active' | 'inactive' | 'pending';
  contacts: Contact[];
  createdAt: string;
  notes?: string;
}

export interface VendorFormData {
  name: string;
  company: string;
  industry?: string;
  status: 'active' | 'inactive' | 'pending';
  notes?: string;
  contacts?: ContactFormData[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  position?: string;
  isPrimary: boolean;
}
