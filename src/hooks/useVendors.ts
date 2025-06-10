import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Vendor, VendorFormData } from '@/types/vendor';
import { useToast } from '@/hooks/use-toast';

export const useVendors = () => {
  return useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select(`
          *,
          contacts(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(vendor => ({
        ...vendor,
        createdAt: vendor.created_at,
        contacts: vendor.contacts as any[] || []
      } as Vendor));
    },
  });
};

export const useCreateVendor = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (vendorData: VendorFormData) => {
      const { contacts, ...vendorInfo } = vendorData;

      // Create the vendor first
      const { data: vendor, error: vendorError } = await supabase
        .from('vendors')
        .insert([{
          name: vendorInfo.name,
          company: vendorInfo.company,
          industry: vendorInfo.industry,
          status: vendorInfo.status,
          notes: vendorInfo.notes,
        }])
        .select()
        .single();

      if (vendorError) throw vendorError;

      // Create contacts if any
      if (contacts && contacts.length > 0) {
        const { error: contactsError } = await supabase
          .from('contacts')
          .insert(
            contacts.map(contact => ({
              ...contact,
              vendor_id: vendor.id,
              is_primary: contact.isPrimary || false,
            }))
          );

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
    mutationFn: async ({ vendorId, vendorData }: { vendorId: string; vendorData: VendorFormData }) => {
      const { contacts, ...vendorInfo } = vendorData;

      // Update the vendor
      const { error: vendorError } = await supabase
        .from('vendors')
        .update({
          name: vendorInfo.name,
          company: vendorInfo.company,
          industry: vendorInfo.industry,
          status: vendorInfo.status,
          notes: vendorInfo.notes,
        })
        .eq('id', vendorId);

      if (vendorError) throw vendorError;

      // Delete existing contacts and recreate them
      await supabase
        .from('contacts')
        .delete()
        .eq('vendor_id', vendorId);

      if (contacts && contacts.length > 0) {
        const { error: contactsError } = await supabase
          .from('contacts')
          .insert(
            contacts.map(contact => ({
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              position: contact.position,
              vendor_id: vendorId,
              is_primary: contact.isPrimary || false,
            }))
          );

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
      // Delete contacts first due to foreign key constraint
      await supabase
        .from('contacts')
        .delete()
        .eq('vendor_id', vendorId);

      // Then delete the vendor
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
