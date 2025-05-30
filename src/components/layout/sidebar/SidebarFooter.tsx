
import React from 'react';
import { Button } from '@/components/ui/button';
import { useChatStore } from '@/store/chatStore';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Settings, User, TrendingUp, Activity, Utensils, Dumbbell } from 'lucide-react';

interface SidebarFooterProps {
  showBiometrics: boolean;
  setShowBiometrics: (show: boolean) => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({ 
  showBiometrics, 
  setShowBiometrics 
}) => {
  const { sidebarOpen, toggleSidebar } = useChatStore();
  const isMobile = useIsMobile();

  const handleBiometricsToggle = () => {
    setShowBiometrics(!showBiometrics);
    // Auto-close sidebar on mobile after toggling biometrics
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <div className="p-3 border-t border-sidebar-border">
      <div className="space-y-1">
        <Link to="/dashboard/progress">
          <Button
            variant="ghost"
            className={cn(
              "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
            )}
          >
            <TrendingUp className="h-4 w-4 flex-shrink-0" />
            {(sidebarOpen || isMobile) && <span>Progress Dashboard</span>}
          </Button>
        </Link>
        <Link to="/dashboard/nutrition">
          <Button
            variant="ghost"
            className={cn(
              "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
            )}
          >
            <Utensils className="h-4 w-4 flex-shrink-0" />
            {(sidebarOpen || isMobile) && <span>Nutrition</span>}
          </Button>
        </Link>
        <Link to="/dashboard/training">
          <Button
            variant="ghost"
            className={cn(
              "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
            )}
          >
            <Dumbbell className="h-4 w-4 flex-shrink-0" />
            {(sidebarOpen || isMobile) && <span>Training</span>}
          </Button>
        </Link>
        <Button
          variant="ghost"
          onClick={handleBiometricsToggle}
          className={cn(
            "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2",
            showBiometrics && "bg-sidebar-accent text-sidebar-accent-foreground"
          )}
        >
          <Activity className="h-4 w-4 flex-shrink-0" />
          {(sidebarOpen || isMobile) && <span>Biometrics</span>}
        </Button>
        <Link to="/settings">
          <Button
            variant="ghost"
            className={cn(
              "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
              (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
            )}
          >
            <Settings className="h-4 w-4 flex-shrink-0" />
            {(sidebarOpen || isMobile) && <span>Settings</span>}
          </Button>
        </Link>
        <Button
          variant="ghost"
          className={cn(
            "w-full text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent",
            (sidebarOpen || isMobile) ? "justify-start gap-2" : "justify-center px-2"
          )}
        >
          <User className="h-4 w-4 flex-shrink-0" />
          {(sidebarOpen || isMobile) && <span>Profile</span>}
        </Button>
      </div>
    </div>
  );
};
