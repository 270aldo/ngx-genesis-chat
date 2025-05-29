
import React from 'react';
import { User } from '@/store/authStore';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit3, Crown } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileSectionProps {
  user: User | null;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ user }) => {
  if (!user) return null;

  const getSubscriptionBadge = () => {
    switch (user.subscription) {
      case 'pro':
        return <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">Pro</Badge>;
      case 'enterprise':
        return <Badge className="bg-gradient-to-r from-gold-500 to-yellow-500"><Crown className="w-3 h-3 mr-1" />Enterprise</Badge>;
      default:
        return <Badge variant="secondary">Free</Badge>;
    }
  };

  return (
    <div className="glass-ultra border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Profile</h3>
        <Link to="/settings">
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <Edit3 className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-center text-center">
        <Avatar className="w-20 h-20 mb-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white text-lg">
            {user.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <h4 className="text-lg font-medium text-white mb-1">{user.name}</h4>
        <p className="text-white/60 text-sm mb-3">{user.email}</p>
        
        {getSubscriptionBadge()}

        <div className="mt-4 pt-4 border-t border-white/10 w-full">
          <div className="text-center">
            <p className="text-white/40 text-xs">Member since</p>
            <p className="text-white/60 text-sm">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
