'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Copy,
  Check,
  Globe,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Tag,
  Percent,
  Calendar,
  Download,
  ExternalLink,
  ChevronRight,
  BarChart3,
  Hash
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { HSNCodeDetail } from '@/types';
import { formatNumber, formatCurrency, formatCompactNumber, formatDate } from '@/lib/utils';

interface HSNCodeDetailModalProps {
  code: HSNCodeDetail;
  isOpen: boolean;
  onClose: () => void;
}

export default function HSNCodeDetailModal({ code, isOpen, onClose }: HSNCodeDetailModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'analytics' | 'trade'>('overview');

  const handleCopy = () => {
    navigator.clipboard.writeText(code.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Calculate trend (last 3 months vs previous 3 months)
  const recentMonths = code.monthlyTrend.slice(-3);
  const previousMonths = code.monthlyTrend.slice(-6, -3);
  const recentTotal = recentMonths.reduce((sum, m) => sum + m.value, 0);
  const previousTotal = previousMonths.reduce((sum, m) => sum + m.value, 0);
  const trendPercentage = previousTotal > 0
    ? ((recentTotal - previousTotal) / previousTotal) * 100
    : 0;
  const isPositiveTrend = trendPercentage >= 0;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="fixed inset-4 md:inset-10 lg:inset-20 bg-surface rounded-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-gray-800">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Hash className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-2xl font-bold text-text-primary font-mono">
                      {code.fullCode}
                    </h2>
                    <button
                      onClick={handleCopy}
                      className="p-2 hover:bg-surface-light rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-5 h-5 text-success" />
                      ) : (
                        <Copy className="w-5 h-5 text-text-tertiary hover:text-primary" />
                      )}
                    </button>
                    <Badge variant="secondary">{code.category}</Badge>
                  </div>
                  <p className="text-text-secondary max-w-2xl">
                    {code.description}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-text-tertiary">
                    <span>Section {code.section}</span>
                    <span>|</span>
                    <span>Chapter {code.chapter}</span>
                    <span>|</span>
                    <span>Heading {code.heading}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-surface-light rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-text-tertiary hover:text-text-primary" />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-gray-800 bg-surface-light/50">
              {[
                { id: 'overview', label: 'Overview', icon: FileText },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 },
                { id: 'trade', label: 'Trade Data', icon: Globe }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id as typeof activeSection)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === tab.id
                      ? 'bg-primary text-white'
                      : 'text-text-secondary hover:bg-surface-light'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <AnimatePresence mode="wait">
                {activeSection === 'overview' && (
                  <motion.div
                    key="overview"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Key Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-surface-light rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="w-5 h-5 text-primary" />
                          <span className="text-sm text-text-secondary">Total Shipments</span>
                        </div>
                        <p className="text-2xl font-bold text-text-primary">
                          {formatNumber(code.totalShipments)}
                        </p>
                      </div>
                      <div className="bg-surface-light rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-5 h-5 text-success" />
                          <span className="text-sm text-text-secondary">Total Value</span>
                        </div>
                        <p className="text-2xl font-bold text-success">
                          ${formatCompactNumber(code.totalValue)}
                        </p>
                      </div>
                      <div className="bg-surface-light rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Percent className="w-5 h-5 text-warning" />
                          <span className="text-sm text-text-secondary">Duty Rate</span>
                        </div>
                        <p className="text-2xl font-bold text-warning">
                          {code.dutyRate}
                        </p>
                      </div>
                      <div className="bg-surface-light rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          {isPositiveTrend ? (
                            <TrendingUp className="w-5 h-5 text-success" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-danger" />
                          )}
                          <span className="text-sm text-text-secondary">Trend (3M)</span>
                        </div>
                        <p className={`text-2xl font-bold ${isPositiveTrend ? 'text-success' : 'text-danger'}`}>
                          {isPositiveTrend ? '+' : ''}{trendPercentage.toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {/* Long Description */}
                    <div className="bg-surface-light rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-3">
                        Full Description
                      </h3>
                      <p className="text-text-secondary leading-relaxed">
                        {code.longDescription}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Classification Details */}
                      <div className="bg-surface-light rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                          Classification Details
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-gray-800">
                            <span className="text-text-secondary">HS Code</span>
                            <span className="font-mono font-semibold text-primary">{code.code}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-800">
                            <span className="text-text-secondary">Section</span>
                            <span className="text-text-primary">Section {code.section}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-800">
                            <span className="text-text-secondary">Chapter</span>
                            <span className="text-text-primary">Chapter {code.chapter}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-800">
                            <span className="text-text-secondary">Heading</span>
                            <span className="text-text-primary">{code.heading}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-gray-800">
                            <span className="text-text-secondary">Unit</span>
                            <span className="text-text-primary">{code.unit}</span>
                          </div>
                          {code.gstRate && (
                            <div className="flex justify-between items-center py-2">
                              <span className="text-text-secondary">GST Rate</span>
                              <span className="text-warning font-semibold">{code.gstRate}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Common Products */}
                      <div className="bg-surface-light rounded-xl p-6">
                        <h3 className="text-lg font-semibold text-text-primary mb-4">
                          Common Products
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {code.commonProducts.map((product, idx) => (
                            <motion.span
                              key={product}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: idx * 0.05 }}
                              className="px-3 py-2 bg-surface rounded-lg text-sm text-text-primary"
                            >
                              {product}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Related Codes */}
                    <div className="bg-surface-light rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">
                        Related HS Codes
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {code.relatedCodes.map((relatedCode, idx) => (
                          <motion.div
                            key={relatedCode}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg hover:bg-primary/10 cursor-pointer transition-colors group"
                          >
                            <span className="font-mono font-semibold text-primary">
                              {relatedCode}
                            </span>
                            <ChevronRight className="w-4 h-4 text-text-tertiary group-hover:text-primary transition-colors" />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'analytics' && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Monthly Trend Chart */}
                    <div className="bg-surface-light rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-6">
                        Monthly Trade Value Trend
                      </h3>
                      <div className="h-64 flex items-end gap-2">
                        {code.monthlyTrend.map((month, idx) => {
                          const maxValue = Math.max(...code.monthlyTrend.map(m => m.value));
                          const height = (month.value / maxValue) * 100;
                          const prevMonth = code.monthlyTrend[idx - 1];
                          const isUp = prevMonth ? month.value >= prevMonth.value : true;

                          return (
                            <div key={month.month} className="flex-1 flex flex-col items-center group">
                              <div className="relative w-full flex justify-center mb-2">
                                <motion.div
                                  className={`w-full max-w-[40px] rounded-t-lg ${
                                    isUp
                                      ? 'bg-gradient-to-t from-success/80 to-success'
                                      : 'bg-gradient-to-t from-danger/80 to-danger'
                                  }`}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${height * 2}px` }}
                                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                                />
                                {/* Tooltip */}
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-surface px-3 py-2 rounded-lg shadow-lg z-10 whitespace-nowrap">
                                  <p className="text-sm font-semibold text-text-primary">
                                    ${formatCompactNumber(month.value)}
                                  </p>
                                  <p className="text-xs text-text-tertiary">
                                    {formatNumber(month.shipments)} shipments
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs text-text-tertiary">{month.month}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-surface-light rounded-xl p-6">
                        <h4 className="text-sm text-text-secondary mb-2">Average Shipment Value</h4>
                        <p className="text-3xl font-bold text-primary">
                          ${formatNumber(code.avgShipmentValue)}
                        </p>
                        <p className="text-sm text-text-tertiary mt-2">Per shipment</p>
                      </div>
                      <div className="bg-surface-light rounded-xl p-6">
                        <h4 className="text-sm text-text-secondary mb-2">Monthly Avg Shipments</h4>
                        <p className="text-3xl font-bold text-success">
                          {formatNumber(Math.round(code.totalShipments / 12))}
                        </p>
                        <p className="text-sm text-text-tertiary mt-2">Average per month</p>
                      </div>
                      <div className="bg-surface-light rounded-xl p-6">
                        <h4 className="text-sm text-text-secondary mb-2">Monthly Avg Value</h4>
                        <p className="text-3xl font-bold text-warning">
                          ${formatCompactNumber(Math.round(code.totalValue / 12))}
                        </p>
                        <p className="text-sm text-text-tertiary mt-2">Average per month</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeSection === 'trade' && (
                  <motion.div
                    key="trade"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-6"
                  >
                    {/* Top Countries */}
                    <div className="bg-surface-light rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-text-primary mb-4">
                        Top Trading Countries
                      </h3>
                      <div className="space-y-4">
                        {code.topCountries.map((country, idx) => (
                          <motion.div
                            key={country.country}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                                  {idx + 1}
                                </span>
                                <span className="font-medium text-text-primary">{country.country}</span>
                              </div>
                              <span className="font-semibold text-primary">{country.percentage}%</span>
                            </div>
                            <div className="h-2 bg-surface rounded-full overflow-hidden ml-11">
                              <motion.div
                                className="h-full bg-gradient-to-r from-primary to-success"
                                initial={{ width: 0 }}
                                animate={{ width: `${country.percentage}%` }}
                                transition={{ delay: idx * 0.1 + 0.2, duration: 0.5 }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Top Importers & Exporters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-surface-light rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <ArrowDownRight className="w-5 h-5 text-primary" />
                          <h3 className="text-lg font-semibold text-text-primary">Top Importers</h3>
                        </div>
                        <div className="space-y-3">
                          {code.topImporters.map((importer, idx) => (
                            <motion.div
                              key={importer}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-primary/5 transition-colors cursor-pointer"
                            >
                              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-text-primary">{importer}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-surface-light rounded-xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                          <ArrowUpRight className="w-5 h-5 text-success" />
                          <h3 className="text-lg font-semibold text-text-primary">Top Exporters</h3>
                        </div>
                        <div className="space-y-3">
                          {code.topExporters.map((exporter, idx) => (
                            <motion.div
                              key={exporter}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-center gap-3 p-3 bg-surface rounded-lg hover:bg-success/5 transition-colors cursor-pointer"
                            >
                              <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
                                <Building2 className="w-4 h-4 text-success" />
                              </div>
                              <span className="text-text-primary">{exporter}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-800 bg-surface-light/50">
              <div className="flex items-center gap-2 text-sm text-text-tertiary">
                <Calendar className="w-4 h-4" />
                Last updated: {formatDate(code.lastUpdated)}
              </div>
              <div className="flex items-center gap-3">
                <Button variant="secondary" onClick={onClose}>
                  Close
                </Button>
                <Button variant="primary">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
