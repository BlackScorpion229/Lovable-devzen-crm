
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Briefcase, 
  GitBranch, 
  FileText, 
  LayoutDashboard 
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const links = [
  {
    to: "/",
    icon: LayoutDashboard,
    label: "Dashboard"
  },
  {
    to: "/vendors",
    icon: Building2,
    label: "Vendors"
  },
  {
    to: "/resources",
    icon: Users,
    label: "Resources"
  },
  {
    to: "/job-requirements",
    icon: Briefcase,
    label: "Job Requirements"
  },
  {
    to: "/process-flow",
    icon: GitBranch,
    label: "Process Flow"
  },
  {
    to: "/calendar",
    icon: FileText,
    label: "Calendar"
  }
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h1 className="font-bold text-sidebar-foreground text-2xl">
            DevZen CRM
          </h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.to}>
                  <SidebarMenuButton asChild isActive={location.pathname === link.to}>
                    <Link to={link.to}>
                      <link.icon />
                      <span>{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <Users className="w-4 h-4 text-sidebar-accent-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">IT Staffing CRM</p>
              <p className="text-xs text-sidebar-foreground/70">v1.0.0</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
