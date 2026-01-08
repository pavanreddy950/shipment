'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft } from 'lucide-react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate email sending
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1500);
  };

  if (sent) {
    return (
      <div className="card text-center">
        <div className="mb-6 mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Check Your Email</h1>
        <p className="text-text-secondary mb-8">
          We've sent password reset instructions to <strong>{email}</strong>
        </p>
        <Link href="/auth/login">
          <Button variant="secondary" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-2">Reset Password</h1>
        <p className="text-text-secondary">
          Enter your email and we'll send you instructions to reset your password
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="email"
          label="Email Address"
          placeholder="you@company.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" className="w-full" loading={loading}>
          Send Reset Instructions
        </Button>
      </form>

      <div className="mt-6">
        <Link href="/auth/login">
          <Button variant="ghost" className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign In
          </Button>
        </Link>
      </div>
    </div>
  );
}
