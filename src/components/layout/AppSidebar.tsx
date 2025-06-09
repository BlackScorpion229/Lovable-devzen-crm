
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
    <Sidebar className="glass-sidebar">
      <SidebarHeader>
        <div className="px-4 py-2">
          <h1 className="font-bold text-sidebar-foreground text-2xl drop-shadow-md">
            DevZen CRM
          </h1>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/90 font-medium">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link) => (
                <SidebarMenuItem key={link.to}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === link.to}
                    className="hover:bg-white/20 data-[active=true]:bg-white/30 data-[active=true]:shadow-lg transition-all duration-200"
                  >
                    <Link to={link.to} className="flex items-center gap-3 text-sidebar-foreground">
                      <link.icon className="w-5 h-5" />
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <div className="p-4 border-t border-white/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Users className="w-4 h-4 text-sidebar-foreground" />
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
