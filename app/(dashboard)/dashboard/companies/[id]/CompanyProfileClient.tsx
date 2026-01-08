'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Building2,
  MapPin,
  Calendar,
  TrendingUp,
  Mail,
  Phone,
  Unlock,
  ExternalLink,
  CheckCircle
} from 'lucide-react';
import Header from '@/components/dashboard/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import LineChart from '@/components/charts/LineChart';
import {
  getCompanyById,
  getShipmentsByCompany,
  getContactsByCompany,
  mockUser
} from '@/lib/data/mock-data';
import { formatNumber, formatDate, formatCurrency } from '@/lib/utils';

interface CompanyProfileClientProps {
  companyId: string;
}

export default function CompanyProfileClient({ companyId }: CompanyProfileClientProps) {
  const company = getCompanyById(companyId);
  const shipments = getShipmentsByCompany(companyId);
  const contacts = getContactsByCompany(companyId);

  const [unlockedContacts, setUnlockedContacts] = useState<Set<string>>(new Set());
  const [isUnlocking, setIsUnlocking] = useState<string | null>(null);

  if (!company) {
    return (
      <div className="min-h-screen">
        <Header title="Company Not Found" />
        <div className="p-8 text-center">
          <p className="text-text-secondary">Company not found</p>
        </div>
      </div>
    );
  }

  const handleUnlockContact = async (contactId: string) => {
    setIsUnlocking(contactId);

    // Simulate credit deduction and unlock
    await new Promise(resolve => setTimeout(resolve, 1000));

    setUnlockedContacts(new Set([...unlockedContacts, contactId]));
    setIsUnlocking(null);
  };

  // Generate chart data for shipments over time
  const shipmentChartData = shipments
    .slice(0, 12)
    .reverse()
    .map(s => ({
      label: formatDate(s.date).split(',')[0],
      value: s.value,
    }));

  return (
    <div className="min-h-screen">
      <Header
        title={company.name}
        subtitle={`${company.type} • ${company.country}`}
      />

      <div className="p-8 space-y-6">
        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2"
          >
            <Card>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-2xl font-bold text-text-primary">{company.name}</h2>
                    {company.verified && (
                      <Badge variant="success">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {company.city}, {company.country}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Est. {company.establishedYear}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      {company.industry}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-800">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Total Shipments</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {formatNumber(company.shipmentCount)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Total Volume</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {formatNumber(company.totalVolume)} T
                  </p>
                </div>
                <div>
                  <p className="text-sm text-text-secondary mb-1">Last Shipment</p>
                  <p className="text-2xl font-bold text-text-primary">
                    {formatDate(company.lastShipmentDate).split(',')[0]}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full">
                  <Mail className="w-4 h-4 mr-2" />
                  Generate Email
                </Button>
                <Button variant="secondary" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visit Website
                </Button>
                <Button variant="secondary" className="w-full">
                  Export Data
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Shipment History Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-text-primary mb-6">
              Shipment Value History
            </h3>
            <div className="h-80">
              <LineChart data={shipmentChartData} color="#10b981" />
            </div>
          </Card>
        </motion.div>

        {/* Recent Shipments & Contacts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Shipments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <h3 className="text-lg font-semibold text-text-primary mb-4">
                Recent Shipments
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {shipments.slice(0, 10).map((shipment) => (
                  <div
                    key={shipment.id}
                    className="p-4 bg-surface-light rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-medium text-text-primary">
                        {shipment.productDescription}
                      </p>
                      <Badge variant={shipment.shipmentType === 'export' ? 'success' : 'primary'}>
                        {shipment.shipmentType}
                      </Badge>
                    </div>
                    <p className="text-sm text-text-secondary mb-2">
                      {shipment.origin} → {shipment.destination}
                    </p>
                    <div className="flex justify-between text-sm">
                      <span className="text-text-tertiary">
                        HS: {shipment.hsCode}
                      </span>
                      <span className="font-medium text-success">
                        {formatCurrency(shipment.value)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">
                  Decision Makers
                </h3>
                <Badge variant="warning">
                  {mockUser.credits} credits
                </Badge>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {contacts.map((contact) => {
                  const isUnlocked = unlockedContacts.has(contact.id) || !contact.locked;
                  const isLoading = isUnlocking === contact.id;

                  return (
                    <div
                      key={contact.id}
                      className="p-4 bg-surface-light rounded-lg"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-medium text-text-primary mb-1">
                            {contact.name}
                          </p>
                          <p className="text-sm text-text-secondary">
                            {contact.role}
                          </p>
                        </div>
                        {contact.verified && (
                          <Badge variant="success" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-text-tertiary" />
                          {isUnlocked ? (
                            <a href={`mailto:${contact.email}`} className="text-primary hover:underline">
                              {contact.email}
                            </a>
                          ) : (
                            <span className="text-text-tertiary">••••••@••••.com</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-text-tertiary" />
                          {isUnlocked ? (
                            <span className="text-text-secondary">{contact.phone}</span>
                          ) : (
                            <span className="text-text-tertiary">+•• ••• •••••••</span>
                          )}
                        </div>
                      </div>

                      {!isUnlocked && (
                        <Button
                          size="sm"
                          className="w-full mt-3"
                          loading={isLoading}
                          onClick={() => handleUnlockContact(contact.id)}
                        >
                          <Unlock className="w-4 h-4 mr-2" />
                          Unlock (10 credits)
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
