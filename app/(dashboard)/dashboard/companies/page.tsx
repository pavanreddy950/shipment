'use client';

import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import Header from '@/components/dashboard/Header';

export default function CompaniesPage() {
  const router = useRouter();
  
  // Redirect to search page as it serves the same purpose
  router.push('/dashboard/search');
  
  return (
    <div className="min-h-screen">
      <Header title="Companies" subtitle="Loading..." />
      <div className="flex items-center justify-center h-96">
        <div className="spinner" />
      </div>
    </div>
  );
}
