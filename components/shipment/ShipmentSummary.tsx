'use client';

import { motion } from 'framer-motion';
import { Ship, Package, Calendar, MapPin, TrendingUp, Clock } from 'lucide-react';
import { Shipment } from '@/types/shipment';
import { formatDate } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface ShipmentSummaryProps {
  shipment: Shipment;
}

export default function ShipmentSummary({ shipment }: ShipmentSummaryProps) {
  const getStatusColor = (status: string): 'success' | 'warning' | 'danger' | 'primary' | 'secondary' | 'default' => {
    const colors: Record<string, 'success' | 'warning' | 'danger' | 'primary' | 'secondary'> = {
      'Arrived': 'success',
      'In Transit': 'primary',
      'Delayed': 'warning',
      'Loaded': 'secondary',
      'Departed': 'primary',
      'Customs Clearance': 'warning'
    };
    return colors[status] || 'secondary';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card mb-6"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-text-primary mb-2"
          >
            {shipment.vesselName}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-text-secondary"
          >
            {shipment.carrier}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <Badge variant={getStatusColor(shipment.currentStatus)}>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block w-2 h-2 rounded-full bg-current mr-2"
            />
            {shipment.currentStatus}
          </Badge>
        </motion.div>
      </div>

      {/* Route */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-success" />
              <span className="text-sm text-text-secondary">Origin</span>
            </div>
            <p className="font-semibold text-text-primary">{shipment.originPort}</p>
            <p className="text-sm text-text-tertiary">{shipment.originCountry}</p>
          </div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring' }}
            className="flex-shrink-0 mx-6"
          >
            <Ship className="w-8 h-8 text-primary" />
          </motion.div>

          <div className="flex-1 text-right">
            <div className="flex items-center justify-end gap-2 mb-2">
              <span className="text-sm text-text-secondary">Destination</span>
              <MapPin className="w-4 h-4 text-danger" />
            </div>
            <p className="font-semibold text-text-primary">{shipment.destinationPort}</p>
            <p className="text-sm text-text-tertiary">{shipment.destinationCountry}</p>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-text-secondary">Journey Progress</span>
          <span className="text-sm font-bold text-primary">{shipment.progressPercentage}%</span>
        </div>
        <div className="h-3 bg-surface-light rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${shipment.progressPercentage}%` }}
            transition={{ duration: 1.5, delay: 0.6, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Details Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <DetailItem
          icon={Package}
          label="Container"
          value={shipment.containerNumber}
          delay={0.8}
        />
        <DetailItem
          icon={Calendar}
          label="Departure"
          value={formatDate(shipment.departureDate)}
          delay={0.9}
        />
        <DetailItem
          icon={Clock}
          label="ETA"
          value={formatDate(shipment.estimatedArrivalDate)}
          delay={1.0}
        />
        <DetailItem
          icon={TrendingUp}
          label="Cargo"
          value={shipment.cargoType}
          delay={1.1}
        />
      </motion.div>
    </motion.div>
  );
}

function DetailItem({ 
  icon: Icon, 
  label, 
  value, 
  delay 
}: { 
  icon: any; 
  label: string; 
  value: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring' }}
      whileHover={{ scale: 1.05, y: -2 }}
      className="p-4 bg-surface-light rounded-lg border border-gray-800 hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-text-tertiary" />
        <span className="text-xs text-text-tertiary uppercase">{label}</span>
      </div>
      <p className="text-sm font-semibold text-text-primary truncate">{value}</p>
    </motion.div>
  );
}
