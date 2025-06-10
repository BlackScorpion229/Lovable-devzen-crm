
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProcessFlowItem, ProcessFlowFormData } from '@/types/processFlow';
import { useToast } from '@/hooks/use-toast';

export const useProcessFlows = () => {
  return useQuery({
    queryKey: ['processFlows'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('process_flows')
        .select(`
          *,
          job_requirements(title),
          process_flow_history(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(flow => ({
        id: flow.id,
        jobRequirementId: flow.job_requirement_id,
        jobTitle: (flow.job_requirements as any)?.title || 'Unknown Job',
        candidateName: flow.candidate_name,
        currentStage: flow.current_stage,
        status: flow.status as 'Active' | 'OnHold' | 'Completed' | 'Cancelled',
        priority: flow.priority,
        startDate: flow.start_date,
        expectedCompletionDate: flow.expected_completion_date,
        notes: flow.notes,
        createdAt: flow.created_at,
        updatedAt: flow.updated_at,
        history: (flow.process_flow_history as any[])?.map(h => ({
          id: h.id,
          stageId: h.stage_id,
          stageName: h.stage_name,
          enteredDate: h.entered_date,
          completedDate: h.completed_date,
          duration: h.duration,
          notes: h.notes,
          updatedBy: h.updated_by,
        })) || []
      }));
    },
  });
};

export const useCreateProcessFlow = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (flowData: ProcessFlowFormData) => {
      const { data: flow, error } = await supabase
        .from('process_flows')
        .insert([{
          job_requirement_id: flowData.jobRequirementId,
          candidate_name: flowData.candidateName,
          current_stage: flowData.currentStage,
          status: flowData.status,
          priority: flowData.priority,
          start_date: flowData.startDate,
          expected_completion_date: flowData.expectedCompletionDate,
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
    mutationFn: async ({ flowId, flowData }: { flowId: string; flowData: ProcessFlowFormData }) => {
      const { error } = await supabase
        .from('process_flows')
        .update({
          job_requirement_id: flowData.jobRequirementId,
          candidate_name: flowData.candidateName,
          current_stage: flowData.currentStage,
          status: flowData.status,
          priority: flowData.priority,
          start_date: flowData.startDate,
          expected_completion_date: flowData.expectedCompletionDate,
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
