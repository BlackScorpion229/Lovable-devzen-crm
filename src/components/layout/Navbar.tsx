
import React, { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Badge from '@/components/common/Badge';
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

interface NavbarProps {
  title: string;
  subtitle?: string;
}

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: 'vendor' | 'resource' | 'job-requirement';
  url: string;
}

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
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
    // Navigate to the URL
    window.location.href = result.url;
    setOpen(false);
    setSearchQuery('');
  };

  return (
    <header className="w-full py-4 px-6 flex items-center justify-between bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Universal Search */}
        <div className="relative hidden md:block">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div 
                className="relative cursor-pointer"
                onClick={() => setOpen(true)}
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search vendors, resources, jobs..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setOpen(true)}
                  className="py-2 pl-10 pr-4 rounded-lg bg-secondary border border-border focus:outline-none focus:ring-2 focus:ring-ring w-full max-w-xs transition-all duration-300"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
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
  );
};

export default Navbar;
