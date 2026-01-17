import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { z } from 'zod';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import alsamosLogo from '@/assets/alsamos-logo.png';

const loginSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

const signupSchema = z.object({
  fullName: z.string().trim().min(1, { message: 'Name is required' }).max(100),
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const validation = loginSchema.safeParse({ email, password });
        if (!validation.success) {
          setError(validation.error.errors[0].message);
          setLoading(false);
          return;
        }

        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          if (signInError.message.includes('Invalid login credentials')) {
            setError('Invalid email or password');
          } else {
            setError(signInError.message);
          }
        }
      } else {
        const validation = signupSchema.safeParse({ fullName, email, password });
        if (!validation.success) {
          setError(validation.error.errors[0].message);
          setLoading(false);
          return;
        }

        const { error: signUpError } = await signUp(email, password, fullName);
        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            setError('An account with this email already exists');
          } else {
            setError(signUpError.message);
          }
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={alsamosLogo} alt="Alsamos" className="h-12 w-12" />
            <span className="font-display text-2xl font-bold">
              Alsamos <span className="gradient-text">Studio</span>
            </span>
          </div>
          <p className="text-muted-foreground">
            {isLogin ? 'Welcome back! Sign in to continue.' : 'Create your account to get started.'}
          </p>
        </div>

        {/* Form */}
        <div className="glass rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-secondary/50 border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary/50 border border-border rounded-xl pl-12 pr-12 py-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3 text-destructive text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground text-sm">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                }}
                className="text-primary hover:underline font-medium"
              >
                {isLogin ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="text-center mt-6">
          <a href="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">
            ← Back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
