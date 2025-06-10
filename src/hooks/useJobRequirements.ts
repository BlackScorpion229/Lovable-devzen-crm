
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { JobRequirement, JobRequirementFormData, generateJobId } from '@/types/jobRequirement';
import { useToast } from '@/hooks/use-toast';

export const useJobRequirements = () => {
  return useQuery({
    queryKey: ['jobRequirements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('job_requirements')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(job => ({
        ...job,
        jobId: job.job_id,
        techStack: Array.isArray(job.tech_stack) ? job.tech_stack : [],
        assignedResources: Array.isArray(job.assigned_resources) ? job.assigned_resources : [],
        createdAt: job.created_at,
        updatedAt: job.updated_at,
        salary: job.salary_min && job.salary_max ? {
          min: job.salary_min,
          max: job.salary_max,
          currency: job.salary_currency || 'USD'
        } : undefined,
        startDate: job.start_date,
        endDate: job.end_date,
      }));
    },
  });
};

export const useCreateJobRequirement = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (jobData: JobRequirementFormData) => {
      // Get existing jobs to generate unique job ID
      const { data: existingJobs } = await supabase
        .from('job_requirements')
        .select('job_id');

      const jobId = generateJobId(jobData.title, existingJobs?.map(j => ({ jobId: j.job_id })) || []);

      const { data: job, error } = await supabase
        .from('job_requirements')
        .insert([{
          job_id: jobId,
          title: jobData.title,
          client: jobData.client,
          vendor: jobData.vendor,
          description: jobData.description,
          tech_stack: jobData.techStack,
          experience: jobData.experience,
          location: jobData.location,
          salary_min: jobData.salary?.min,
          salary_max: jobData.salary?.max,
          salary_currency: jobData.salary?.currency || 'USD',
          status: jobData.status,
          priority: jobData.priority,
          deadline: jobData.deadline,
          notes: jobData.notes,
          assigned_resources: jobData.assignedResources || [],
        }])
        .select()
        .single();

      if (error) throw error;
      return job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobRequirements'] });
      toast({
        title: "Job requirement created",
        description: "The job requirement has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating job requirement",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateJobRequirement = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ jobId, jobData }: { jobId: string; jobData: JobRequirementFormData }) => {
      const { error } = await supabase
        .from('job_requirements')
        .update({
          title: jobData.title,
          client: jobData.client,
          vendor: jobData.vendor,
          description: jobData.description,
          tech_stack: jobData.techStack,
          experience: jobData.experience,
          location: jobData.location,
          salary_min: jobData.salary?.min,
          salary_max: jobData.salary?.max,
          salary_currency: jobData.salary?.currency || 'USD',
          status: jobData.status,
          priority: jobData.priority,
          deadline: jobData.deadline,
          notes: jobData.notes,
          assigned_resources: jobData.assignedResources || [],
          updated_at: new Date().toISOString(),
        })
        .eq('id', jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobRequirements'] });
      toast({
        title: "Job requirement updated",
        description: "The job requirement has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating job requirement",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteJobRequirement = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const { error } = await supabase
        .from('job_requirements')
        .delete()
        .eq('id', jobId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobRequirements'] });
      toast({
        title: "Job requirement deleted",
        description: "The job requirement has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting job requirement",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
