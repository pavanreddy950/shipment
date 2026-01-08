'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Users, Globe2, Coins, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Header from '@/components/dashboard/Header';
import StatCard from '@/components/ui/StatCard';
import Card from '@/components/ui/Card';
import LineChart from '@/components/charts/LineChart';
import BarChart from '@/components/charts/BarChart';
import PieChart from '@/components/charts/PieChart';
import { generateChartData, mockUser, mockShipments, mockCompanies } from '@/lib/data/mock-data';
import { formatNumber, formatDate } from '@/lib/utils';

export default function DashboardPage() {
  const chartData = generateChartData();

  // Calculate stats
  const totalShipments = mockShipments.length;
  const activeCompanies = mockCompanies.filter(c => c.verified).length;
  const countriesCovered = new Set(mockCompanies.map(c => c.country)).size;
  const creditsRemaining = mockUser.credits;

  // Recent shipments
  const recentShipments = mockShipments.slice(0, 10);

  return (
    <div className="min-h-screen">
      <Header 
        title="Dashboard" 
        subtitle="Welcome back! Here's what's happening with your trade intelligence."
      />

      <div className="p-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Shipments"
            value={totalShipments}
            icon={TrendingUp}
            compact
            trend={{ value: 12.5, isPositive: true }}
            delay={0}
          />
          <StatCard
            title="Active Companies"
            value={activeCompanies}
            icon={Users}
            compact
            trend={{ value: 8.2, isPositive: true }}
            delay={0.1}
          />
          <StatCard
            title="Countries Covered"
            value={countriesCovered}
            icon={Globe2}
            delay={0.2}
          />
          <StatCard
            title="Credits Remaining"
            value={creditsRemaining}
            icon={Coins}
            compact
            delay={0.3}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Shipment Volume Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-6">
                Shipment Volume Trend
              </h3>
              <div className="h-80">
                <LineChart data={chartData.shipmentVolume} color="#3b82f6" />
              </div>
            </Card>
          </motion.div>

          {/* Top Countries Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-6">
                Top Importing Countries
              </h3>
              <div className="h-80">
                <BarChart data={chartData.topCountries} color="#8b5cf6" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Second Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-6">
                Product Categories
              </h3>
              <div className="h-80">
                <PieChart data={chartData.productCategories} />
              </div>
            </Card>
          </motion.div>

          {/* Recent Shipments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-text-primary">
                  Recent Shipments
                </h3>
                <a href="/dashboard/search" className="text-sm text-primary hover:text-primary-dark">
                  View All →
                </a>
              </div>
              <div className="space-y-4">
                {recentShipments.map((shipment, index) => (
                  <motion.div
                    key={shipment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-surface-light rounded-lg hover:bg-opacity-80 transition-all cursor-pointer"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-text-primary mb-1">
                        {shipment.companyName}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {shipment.productDescription} • {shipment.hsCode}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-sm font-medium text-success mb-1">
                        <ArrowUpRight className="w-4 h-4" />
                        ${formatNumber(shipment.value)}
                      </div>
                      <p className="text-xs text-text-tertiary">
                        {formatDate(shipment.date)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Activity Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              Trade Value Overview
            </h3>
            <div className="h-80">
              <LineChart data={chartData.tradeValue} color="#06b6d4" />
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
