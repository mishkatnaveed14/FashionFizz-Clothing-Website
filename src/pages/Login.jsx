import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button, Input, Card } from '../components/ui';
import BrandLogo from '../components/BrandLogo';

export default function Login() {
  const { login } = useStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    const res = login(email, password);
    if (res.success) {
      if (res.user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/account/dashboard');
      }
    } else {
      setError(res.error || 'Invalid credentials');
    }
  };

  const fillDemoCustomer = () => {
    setEmail('customer@fashionfizz.com');
    setPassword('password123');
    setError('');
  };

  const fillDemoAdmin = () => {
    setEmail('admin@fashionfizz.com');
    setPassword('password123');
    setError('');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-2">
          <BrandLogo compact className="mb-2" />
          <h1 className="text-3xl font-display font-semibold text-ink">Welcome Back</h1>
          <p className="text-ink-muted text-sm font-body">Sign in to your FashionFizz account</p>
        </div>

        <Card className="flex flex-col gap-6 p-6 sm:p-8">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs rounded-[2px]">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@fashionfizz.com"
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <Button type="submit" className="w-full mt-2 py-4">
              Sign In
            </Button>
          </form>

          {/* Demo credential helpers */}
          <div className="flex flex-col gap-3 pt-6 border-t border-line">
            <span className="font-mono text-[10px] text-ink-muted uppercase tracking-widest text-center">
              Quick Demo Logins
            </span>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="p-3 bg-paper border border-line hover:border-brand rounded-[2px] text-left transition-colors cursor-pointer"
              >
                <span className="font-mono text-xs font-bold text-ink block">Customer</span>
                <span className="font-mono text-[10px] text-ink-muted truncate block">customer@...</span>
              </button>
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="p-3 bg-paper border border-line hover:border-brand rounded-[2px] text-left transition-colors cursor-pointer"
              >
                <span className="font-mono text-xs font-bold text-brand block">Admin</span>
                <span className="font-mono text-[10px] text-ink-muted truncate block">admin@...</span>
              </button>
            </div>
          </div>
        </Card>

        <div className="text-center font-mono text-xs text-ink-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="text-brand font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
