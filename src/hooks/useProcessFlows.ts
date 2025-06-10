
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProcessFlowItem } from '@/types/processFlow';
import { useToast } from '@/hooks/use-toast';

export const useProcessFlows = () => {
  return useQuery({
    queryKey: ['processFlows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('process_flows')
        .select(`
          *,
          job_requirements!inner(job_id, title),
          process_flow_history(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(flow => ({
        ...flow,
        jobRequirementId: flow.job_requirements.job_id,
        jobTitle: flow.job_requirements.title,
        candidateName: flow.candidate_name,
        currentStage: flow.current_stage,
        startDate: flow.start_date,
        expectedCompletionDate: flow.expected_completion_date,
        history: flow.process_flow_history?.map(h => ({
          ...h,
          stageId: h.stage_id,
          stageName: h.stage_name,
          enteredDate: h.entered_date,
          completedDate: h.completed_date,
          updatedBy: h.updated_by,
        })) || [],
      }));
    },
  });
};

export const useCreateProcessFlow = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (flowData: Omit<ProcessFlowItem, 'id' | 'history'>) => {
      // First get the job requirement by job_id
      const { data: jobReq, error: jobError } = await supabase
        .from('job_requirements')
        .select('id')
        .eq('job_id', flowData.jobRequirementId)
        .single();

      if (jobError || !jobReq) throw new Error('Job requirement not found');

      const { data: flow, error } = await supabase
        .from('process_flows')
        .insert([{
          job_requirement_id: jobReq.id,
          candidate_name: flowData.candidateName,
          current_stage: flowData.currentStage,
          start_date: flowData.startDate,
          expected_completion_date: flowData.expectedCompletionDate,
          status: flowData.status,
          priority: flowData.priority,
          notes: flowData.notes,
        }])
        .select()
        .single();

      if (error) throw error;
      return flow;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processFlows'] });
      toast({
        title: "Process flow created",
        description: "The process flow has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error creating process flow",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useUpdateProcessFlow = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ flowId, flowData }: { flowId: string; flowData: Omit<ProcessFlowItem, 'id' | 'history'> }) => {
      const { error } = await supabase
        .from('process_flows')
        .update({
          candidate_name: flowData.candidateName,
          current_stage: flowData.currentStage,
          start_date: flowData.startDate,
          expected_completion_date: flowData.expectedCompletionDate,
          status: flowData.status,
          priority: flowData.priority,
          notes: flowData.notes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', flowId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processFlows'] });
      toast({
        title: "Process flow updated",
        description: "The process flow has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error updating process flow",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};

export const useDeleteProcessFlow = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (flowId: string) => {
      const { error } = await supabase
        .from('process_flows')
        .delete()
        .eq('id', flowId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['processFlows'] });
      toast({
        title: "Process flow deleted",
        description: "The process flow has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error deleting process flow",
        description: error.message,
        variant: "destructive",
      });
    },
  });
};
