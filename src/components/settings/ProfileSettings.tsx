
import React from 'react';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Calendar } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const { user, updateProfile } = useAuthStore();

  const handleSave = () => {
    console.log('Save profile changes');
    // TODO: Implement save functionality
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light text-white mb-2">Profile Settings</h2>
        <p className="text-white/60">Manage your account information and preferences</p>
      </div>

      <Card className="glass-ultra border-white/10 bg-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-purple-500/20 text-purple-400 text-lg">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" className="text-white border-white/20 hover:bg-white/5">
                Change Avatar
              </Button>
              <p className="text-sm text-white/60 mt-2">JPG, PNG up to 2MB</p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Full Name</Label>
              <Input
                id="name"
                defaultValue={user?.name || ''}
                className="bg-white/5 border-white/10 text-white"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                <Input
                  id="email"
                  type="email"
                  defaultValue={user?.email || ''}
                  className="bg-white/5 border-white/10 text-white pl-10"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subscription" className="text-white">Subscription</Label>
              <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-md">
                <Calendar className="w-4 h-4 text-white/40" />
                <span className="text-white capitalize">{user?.subscription || 'free'}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="member-since" className="text-white">Member Since</Label>
              <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-md">
                <Calendar className="w-4 h-4 text-white/40" />
                <span className="text-white">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white"
            >
              Save Changes
            </Button>
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/5">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
