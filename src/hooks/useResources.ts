
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
        techStack: Array.isArray(resource.tech_stack) ? resource.tech_stack : [],
        hourlyRate: resource.hourly_rate,
      }));
    },
  });
};

export const useCreateResource = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (resourceData: ResourceFormData) => {
      const { resumeFile, ...data } = resourceData;
      
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
          ...data,
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
      const { resumeFile, ...data } = resourceData;
      
      let resumeUrl = data.resumeFile || null;
      
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
          ...data,
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
