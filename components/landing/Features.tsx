'use client';

import { motion } from 'framer-motion';
import { 
  Search, 
  Database, 
  Mail, 
  BarChart3, 
  Globe2, 
  Shield,
  Zap,
  Users2,
  FileText
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Advanced Search',
    description: 'Find buyers and suppliers with powerful filters including HS codes, countries, and shipment volumes.',
  },
  {
    icon: Database,
    title: 'Massive Dataset',
    description: '12M+ shipment records from 195 countries, updated daily with the latest trade intelligence.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Interactive charts and insights to understand market trends and identify opportunities.',
  },
  {
    icon: Mail,
    title: 'AI Email Generator',
    description: 'Generate personalized outreach emails with AI based on company profiles and trade data.',
  },
  {
    icon: Users2,
    title: 'Verified Contacts',
    description: 'Access decision-maker contacts with verified emails and phone numbers.',
  },
  {
    icon: Globe2,
    title: 'Global Coverage',
    description: 'Track shipments across major ports and trade routes worldwide in real-time.',
  },
  {
    icon: FileText,
    title: 'Export Reports',
    description: 'Download custom reports in CSV, Excel, or PDF formats for offline analysis.',
  },
  {
    icon: Shield,
    title: 'Secure & Compliant',
    description: 'Enterprise-grade security with SOC 2 compliance and data encryption.',
  },
  {
    icon: Zap,
    title: 'Fast & Reliable',
    description: 'Lightning-fast search with 99.9% uptime SLA and dedicated support.',
  },
];

export default function Features() {
  return (
    <section className="py-24 relative" id="features">
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
            Everything You Need to
            <span className="gradient-text"> Dominate Global Trade</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Powerful features designed for exporters, importers, and trade professionals
            to discover opportunities and grow their business.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group p-8 bg-surface rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300"
    >
      <div className="mb-4">
        <div className="inline-flex p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
          <feature.icon className="w-6 h-6 text-primary" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-3">
        {feature.title}
      </h3>
      <p className="text-text-secondary leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
}
