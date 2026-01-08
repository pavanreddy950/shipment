'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Ship } from 'lucide-react';

interface ShipmentSearchProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export default function ShipmentSearch({ onSearch, isLoading }: ShipmentSearchProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6"
        >
          <Ship className="w-10 h-10 text-primary" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-text-primary mb-3"
        >
          Track Your Shipment
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-text-secondary"
        >
          Real-time tracking of global shipments across 5,000+ active containers
        </motion.p>
      </div>

      <form onSubmit={handleSubmit}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="relative"
        >
          {/* Animated glow effect on focus */}
          {isFocused && (
            <motion.div
              layoutId="search-glow"
              className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-2xl blur-lg opacity-30"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}

          <div className="relative flex items-center">
            <motion.div
              animate={{
                scale: isFocused ? 1.1 : 1,
                rotate: isFocused ? 360 : 0
              }}
              transition={{ duration: 0.3 }}
              className="absolute left-6 pointer-events-none"
            >
              <Search className="w-6 h-6 text-text-tertiary" />
            </motion.div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter Bill of Lading / Container / Shipment ID"
              className="w-full pl-16 pr-6 py-6 bg-surface border-2 border-gray-800 rounded-xl
                       text-text-primary text-lg placeholder-text-tertiary
                       focus:outline-none focus:border-primary
                       transition-all duration-300"
              disabled={isLoading}
            />

            <motion.button
              type="submit"
              disabled={isLoading || !query.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute right-3 px-8 py-3 bg-primary hover:bg-primary-dark 
                       text-white font-semibold rounded-lg
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors duration-200
                       shadow-lg shadow-primary/30"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Track'
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Example IDs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center"
        >
          <p className="text-sm text-text-tertiary mb-2">Try these example IDs:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['SHP1000001', 'SHP1000100', 'SHP1000500'].map((id, index) => (
              <motion.button
                key={id}
                type="button"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setQuery(id)}
                className="px-4 py-2 bg-surface-light border border-gray-800 rounded-lg
                         text-text-secondary text-sm hover:border-primary hover:text-primary
                         transition-all duration-200"
              >
                {id}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}
