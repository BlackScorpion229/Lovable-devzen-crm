
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import VendorsPage from "./pages/Vendors";
import ResourcesPage from "./pages/Resources";
import JobRequirementsPage from "./pages/JobRequirements";
import ProcessFlowPage from "./pages/ProcessFlow";
import CalendarPage from "./pages/Calendar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 glass-main">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/vendors" element={<VendorsPage />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/job-requirements" element={<JobRequirementsPage />} />
                <Route path="/process-flow" element={<ProcessFlowPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
