
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SignIn = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden">
      {/* Background effects - Consistent violet theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-violet-600/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="flex items-center justify-center min-h-screen p-4">
        <Card className="w-full max-w-md bg-white/5 border-purple-500/20 backdrop-blur-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-white">Sign In</CardTitle>
            <CardDescription className="text-center text-white/60">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="bg-white/5 border-purple-500/20 text-white placeholder:text-white/40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/80">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="bg-white/5 border-purple-500/20 text-white placeholder:text-white/40"
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-purple-500/20 to-violet-500/20 hover:from-purple-500/30 hover:to-violet-500/30 border border-purple-500/30 text-white">
              Sign In
            </Button>
            <div className="text-center space-y-2">
              <Link to="/forgot-password" className="text-sm text-purple-400 hover:text-purple-300">
                Forgot your password?
              </Link>
              <div className="text-sm text-white/60">
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-400 hover:text-purple-300">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
