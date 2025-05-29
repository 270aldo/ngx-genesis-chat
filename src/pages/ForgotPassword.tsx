
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implementar lógica de reset password con Supabase
    console.log('Password reset for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] [background-size:20px_20px] opacity-20"></div>

        {/* Back to Sign In */}
        <Link 
          to="/sign-in" 
          className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Sign In</span>
        </Link>

        {/* Success Message */}
        <div className="w-full max-w-md px-6">
          <div className="glass-ultra border border-white/10 rounded-3xl p-8 text-center">
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
              className="premium-glow-button w-full"
            >
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-pink-500/10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(255,255,255,0.15)_1px,_transparent_0)] [background-size:20px_20px] opacity-20"></div>

      {/* Back to Sign In */}
      <Link 
        to="/sign-in" 
        className="absolute top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Sign In</span>
      </Link>

      {/* Main Content */}
      <div className="w-full max-w-md px-6">
        <div className="glass-ultra border border-white/10 rounded-3xl p-8 relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full glass-premium border border-blue-500/20 flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-400" />
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
                className="glass-premium border-white/10 bg-white/5 text-white placeholder:text-white/40 focus:border-blue-500/50"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="premium-glow-button w-full">
              <span>Send Reset Link</span>
            </button>
          </form>

          {/* Sign In Link */}
          <div className="text-center mt-8">
            <p className="text-white/60">
              Remember your password?{' '}
              <Link 
                to="/sign-in" 
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
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
