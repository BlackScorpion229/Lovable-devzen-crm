
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Resource, ResourceFormData } from '@/types/resource';
import { useToast } from '@/hooks/use-toast';

export const useResources = () => {
  return useQuery({
    queryKey: ['resources'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(resource => ({
        ...resource,
        createdAt: resource.created_at,
        resumeFile: resource.resume_url,
        techStack: Array.isArray(resource.tech_stack) ? resource.tech_stack as string[] : [],
        hourlyRate: resource.hourly_rate,
      } as Resource));
    },
  });
};

export const useCreateResource = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (resourceData: ResourceFormData) => {
      // Fix: Extract resumeFile separately since it doesn't exist on the interface
      const { resumeFile, ...data } = resourceData as ResourceFormData & { resumeFile?: File };
      
      let resumeUrl = null;
      
      // Upload resume file if provided
      if (resumeFile) {
        const fileName = `${Date.now()}-${resumeFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resumeFile);

        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);
        
        resumeUrl = urlData.publicUrl;
      }

      const { data: resource, error } = await supabase
        .from('resources')
        .insert([{
          name: data.name,
          contact: data.contact,
          phone: data.phone,
          experience: data.experience,
          availability: data.availability,
          notes: data.notes,
          type: data.type,
          tech_stack: data.techStack,
          hourly_rate: data.hourlyRate,
          resume_url: resumeUrl,
        }])
        .select()
        .single();

      if (error) throw error;
      return resource;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({
        title: "Resource created",
        description: "The resource has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating resource",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateResource = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ resourceId, resourceData }: { resourceId: string; resourceData: ResourceFormData }) => {
      // Fix: Extract resumeFile separately since it doesn't exist on the interface
      const { resumeFile, ...data } = resourceData as ResourceFormData & { resumeFile?: File };
      
      let resumeUrl = (data as any).resumeFile || null;
      
      // Upload new resume file if provided
      if (resumeFile) {
        const fileName = `${Date.now()}-${resumeFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, resumeFile);

        if (uploadError) throw uploadError;
        
        const { data: urlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(fileName);
        
        resumeUrl = urlData.publicUrl;
      }

      const { error } = await supabase
        .from('resources')
        .update({
          name: data.name,
          contact: data.contact,
          phone: data.phone,
          experience: data.experience,
          availability: data.availability,
          notes: data.notes,
          type: data.type,
          tech_stack: data.techStack,
          hourly_rate: data.hourlyRate,
          resume_url: resumeUrl,
        })
        .eq('id', resourceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({
        title: "Resource updated",
        description: "The resource has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating resource",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteResource = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (resourceId: string) => {
      const { error } = await supabase
        .from('resources')
        .delete()
        .eq('id', resourceId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      toast({
        title: "Resource deleted",
        description: "The resource has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting resource",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
