import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Button, Input, Select, Card } from '../components/ui';
import BrandLogo from '../components/BrandLogo';

export default function Signup() {
  const { signup } = useStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'Customer',
    address: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      address: formData.address
    });

    if (res.success) {
      if (res.user.role === 'Admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/account/dashboard');
      }
    } else {
      setError(res.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-2">
          <BrandLogo compact className="mb-2" />
          <h1 className="text-3xl font-display font-semibold text-ink">Create Atelier Account</h1>
          <p className="text-ink-muted text-sm font-mono">Join FashionFizz & Receive +100 Loyalty Points</p>
        </div>

        <Card className="flex flex-col gap-6 p-6 sm:p-8">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-xs rounded-[2px]">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Zoya Khan"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Email Address"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="zoya@example.com"
              />
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+92 300 1234567"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>

            <Select
              label="Account Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin / Manager</option>
            </Select>

            <Input
              label="Default Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="House 42, Street 12, Islamabad"
            />

            <Button type="submit" className="w-full mt-4 py-4">
              Create Account & Claim +100 Points
            </Button>
          </form>
        </Card>

        <div className="text-center font-mono text-xs text-ink-muted">
          Already have an account?{' '}
          <Link to="/login" className="text-brand font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
