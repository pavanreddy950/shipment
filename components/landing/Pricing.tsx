'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { pricingPlans } from '@/lib/data/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function Pricing() {
  return (
    <section className="py-24 relative" id="pricing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Choose the perfect plan for your business. All plans include a 14-day free trial.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.id} plan={plan} index={index} />
          ))}
        </div>

        {/* Enterprise contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary">
            Need a custom plan?{' '}
            <Link href="/contact" className="text-primary hover:text-primary-dark underline">
              Contact our sales team
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PricingCard({ plan, index }: { plan: typeof pricingPlans[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative p-8 bg-surface rounded-xl border transition-all duration-300 ${
        plan.popular
          ? 'border-primary shadow-lg shadow-primary/20'
          : 'border-gray-800 hover:border-gray-700'
      }`}
    >
      {/* Popular badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Plan name */}
      <h3 className="text-2xl font-bold text-text-primary mb-2">{plan.name}</h3>

      {/* Price */}
      <div className="mb-6">
        <span className="text-5xl font-bold text-text-primary">
          {formatCurrency(plan.price)}
        </span>
        <span className="text-text-secondary ml-2">/ {plan.period}</span>
      </div>

      {/* Credits */}
      <p className="text-text-secondary mb-6">
        {plan.credits.toLocaleString()} credits per month
      </p>

      {/* CTA Button */}
      <Link href="/auth/signup">
        <Button
          variant={plan.popular ? 'primary' : 'secondary'}
          className="w-full mb-8"
        >
          Start Free Trial
        </Button>
      </Link>

      {/* Features */}
      <ul className="space-y-4">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <div className="mt-0.5">
              <Check className="w-5 h-5 text-success" />
            </div>
            <span className="text-text-secondary text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
