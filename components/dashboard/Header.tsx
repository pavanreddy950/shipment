'use client';

import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-16 bg-surface border-b border-gray-800 flex items-center justify-between px-8"
    >
      <div>
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        {subtitle && <p className="text-sm text-text-secondary">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-background rounded-lg border border-gray-800 focus-within:border-primary transition-colors">
          <Search className="w-4 h-4 text-text-tertiary" />
          <input
            type="text"
            placeholder="Quick search..."
            className="bg-transparent border-none outline-none text-sm text-text-primary placeholder-text-tertiary w-48"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 hover:bg-surface-light rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-text-secondary" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full" />
        </button>
      </div>
    </motion.header>
  );
}
