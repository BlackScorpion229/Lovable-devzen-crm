
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Briefcase, 
  GitBranch, 
  FileText, 
  LayoutDashboard,
  Search,
  Plus
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Badge from '@/components/common/Badge';

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

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'vendor' | 'resource' | 'job-requirement';
  url: string;
}

export function AppSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  // Mock data for universal search
  const mockData = {
    vendors: [
      { id: '1', name: 'TechCorp Solutions', email: 'contact@techcorp.com' },
      { id: '2', name: 'InnovateTech', email: 'info@innovatetech.com' },
      { id: '3', name: 'CloudTech Inc', email: 'hello@cloudtech.com' },
    ],
    resources: [
      { id: '1', name: 'John Smith', techStack: ['React', 'Node.js'], type: 'InHouse' },
      { id: '2', name: 'Sarah Johnson', techStack: ['Python', 'AWS'], type: 'External-LinkedIn' },
      { id: '3', name: 'Mike Wilson', techStack: ['DevOps', 'Docker'], type: 'InHouse' },
    ],
    jobRequirements: [
      { id: '1', jobId: 'DZ-DS-0001', title: 'Senior Data Scientist', client: 'ABC Corp', status: 'Active' },
      { id: '2', jobId: 'DZ-DE-0001', title: 'Data Engineer', client: 'XYZ Ltd', status: 'Closed' },
      { id: '3', jobId: 'DZ-AI-0001', title: 'AI/ML Engineer', client: 'TechFlow', status: 'Active' },
    ]
  };

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results: SearchResult[] = [];

      // Search vendors
      mockData.vendors.forEach(vendor => {
        if (vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vendor.email.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            id: vendor.id,
            title: vendor.name,
            subtitle: vendor.email,
            type: 'vendor',
            url: '/vendors'
          });
        }
      });

      // Search resources
      mockData.resources.forEach(resource => {
        if (resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            resource.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))) {
          results.push({
            id: resource.id,
            title: resource.name,
            subtitle: `${resource.type} - ${resource.techStack.join(', ')}`,
            type: 'resource',
            url: '/resources'
          });
        }
      });

      // Search job requirements
      mockData.jobRequirements.forEach(job => {
        if (job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.jobId.toLowerCase().includes(searchQuery.toLowerCase())) {
          results.push({
            id: job.id,
            title: `${job.jobId} - ${job.title}`,
            subtitle: `${job.client} - ${job.status}`,
            type: 'job-requirement',
            url: '/job-requirements'
          });
        }
      });

      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'vendor':
        return '🏢';
      case 'resource':
        return '👤';
      case 'job-requirement':
        return '💼';
      default:
        return '📄';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'vendor':
        return 'Vendor';
      case 'resource':
        return 'Resource';
      case 'job-requirement':
        return 'Job Requirement';
      default:
        return 'Item';
    }
  };

  const handleResultSelect = (result: SearchResult) => {
    window.location.href = result.url;
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <Sidebar className="glass-sidebar">
      <SidebarHeader>
        <div className="px-4 py-2">
          <h1 className="font-bold text-sidebar-foreground text-2xl drop-shadow-md">
            DevZen CRM
          </h1>
        </div>
        
        {/* Universal Search */}
        <div className="px-2">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div 
                className="relative cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search everything..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setOpen(true)}
                  className="py-2 pl-10 pr-4 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 w-full text-sidebar-foreground placeholder:text-sidebar-foreground/60"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="start">
              <Command>
                <CommandInput 
                  placeholder="Search..." 
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandList>
                  {searchResults.length === 0 && searchQuery.length > 1 && (
                    <CommandEmpty>No results found.</CommandEmpty>
                  )}
                  {searchQuery.length <= 1 && (
                    <CommandEmpty>Type to search...</CommandEmpty>
                  )}
                  {searchResults.length > 0 && (
                    <CommandGroup heading="Search Results">
                      {searchResults.map((result) => (
                        <CommandItem
                          key={`${result.type}-${result.id}`}
                          onSelect={() => handleResultSelect(result)}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <span className="text-lg">{getTypeIcon(result.type)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate">{result.title}</div>
                            <div className="text-sm text-muted-foreground truncate">{result.subtitle}</div>
                          </div>
                          <Badge variant="outline" className="text-xs shrink-0">
                            {getTypeLabel(result.type)}
                          </Badge>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  )}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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
