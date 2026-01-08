'use client';

import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  AlertTriangle, 
  Package, 
  Ship,
  MapPin,
  FileCheck
} from 'lucide-react';
import { Checkpoint } from '@/types/shipment';
import { formatDate } from '@/lib/utils';

interface ShipmentTimelineProps {
  checkpoints: Checkpoint[];
}

export default function ShipmentTimeline({ checkpoints }: ShipmentTimelineProps) {
  const getIcon = (status: string, completed: boolean) => {
    if (status.includes('Delay')) return AlertTriangle;
    if (status === 'Loaded') return Package;
    if (status === 'Departed') return Ship;
    if (status === 'Arrived') return MapPin;
    if (status === 'Customs Clearance') return FileCheck;
    if (completed) return CheckCircle;
    return Clock;
  };

  const getIconColor = (status: string, completed: boolean) => {
    if (status.includes('Delay')) return 'text-warning';
    if (completed) return 'text-success';
    return 'text-primary';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="card"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl font-semibold text-text-primary mb-6"
      >
        Shipment Timeline
      </motion.h3>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-800" />

        <div className="space-y-8">
          {checkpoints.map((checkpoint, index) => {
            const Icon = getIcon(checkpoint.status, checkpoint.completed);
            const iconColor = getIconColor(checkpoint.status, checkpoint.completed);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: 0.4 + index * 0.15,
                  type: 'spring',
                  stiffness: 100 
                }}
                whileHover={{ x: 4 }}
                className="relative pl-16 group"
              >
                {/* Icon container */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    delay: 0.5 + index * 0.15,
                    type: 'spring',
                    stiffness: 200 
                  }}
                  className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center
                            ${checkpoint.completed ? 'bg-success/10' : 'bg-surface-light'}
                            border-2 ${checkpoint.completed ? 'border-success' : 'border-gray-700'}
                            group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${iconColor}`} />
                  
                  {/* Pulse animation for active checkpoint */}
                  {!checkpoint.completed && index === checkpoints.findIndex(c => !c.completed) && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full border-2 border-primary"
                    />
                  )}
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.15 }}
                  className="pb-2"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors">
                      {checkpoint.status}
                    </h4>
                    <span className="text-xs text-text-tertiary">
                      {formatDate(checkpoint.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-text-secondary mb-1">
                    {checkpoint.location}
                  </p>
                  
                  <p className="text-sm text-text-tertiary">
                    {checkpoint.description}
                  </p>

                  {/* Progress indicator */}
                  {checkpoint.completed && (
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: 0.7 + index * 0.15, duration: 0.5 }}
                      className="mt-3 h-1 bg-gradient-to-r from-success to-primary rounded-full"
                    />
                  )}
                </motion.div>

                {/* Connecting animation */}
                {index < checkpoints.length - 1 && checkpoint.completed && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ delay: 0.8 + index * 0.15, duration: 0.4 }}
                    className="absolute left-6 top-12 w-0.5 bg-gradient-to-b from-success to-primary"
                    style={{ marginLeft: '-1px' }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Estimated completion */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 + checkpoints.length * 0.15 }}
        className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg"
      >
        <p className="text-sm text-text-secondary text-center">
          {checkpoints.every(c => c.completed) ? (
            <span className="text-success font-semibold">✓ All checkpoints completed</span>
          ) : (
            <>
              Next update expected in{' '}
              <span className="font-semibold text-primary">2-4 hours</span>
            </>
          )}
        </p>
      </motion.div>
    </motion.div>
  );
}
