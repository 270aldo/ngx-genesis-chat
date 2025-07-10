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
export const ProfileSection: React.FC<ProfileSectionProps> = ({
  user
}) => {
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
  return;
};