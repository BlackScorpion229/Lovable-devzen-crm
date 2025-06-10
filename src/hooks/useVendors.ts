
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Vendor, Contact, VendorFormData, ContactFormData } from '@/types/vendor';
import { useToast } from '@/hooks/use-toast';

export const useVendors = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data: vendors, error } = await supabase
        .from('vendors')
        .select(`
          *,
          contacts (*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return vendors.map(vendor => ({
        ...vendor,
        createdAt: vendor.created_at,
        contacts: vendor.contacts?.map(contact => ({
          ...contact,
          isPrimary: contact.is_primary
        })) || []
      } as Vendor));
    },
  });
};

export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ vendorData, contacts }: { vendorData: VendorFormData; contacts: ContactFormData[] }) => {
      // Create vendor first
      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .insert([vendorData])
        .select()
        .single();

      if (vendorError) throw vendorError;

      // Create contacts if any
      if (contacts.length > 0) {
        const contactsToInsert = contacts.map(contact => ({
          ...contact,
          vendor_id: vendor.id,
          is_primary: contact.isPrimary,
        }));

        const { error: contactsError } = await supabase
          .from('contacts')
          .insert(contactsToInsert);

        if (contactsError) throw contactsError;
      }

      return vendor;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({
        title: "Vendor created",
        description: "The vendor has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating vendor",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateVendor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ vendorId, vendorData, contacts }: { vendorId: string; vendorData: VendorFormData; contacts: ContactFormData[] }) => {
      // Update vendor
      const { error: vendorError } = await supabase
        .from('vendors')
        .update(vendorData)
        .eq('id', vendorId);

      if (vendorError) throw vendorError;

      // Delete existing contacts and recreate them
      await supabase
        .from('contacts')
        .delete()
        .eq('vendor_id', vendorId);

      if (contacts.length > 0) {
        const contactsToInsert = contacts.map(contact => ({
          ...contact,
          vendor_id: vendorId,
          is_primary: contact.isPrimary,
        }));

        const { error: contactsError } = await supabase
          .from('contacts')
          .insert(contactsToInsert);

        if (contactsError) throw contactsError;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({
        title: "Vendor updated",
        description: "The vendor has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating vendor",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (vendorId: string) => {
      const { error } = await supabase
        .from('vendors')
        .delete()
        .eq('id', vendorId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vendors'] });
      toast({
        title: "Vendor deleted",
        description: "The vendor has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting vendor",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
