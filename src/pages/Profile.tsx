
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { ProfileSettings } from '@/components/settings/ProfileSettings';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const isMobile = useIsMobile();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-light mb-4">No user found</h1>
          <Link to="/dashboard">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/5">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-violet-600/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(168,85,247,0.1)_1px,_transparent_0)] [background-size:20px_20px] opacity-20"></div>

      <div className="relative z-10 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-center gap-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="text-white/60 hover:text-white hover:bg-purple-500/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className={`font-light text-white mb-2 ${
              isMobile ? 'text-2xl sm:text-3xl' : 'text-4xl'
            }`}>Profile</h1>
            <p className={`text-white/60 ${
              isMobile ? 'text-sm' : 'text-base'
            }`}>Manage your personal information</p>
          </div>
        </div>

        {/* Profile Content */}
        <ProfileSettings />
      </div>
    </div>
  );
};

export default Profile;
