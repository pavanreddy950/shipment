'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Building2, MapPin, TrendingUp, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/dashboard/Header';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { TableSkeleton } from '@/components/ui/Skeleton';
import { searchCompanies, mockCompanies } from '@/lib/data/mock-data';
import { formatNumber, formatDate, debounce } from '@/lib/utils';

const ITEMS_PER_PAGE = 25;

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    country: '',
    minShipments: undefined as number | undefined,
    type: 'all',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Get unique countries for filter
  const countries = useMemo(() => {
    const uniqueCountries = new Set(mockCompanies.map(c => c.country));
    return Array.from(uniqueCountries).sort();
  }, []);

  // Search and filter results
  const filteredResults = useMemo(() => {
    setIsLoading(true);
    const results = searchCompanies(searchQuery, filters);
    setTimeout(() => setIsLoading(false), 300); // Simulate loading
    return results;
  }, [searchQuery, filters]);

  // Paginate results
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResults.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredResults, currentPage]);

  const totalPages = Math.ceil(filteredResults.length / ITEMS_PER_PAGE);

  const handleSearch = debounce((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, 300);

  return (
    <div className="min-h-screen">
      <Header 
        title="Search & Discovery" 
        subtitle="Find global buyers and suppliers from our database of 5,000+ companies"
      />

      <div className="p-8 space-y-6">
        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card space-y-4"
        >
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1">
              <Input
                icon={Search}
                placeholder="Search companies, products, HS codes..."
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            <Button variant="secondary">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filters Row */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Country
              </label>
              <select
                className="input"
                value={filters.country}
                onChange={(e) => {
                  setFilters({ ...filters, country: e.target.value });
                  setCurrentPage(1);
                }}
              >
                <option value="">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Company Type
              </label>
              <select
                className="input"
                value={filters.type}
                onChange={(e) => {
                  setFilters({ ...filters, type: e.target.value });
                  setCurrentPage(1);
                }}
              >
                <option value="all">All Types</option>
                <option value="importer">Importer</option>
                <option value="exporter">Exporter</option>
                <option value="both">Both</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Min Shipments
              </label>
              <input
                type="number"
                className="input"
                placeholder="0"
                onChange={(e) => {
                  setFilters({ 
                    ...filters, 
                    minShipments: e.target.value ? parseInt(e.target.value) : undefined 
                  });
                  setCurrentPage(1);
                }}
              />
            </div>

            <div className="flex items-end">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  setFilters({ country: '', minShipments: undefined, type: 'all' });
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-800">
            <p className="text-sm text-text-secondary">
              Found <strong className="text-text-primary">{formatNumber(filteredResults.length)}</strong> companies
            </p>
            <Button size="sm">
              Export Results
            </Button>
          </div>
        </motion.div>

        {/* Results Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          {isLoading ? (
            <TableSkeleton rows={10} />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Country</th>
                      <th>Type</th>
                      <th>Shipments</th>
                      <th>Volume (tonnes)</th>
                      <th>Last Shipment</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence mode="wait">
                      {paginatedResults.map((company, index) => (
                        <motion.tr
                          key={company.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ delay: index * 0.03 }}
                        >
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <Building2 className="w-5 h-5 text-primary" />
                              </div>
                              <div>
                                <p className="font-medium text-text-primary">{company.name}</p>
                                <p className="text-sm text-text-tertiary">{company.industry}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-text-tertiary" />
                              <span>{company.country}</span>
                            </div>
                          </td>
                          <td>
                            <Badge 
                              variant={
                                company.type === 'both' ? 'primary' : 
                                company.type === 'exporter' ? 'success' : 'secondary'
                              }
                            >
                              {company.type}
                            </Badge>
                          </td>
                          <td>
                            <div className="flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-success" />
                              <span>{formatNumber(company.shipmentCount)}</span>
                            </div>
                          </td>
                          <td>{formatNumber(company.totalVolume)}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-text-tertiary" />
                              <span>{formatDate(company.lastShipmentDate)}</span>
                            </div>
                          </td>
                          <td>
                            <Link href={`/dashboard/companies/${company.id}`}>
                              <Button size="sm" variant="ghost">
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            </Link>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-800">
                  <p className="text-sm text-text-secondary">
                    Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{' '}
                    {Math.min(currentPage * ITEMS_PER_PAGE, filteredResults.length)} of{' '}
                    {formatNumber(filteredResults.length)} results
                  </p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1;
                      return (
                        <Button
                          key={page}
                          size="sm"
                          variant={currentPage === page ? 'primary' : 'secondary'}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    {totalPages > 5 && <span className="px-3 py-2 text-text-secondary">...</span>}
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
