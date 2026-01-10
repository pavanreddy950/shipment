'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Search,
  Building2,
  Ship,
  Mail,
  CreditCard,
  Download,
  Settings,
  Globe,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Hash,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Search, label: 'Search & Discovery', href: '/dashboard/search' },
  { icon: Building2, label: 'Companies', href: '/dashboard/companies' },
  { icon: Hash, label: 'HSN Codes', href: '/dashboard/hsn-codes' },
  { icon: Ship, label: 'Shipment Tracker', href: '/dashboard/shipment-tracker' },
  { icon: Mail, label: 'AI Email Generator', href: '/dashboard/email-generator' },
  { icon: CreditCard, label: 'Billing & Credits', href: '/dashboard/billing' },
  { icon: Download, label: 'Exports', href: '/dashboard/exports' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0, width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-screen bg-surface border-r border-gray-800 z-40 flex flex-col"
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-gray-800">
        {!collapsed && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <span className="text-lg font-bold gradient-text">TradeIntel</span>
          </Link>
        )}
        {collapsed && (
          <div className="p-2 bg-primary/10 rounded-lg mx-auto">
            <Globe className="w-5 h-5 text-primary" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link href={item.href}>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className={cn(
                      'flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-text-secondary hover:bg-surface-light hover:text-text-primary'
                    )}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!collapsed && (
                      <span className="font-medium text-sm">{item.label}</span>
                    )}
                    {isActive && !collapsed && (
                      <motion.div
                        layoutId="active-pill"
                        className="ml-auto w-1 h-6 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-gray-800">
        {!collapsed ? (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-primary">JM</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">John Mitchell</p>
              <p className="text-xs text-text-tertiary truncate">Pro Plan</p>
            </div>
          </div>
        ) : (
          <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-sm font-semibold text-primary">JM</span>
          </div>
        )}
        
        <button
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/';
          }}
          className={cn(
            'flex items-center gap-2 w-full px-3 py-2 text-text-secondary hover:text-danger hover:bg-danger/10 rounded-lg transition-colors',
            collapsed && 'justify-center'
          )}
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="text-sm">Logout</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-surface border border-gray-800 rounded-full flex items-center justify-center hover:bg-surface-light transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4 text-text-secondary" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-text-secondary" />
        )}
      </button>
    </motion.aside>
  );
}
