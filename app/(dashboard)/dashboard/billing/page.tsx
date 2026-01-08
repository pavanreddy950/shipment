'use client';

import { motion } from 'framer-motion';
import { CreditCard, Download, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import Header from '@/components/dashboard/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { pricingPlans, mockUser, mockInvoices } from '@/lib/data/mock-data';
import { formatCurrency, formatDate, calculatePercentage } from '@/lib/utils';

export default function BillingPage() {
  const currentPlan = pricingPlans.find(p => p.id === mockUser.plan);
  const creditsUsedPercentage = calculatePercentage(mockUser.creditsUsed, mockUser.totalCredits);

  return (
    <div className="min-h-screen">
      <Header 
        title="Billing & Credits" 
        subtitle="Manage your subscription and monitor credit usage"
      />

      <div className="p-8 space-y-6">
        {/* Current Plan & Credits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-text-primary mb-2">
                    {currentPlan?.name} Plan
                  </h3>
                  <p className="text-text-secondary">
                    {formatCurrency(currentPlan?.price || 0)} / month
                  </p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Billing Cycle</span>
                  <span className="text-text-primary">Monthly</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Next Billing Date</span>
                  <span className="text-text-primary">February 1, 2024</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">Payment Method</span>
                  <span className="text-text-primary">•••• •••• •••• 4242</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="secondary">
                  Update Payment Method
                </Button>
                <Button variant="ghost">
                  Cancel Subscription
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Credits Usage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-text-primary">
                  Credits Usage
                </h3>
              </div>

              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-text-primary mb-2">
                  {mockUser.credits.toLocaleString()}
                </div>
                <p className="text-sm text-text-secondary">
                  of {mockUser.totalCredits.toLocaleString()} remaining
                </p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-3 bg-surface-light rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${creditsUsedPercentage}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
                <p className="text-xs text-text-tertiary mt-2 text-center">
                  {creditsUsedPercentage}% used this month
                </p>
              </div>

              <Button className="w-full">
                Buy More Credits
              </Button>
            </Card>
          </motion.div>
        </div>

        {/* Available Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              Upgrade Your Plan
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pricingPlans.map((plan) => {
                const isCurrent = plan.id === mockUser.plan;
                
                return (
                  <motion.div
                    key={plan.id}
                    whileHover={{ y: -4 }}
                    className={`p-6 rounded-lg border transition-all ${
                      isCurrent 
                        ? 'border-primary bg-primary/5' 
                        : 'border-gray-800 bg-surface-light'
                    }`}
                  >
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-text-primary mb-2">
                        {plan.name}
                      </h4>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-text-primary">
                          {formatCurrency(plan.price)}
                        </span>
                        <span className="text-text-secondary">/ {plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {plan.features.slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-text-secondary">
                          <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant={isCurrent ? 'secondary' : 'primary'}
                      className="w-full"
                      disabled={isCurrent}
                    >
                      {isCurrent ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Invoice History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">
                Invoice History
              </h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Invoice ID</th>
                    <th>Date</th>
                    <th>Plan</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockInvoices.map((invoice, index) => (
                    <motion.tr
                      key={invoice.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <td>
                        <span className="font-mono text-sm">{invoice.id}</span>
                      </td>
                      <td>{formatDate(invoice.date)}</td>
                      <td>{invoice.plan}</td>
                      <td className="font-semibold">{formatCurrency(invoice.amount)}</td>
                      <td>
                        <Badge
                          variant={
                            invoice.status === 'paid' ? 'success' :
                            invoice.status === 'pending' ? 'warning' : 'danger'
                          }
                        >
                          {invoice.status === 'paid' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {invoice.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {invoice.status === 'overdue' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {invoice.status}
                        </Badge>
                      </td>
                      <td>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Credit Usage Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              Credit Usage Breakdown
            </h3>

            <div className="space-y-4">
              {[
                { action: 'Contact Unlocks', credits: 450, percentage: 30 },
                { action: 'Company Profiles', credits: 350, percentage: 23 },
                { action: 'Data Exports', credits: 300, percentage: 20 },
                { action: 'AI Email Generation', credits: 250, percentage: 17 },
                { action: 'API Calls', credits: 150, percentage: 10 },
              ].map((item, index) => (
                <motion.div
                  key={item.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-text-primary">
                        {item.action}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {item.credits} credits
                      </span>
                    </div>
                    <div className="h-2 bg-surface-light rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
