
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabaseClient';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      setIsLoading(false);
      return;
    }

    toast({ title: 'Email sent', description: 'Check your inbox for the reset link.' });
    setIsLoading(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden flex items-center justify-center">
        {/* Background effects - Updated to match violet theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-violet-600/5 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent pointer-events-none"></div>

        {/* Back to Sign In */}
        <Link 
          to="/sign-in" 
          className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Sign In</span>
        </Link>

        {/* Success Message */}
        <div className="w-full max-w-md px-6 relative z-10">
          <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            
            <h1 className="text-2xl font-light text-white mb-4">
              Check Your Email
            </h1>
            
            <p className="text-white/60 mb-6">
              We've sent a password reset link to <strong className="text-white">{email}</strong>
            </p>
            
            <p className="text-white/40 text-sm mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>

            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25"
            >
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/30 to-black relative overflow-hidden flex items-center justify-center">
      {/* Background effects - Updated to match violet theme */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/8 via-transparent to-violet-600/5 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-purple-900/5 via-transparent to-transparent pointer-events-none"></div>

      {/* Back to Sign In */}
      <Link 
        to="/sign-in" 
        className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Sign In</span>
      </Link>

      {/* Main Content */}
      <div className="w-full max-w-md px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-white/5 backdrop-blur-xl border border-purple-500/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-purple-400" />
            </div>
            
            <h1 className="text-3xl font-light text-white mb-2">
              Reset Password
            </h1>
            <p className="text-white/60">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white/80">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="glass-premium border-purple-500/20 bg-white/5 text-white placeholder:text-white/40 focus:border-purple-500/50"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/25 disabled:opacity-50"
            >
              <span>{isLoading ? 'Sending...' : 'Send Reset Link'}</span>
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-white/60">
              Remember your password?{' '}
              <Link 
                to="/sign-in" 
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
