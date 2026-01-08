'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { formatNumber, formatCompactNumber } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  compact?: boolean;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  compact = false,
  delay = 0,
}: StatCardProps) {
  const formattedValue = typeof value === 'number' 
    ? (compact ? formatCompactNumber(value) : formatNumber(value))
    : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.15)' }}
      className="card transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-text-secondary text-sm font-medium mb-2">{title}</p>
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-3xl font-bold text-text-primary mb-2"
          >
            {formattedValue}
          </motion.p>
          {trend && (
            <div className={`flex items-center text-sm ${trend.isPositive ? 'text-success' : 'text-danger'}`}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span className="ml-1">{Math.abs(trend.value)}%</span>
              <span className="ml-2 text-text-tertiary">vs last month</span>
            </div>
          )}
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
          className="p-3 bg-primary/10 rounded-lg"
        >
          <Icon className="w-6 h-6 text-primary" />
        </motion.div>
      </div>
    </motion.div>
  );
}
