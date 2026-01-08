'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';
import { Shipment } from '@/types/shipment';

interface ShipmentMapProps {
  shipment: Shipment;
}

export default function ShipmentMap({ shipment }: ShipmentMapProps) {
  // Calculate SVG path between origin and destination
  const originX = 20;
  const originY = 50;
  const destX = 80;
  const destY = 50;
  
  // Current position based on progress
  const currentX = originX + (destX - originX) * (shipment.progressPercentage / 100);
  const currentY = originY + Math.sin((shipment.progressPercentage / 100) * Math.PI) * -15; // Arc effect

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="card"
    >
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="text-xl font-semibold text-text-primary mb-6"
      >
        Route Map
      </motion.h3>

      <div className="relative w-full aspect-[2/1] bg-surface-light rounded-xl overflow-hidden border border-gray-800">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path 
                  d="M 40 0 L 0 0 0 40" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="0.5"
                  className="text-primary"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* World map illustration (simplified) */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-30"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
        >
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.3 }}
            transition={{ duration: 2, delay: 0.6 }}
            d="M10,40 Q30,20 50,40 T90,40 M20,60 Q40,80 60,60 T100,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-accent"
          />
        </svg>

        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>

          {/* Animated route path */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: shipment.progressPercentage / 100, opacity: 1 }}
            transition={{ duration: 2, delay: 0.8, ease: 'easeInOut' }}
            d={`M ${originX} ${originY} Q ${(originX + destX) / 2} ${originY - 15} ${destX} ${destY}`}
            fill="none"
            stroke="url(#routeGradient)"
            strokeWidth="0.5"
            strokeDasharray="2 2"
          />

          {/* Origin port */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, type: 'spring' }}
          >
            <circle 
              cx={originX} 
              cy={originY} 
              r="2" 
              fill="#10b981"
              className="drop-shadow-lg"
            />
            <motion.circle
              cx={originX}
              cy={originY}
              r="2"
              fill="none"
              stroke="#10b981"
              strokeWidth="0.5"
              animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.g>

          {/* Destination port */}
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.2, type: 'spring' }}
          >
            <circle 
              cx={destX} 
              cy={destY} 
              r="2" 
              fill="#ef4444"
              className="drop-shadow-lg"
            />
            <motion.circle
              cx={destX}
              cy={destY}
              r="2"
              fill="none"
              stroke="#ef4444"
              strokeWidth="0.5"
              animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.g>

          {/* Current vessel position */}
          {shipment.progressPercentage > 0 && shipment.progressPercentage < 100 && (
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, type: 'spring' }}
            >
              <motion.circle
                cx={currentX}
                cy={currentY}
                r="2.5"
                fill="#3b82f6"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle
                cx={currentX}
                cy={currentY}
                r="2.5"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="0.5"
                animate={{ scale: [1, 3, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.g>
          )}
        </svg>

        {/* Location labels */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3 }}
          className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-2 bg-surface/90 backdrop-blur-sm rounded-lg border border-gray-800"
        >
          <MapPin className="w-4 h-4 text-success" />
          <div>
            <p className="text-xs text-text-tertiary">Origin</p>
            <p className="text-sm font-semibold text-text-primary">{shipment.originPort}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 bg-surface/90 backdrop-blur-sm rounded-lg border border-gray-800"
        >
          <MapPin className="w-4 h-4 text-danger" />
          <div>
            <p className="text-xs text-text-tertiary">Destination</p>
            <p className="text-sm font-semibold text-text-primary">{shipment.destinationPort}</p>
          </div>
        </motion.div>

        {/* Current position indicator */}
        {shipment.progressPercentage > 0 && shipment.progressPercentage < 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-primary/90 backdrop-blur-sm rounded-lg border border-primary"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <Navigation className="w-4 h-4 text-white" />
            </motion.div>
            <div>
              <p className="text-xs text-white/80">Current Position</p>
              <p className="text-sm font-semibold text-white">
                {shipment.latitude.toFixed(2)}°, {shipment.longitude.toFixed(2)}°
              </p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.7 }}
        className="mt-4 flex items-center justify-center gap-6 text-sm"
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-success" />
          <span className="text-text-secondary">Origin Port</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-text-secondary">Current Location</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-danger" />
          <span className="text-text-secondary">Destination Port</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
