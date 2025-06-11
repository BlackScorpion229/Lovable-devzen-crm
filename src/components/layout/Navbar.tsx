
import React, { useState } from 'react';
import { ChevronDown, Plus } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import VendorDialog from '@/components/vendor/VendorDialog';
import ResourceDialog from '@/components/resource/ResourceDialog';
import JobRequirementDialog from '@/components/jobRequirement/JobRequirementDialog';
import ProcessFlowDialog from '@/components/processFlow/ProcessFlowDialog';
import { useCreateVendor, useCreateResource, useCreateJobRequirement, useCreateProcessFlow } from '@/hooks/useVendors';

interface NavbarProps {
  title: string;
  subtitle?: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const location = useLocation();
  const [vendorDialogOpen, setVendorDialogOpen] = useState(false);
  const [resourceDialogOpen, setResourceDialogOpen] = useState(false);
  const [jobRequirementDialogOpen, setJobRequirementDialogOpen] = useState(false);
  const [processFlowDialogOpen, setProcessFlowDialogOpen] = useState(false);

  const createVendorMutation = useCreateVendor();
  const createResourceMutation = useCreateResource();
  const createJobRequirementMutation = useCreateJobRequirement();
  const createProcessFlowMutation = useCreateProcessFlow();

  const handleSaveVendor = (vendorData: any) => {
    createVendorMutation.mutate(vendorData);
    setVendorDialogOpen(false);
  };

  const handleSaveResource = (resourceData: any) => {
    createResourceMutation.mutate(resourceData);
    setResourceDialogOpen(false);
  };

  const handleSaveJobRequirement = (jobData: any) => {
    createJobRequirementMutation.mutate(jobData);
    setJobRequirementDialogOpen(false);
  };

  const handleSaveProcessFlow = (flowData: any) => {
    createProcessFlowMutation.mutate(flowData);
    setProcessFlowDialogOpen(false);
  };

  const getActionButtons = () => {
    switch (location.pathname) {
      case '/vendors':
        return (
          <Button onClick={() => setVendorDialogOpen(true)} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Vendor
          </Button>
        );
      case '/resources':
        return (
          <Button onClick={() => setResourceDialogOpen(true)} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Resource
          </Button>
        );
      case '/job-requirements':
        return (
          <Button onClick={() => setJobRequirementDialogOpen(true)} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Job Requirement
          </Button>
        );
      case '/process-flow':
        return (
          <Button onClick={() => setProcessFlowDialogOpen(true)} className="flex items-center gap-2 shadow-lg">
            <Plus className="w-4 h-4" />
            Add Process Flow
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <header className="w-full py-4 px-6 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Action Buttons */}
          {getActionButtons()}
          
          {/* User Menu */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              A
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Admin</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
      </header>

      {/* Dialogs */}
      <VendorDialog
        open={vendorDialogOpen}
        onOpenChange={setVendorDialogOpen}
        vendor={null}
        onSave={handleSaveVendor}
      />

      <ResourceDialog
        isOpen={resourceDialogOpen}
        onClose={() => setResourceDialogOpen(false)}
        resource={null}
        onSave={handleSaveResource}
      />

      <JobRequirementDialog
        isOpen={jobRequirementDialogOpen}
        onClose={() => setJobRequirementDialogOpen(false)}
        jobRequirement={null}
        onSave={handleSaveJobRequirement}
      />

      <ProcessFlowDialog
        isOpen={processFlowDialogOpen}
        onClose={() => setProcessFlowDialogOpen(false)}
        processFlow={null}
        onSave={handleSaveProcessFlow}
      />
    </>
  );
};

export default Navbar;
