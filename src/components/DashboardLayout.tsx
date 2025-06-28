
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Send, FileText, Users, LogOut, Shield, Menu } from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', url: '/dashboard', icon: Home },
  { title: 'Send Alert', url: '/send-alert', icon: Send },
  { title: 'Alert Logs', url: '/alert-logs', icon: FileText },
  { title: 'Manage Users', url: '/upload-users', icon: Users },
];

function AppSidebar() {
  const { user, logout } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === 'collapsed';
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium' : 'hover:bg-sidebar-accent/50 text-sidebar-foreground';

  return (
    <Sidebar className={isCollapsed ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarContent className="gradient-bg">
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-white" />
            {!isCollapsed && (
              <div>
                <h1 className="text-xl font-bold text-white">KASA</h1>
                <p className="text-xs text-blue-100">Keep All Safe & Alert</p>
              </div>
            )}
          </div>
        </div>

        {!isCollapsed && user && (
          <div className="p-4 border-b border-sidebar-border">
            <p className="text-sm text-blue-100 mb-1">Logged in as:</p>
            <p className="text-white font-medium text-sm">{user.agencyName}</p>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-100">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-sidebar-border">
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full text-white hover:bg-sidebar-accent/50 justify-start"
            size={isCollapsed ? "sm" : "default"}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar />
        <div className="flex-1">
          <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
            <SidebarTrigger className="mr-4">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <h2 className="text-lg font-semibold text-gray-900">Emergency Alert Management</h2>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
