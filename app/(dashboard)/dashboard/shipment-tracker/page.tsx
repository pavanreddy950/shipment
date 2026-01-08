'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/dashboard/Header';
import ShipmentSearch from '@/components/shipment/ShipmentSearch';
import ShipmentSummary from '@/components/shipment/ShipmentSummary';
import ShipmentTimeline from '@/components/shipment/ShipmentTimeline';
import ShipmentMap from '@/components/shipment/ShipmentMap';
import EmptyState from '@/components/shipment/EmptyState';
import { Shipment } from '@/types/shipment';
import { searchShipment } from '@/lib/data/shipment-mock-data';
import { TableSkeleton } from '@/components/ui/Skeleton';

export default function ShipmentTrackerPage() {
  const [isSearching, setIsSearching] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setNotFound(false);
    setShipment(null);
    setHasSearched(true);

    // Simulate API delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    const result = searchShipment(query);
    
    if (result) {
      setShipment(result);
    } else {
      setNotFound(true);
    }

    setIsSearching(false);
  };

  const handleNewSearch = () => {
    setShipment(null);
    setNotFound(false);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="Shipment Tracker" 
        subtitle="Real-time tracking of global shipments"
      />

      <div className="p-8">
        {/* Search Section */}
        <div className="max-w-7xl mx-auto">
          {(!hasSearched || notFound) && (
            <div className="min-h-[60vh] flex items-center justify-center">
              <ShipmentSearch 
                onSearch={handleSearch} 
                isLoading={isSearching}
              />
            </div>
          )}

          {/* Loading State */}
          <AnimatePresence mode="wait">
            {isSearching && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="card">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-6">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
                      />
                      <span className="text-text-secondary">Searching shipment database...</span>
                    </div>
                    <TableSkeleton rows={5} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Not Found State */}
            {notFound && !isSearching && (
              <motion.div
                key="not-found"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <EmptyState type="not-found" />
                <div className="text-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNewSearch}
                    className="px-8 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
                  >
                    Try Another Search
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Shipment Details */}
            {shipment && !isSearching && (
              <motion.div
                key="shipment-details"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* New Search Button */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-between items-center"
                >
                  <div>
                    <h2 className="text-sm font-medium text-text-secondary">Tracking ID</h2>
                    <p className="text-2xl font-bold text-text-primary">{shipment.shipmentId}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNewSearch}
                    className="px-6 py-2 bg-surface-light hover:bg-surface border border-gray-800 hover:border-primary text-text-primary rounded-lg transition-all"
                  >
                    New Search
                  </motion.button>
                </motion.div>

                {/* Summary Card */}
                <ShipmentSummary shipment={shipment} />

                {/* Map and Timeline Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Map */}
                  <ShipmentMap shipment={shipment} />

                  {/* Timeline */}
                  <ShipmentTimeline checkpoints={shipment.checkpoints} />
                </div>

                {/* Additional Details */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="card"
                >
                  <h3 className="text-xl font-semibold text-text-primary mb-6">
                    Shipment Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DetailItem 
                      label="Bill of Lading" 
                      value={shipment.billOfLading}
                      delay={0.7}
                    />
                    <DetailItem 
                      label="Shipper" 
                      value={shipment.shipperCompany}
                      delay={0.75}
                    />
                    <DetailItem 
                      label="Consignee" 
                      value={shipment.consigneeCompany}
                      delay={0.8}
                    />
                    <DetailItem 
                      label="Cargo Type" 
                      value={shipment.cargoType}
                      delay={0.85}
                    />
                    <DetailItem 
                      label="Weight" 
                      value={`${shipment.weight.toLocaleString()} kg`}
                      delay={0.9}
                    />
                    <DetailItem 
                      label="Volume" 
                      value={`${shipment.volume} CBM`}
                      delay={0.95}
                    />
                  </div>
                </motion.div>

                {/* Refresh Notice */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-center py-4"
                >
                  <p className="text-sm text-text-tertiary">
                    Last updated: {new Date(shipment.lastUpdated).toLocaleString()} •{' '}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="text-primary hover:underline"
                      onClick={() => handleSearch(shipment.shipmentId)}
                    >
                      Refresh
                    </motion.button>
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function DetailItem({ 
  label, 
  value, 
  delay 
}: { 
  label: string; 
  value: string; 
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="p-4 bg-surface-light rounded-lg border border-gray-800"
    >
      <p className="text-xs text-text-tertiary uppercase mb-2">{label}</p>
      <p className="text-sm font-semibold text-text-primary">{value}</p>
    </motion.div>
  );
}
