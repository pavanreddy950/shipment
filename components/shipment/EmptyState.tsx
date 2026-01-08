'use client';

import { motion } from 'framer-motion';
import { Search, Package } from 'lucide-react';

interface EmptyStateProps {
  type: 'not-found' | 'error';
  message?: string;
}

export default function EmptyState({ type, message }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto text-center py-16"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        {type === 'not-found' ? (
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="inline-flex items-center justify-center w-32 h-32 bg-surface-light rounded-full border-4 border-gray-800"
          >
            <Search className="w-16 h-16 text-text-tertiary" />
          </motion.div>
        ) : (
          <motion.div
            animate={{
              y: [0, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="inline-flex items-center justify-center w-32 h-32 bg-danger/10 rounded-full border-4 border-danger/20"
          >
            <Package className="w-16 h-16 text-danger" />
          </motion.div>
        )}
      </motion.div>

      <motion.h3
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-text-primary mb-3"
      >
        {type === 'not-found' ? 'No Shipment Found' : 'Something Went Wrong'}
      </motion.h3>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-text-secondary mb-8 max-w-md mx-auto"
      >
        {message || (type === 'not-found' 
          ? 'We couldn\'t find a shipment matching your search. Please verify the ID and try again.'
          : 'An error occurred while fetching shipment data. Please try again later.'
        )}
      </motion.p>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="space-y-3"
      >
        <p className="text-sm text-text-tertiary">Search tips:</p>
        <ul className="text-sm text-text-secondary space-y-2">
          <motion.li
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ✓ Use the complete Shipment ID (e.g., SHP1000001)
          </motion.li>
          <motion.li
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            ✓ Enter the full Bill of Lading number
          </motion.li>
          <motion.li
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            ✓ Check for typos in the Container number
          </motion.li>
        </ul>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.08, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary rounded-full blur-3xl"
        />
      </div>
    </motion.div>
  );
}
