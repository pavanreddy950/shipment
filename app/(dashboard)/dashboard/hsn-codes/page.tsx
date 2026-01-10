'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Package,
  Layers,
  TrendingUp,
  BarChart3,
  Filter,
  ChevronRight,
  Globe,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  X,
  BookOpen,
  Tag,
  Hash,
  FileText,
  Download,
  Copy,
  ExternalLink,
  Check
} from 'lucide-react';
import Header from '@/components/dashboard/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import StatCard from '@/components/ui/StatCard';
import {
  hsnSections,
  hsnChapters,
  hsnCodeDetails,
  searchHSNCodes,
  getHSNCodeByCode,
  getHSNAnalytics,
  getHSNCategories,
  getHSNCategoryStats
} from '@/lib/data/hsn-mock-data';
import { formatNumber, formatCurrency, formatCompactNumber } from '@/lib/utils';
import { HSNCodeDetail, HSNSearchResult } from '@/types';
import HSNCodeDetailModal from './HSNCodeDetailModal';

const ITEMS_PER_PAGE = 20;

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const tabVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
};

export default function HSNCodesPage() {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState<'browse' | 'sections' | 'analytics'>('browse');
  const [selectedCode, setSelectedCode] = useState<HSNCodeDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Get unique categories and analytics
  const categories = useMemo(() => getHSNCategories(), []);
  const analytics = useMemo(() => getHSNAnalytics(), []);
  const categoryStats = useMemo(() => getHSNCategoryStats(), []);

  // Search results
  const searchResults = useMemo(() => {
    if (searchQuery.length >= 2) {
      return searchHSNCodes(searchQuery, 100);
    }
    return [];
  }, [searchQuery]);

  // Filtered codes
  const filteredCodes = useMemo(() => {
    let codes = [...hsnCodeDetails];

    if (selectedCategory) {
      codes = codes.filter(c => c.category === selectedCategory);
    }

    if (selectedChapter) {
      codes = codes.filter(c => c.chapter === selectedChapter);
    }

    return codes;
  }, [selectedCategory, selectedChapter]);

  // Paginated results
  const paginatedCodes = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredCodes.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredCodes, currentPage]);

  const totalPages = Math.ceil(filteredCodes.length / ITEMS_PER_PAGE);

  // Handlers
  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
    setSelectedChapter('');
    setCurrentPage(1);
  }, []);

  const handleChapterChange = useCallback((chapter: string) => {
    setSelectedChapter(chapter);
    setCurrentPage(1);
  }, []);

  const handleViewCode = useCallback((code: HSNCodeDetail) => {
    setSelectedCode(code);
    setIsModalOpen(true);
  }, []);

  const handleCopyCode = useCallback((code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedChapter('');
    setCurrentPage(1);
  }, []);

  // Get chapters for selected section/category
  const availableChapters = useMemo(() => {
    if (!selectedCategory) return hsnChapters;
    const categoryCodes = hsnCodeDetails.filter(c => c.category === selectedCategory);
    const chapterNumbers = new Set(categoryCodes.map(c => c.chapter));
    return hsnChapters.filter(ch => chapterNumbers.has(ch.chapterNumber));
  }, [selectedCategory]);

  return (
    <div className="min-h-screen">
      <Header
        title="HSN Code Library"
        subtitle="Browse and search Harmonized System codes for international trade classification"
      />

      <div className="p-8 space-y-6">
        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <StatCard
              title="Total HS Codes"
              value={formatNumber(analytics.totalCodes)}
              icon={Package}
              trend={{ value: 12, isPositive: true }}
              delay={0}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              title="Sections"
              value={analytics.totalSections}
              icon={Layers}
              delay={0.1}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              title="Chapters"
              value={analytics.totalChapters}
              icon={BookOpen}
              delay={0.2}
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatCard
              title="Categories"
              value={categories.length}
              icon={Tag}
              delay={0.3}
            />
          </motion.div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <div className="flex flex-wrap gap-2 mb-6">
              {[
                { id: 'browse', label: 'Browse Codes', icon: Search },
                { id: 'sections', label: 'Sections & Chapters', icon: Layers },
                { id: 'analytics', label: 'Analytics', icon: BarChart3 }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                >
                  <tab.icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </Button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'browse' && (
                <motion.div
                  key="browse"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Search & Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <Input
                        icon={Search}
                        placeholder="Search by code or description..."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                      />
                    </div>
                    <div>
                      <select
                        className="input w-full"
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                      >
                        <option value="">All Categories</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        className="input w-full"
                        value={selectedChapter}
                        onChange={(e) => handleChapterChange(e.target.value)}
                      >
                        <option value="">All Chapters</option>
                        {availableChapters.map(ch => (
                          <option key={ch.id} value={ch.chapterNumber}>
                            Chapter {ch.chapterNumber} - {ch.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Active Filters */}
                  {(selectedCategory || selectedChapter || searchQuery) && (
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm text-text-secondary">Active filters:</span>
                      {searchQuery && (
                        <Badge variant="primary">
                          Search: "{searchQuery}"
                          <button
                            onClick={() => setSearchQuery('')}
                            className="ml-2 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {selectedCategory && (
                        <Badge variant="success">
                          {selectedCategory}
                          <button
                            onClick={() => setSelectedCategory('')}
                            className="ml-2 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      {selectedChapter && (
                        <Badge variant="warning">
                          Chapter {selectedChapter}
                          <button
                            onClick={() => setSelectedChapter('')}
                            className="ml-2 hover:text-white"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" onClick={clearFilters}>
                        Clear All
                      </Button>
                    </div>
                  )}

                  {/* Search Results */}
                  {searchQuery.length >= 2 && searchResults.length > 0 && (
                    <div className="bg-surface-light rounded-lg p-4 max-h-64 overflow-y-auto">
                      <h4 className="text-sm font-medium text-text-secondary mb-3">
                        Search Results ({searchResults.length})
                      </h4>
                      <div className="space-y-2">
                        {searchResults.slice(0, 10).map((result) => {
                          const fullCode = getHSNCodeByCode(result.code);
                          return (
                            <motion.div
                              key={result.code}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-opacity-80 cursor-pointer transition-colors"
                              onClick={() => fullCode && handleViewCode(fullCode)}
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-mono font-semibold text-primary">
                                  {result.code}
                                </span>
                                <span className="text-text-primary">
                                  {result.description}
                                </span>
                                <Badge variant="secondary" className="text-xs">
                                  {result.category}
                                </Badge>
                              </div>
                              <ChevronRight className="w-4 h-4 text-text-tertiary" />
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Results Count */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-text-secondary">
                      Showing {paginatedCodes.length} of {filteredCodes.length} codes
                    </p>
                  </div>

                  {/* Codes Grid */}
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {paginatedCodes.map((code, idx) => (
                      <motion.div
                        key={code.id}
                        variants={itemVariants}
                        transition={{ delay: idx * 0.03 }}
                        className="bg-surface-light rounded-xl p-5 hover:bg-opacity-80 transition-all cursor-pointer group"
                        onClick={() => handleViewCode(code)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Hash className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-bold text-lg text-primary">
                                  {code.fullCode}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleCopyCode(code.code);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  {copiedCode === code.code ? (
                                    <Check className="w-4 h-4 text-success" />
                                  ) : (
                                    <Copy className="w-4 h-4 text-text-tertiary hover:text-primary" />
                                  )}
                                </button>
                              </div>
                              <p className="text-sm text-text-secondary">
                                Chapter {code.chapter} | {code.section}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary">{code.category}</Badge>
                        </div>

                        <p className="text-text-primary mb-4 line-clamp-2">
                          {code.description}
                        </p>

                        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                          <div>
                            <p className="text-xs text-text-tertiary mb-1">Shipments</p>
                            <p className="font-semibold text-text-primary">
                              {formatCompactNumber(code.totalShipments)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-text-tertiary mb-1">Total Value</p>
                            <p className="font-semibold text-success">
                              ${formatCompactNumber(code.totalValue)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-text-tertiary mb-1">Duty Rate</p>
                            <p className="font-semibold text-warning">
                              {code.dutyRate}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                          <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-text-tertiary" />
                            <span className="text-sm text-text-secondary">
                              {code.topCountries.slice(0, 2).map(c => c.country).join(', ')}
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-text-tertiary group-hover:text-primary transition-colors" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-6">
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(p => p - 1)}
                      >
                        Previous
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? 'primary' : 'ghost'}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(p => p + 1)}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === 'sections' && (
                <motion.div
                  key="sections"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="text-lg font-semibold text-text-primary">
                    21 Sections of the Harmonized System
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hsnSections.map((section, idx) => (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-surface-light rounded-xl p-5 hover:bg-opacity-80 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <span className="text-lg font-bold text-primary">{section.number}</span>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-text-primary mb-1 group-hover:text-primary transition-colors">
                              {section.title}
                            </h4>
                            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                              {section.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-text-tertiary">
                                Chapters: <span className="text-text-primary">{section.chaptersRange}</span>
                              </span>
                              <span className="text-text-tertiary">
                                Codes: <span className="text-primary font-medium">{formatNumber(section.totalCodes)}</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'analytics' && (
                <motion.div
                  key="analytics"
                  variants={tabVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  {/* Top Categories by Value */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Top Categories by Trade Value
                    </h3>
                    <div className="space-y-3">
                      {categoryStats.slice(0, 8).map((stat, idx) => (
                        <motion.div
                          key={stat.category}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-surface-light rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-sm font-bold text-primary">
                                {idx + 1}
                              </span>
                              <span className="font-medium text-text-primary">{stat.category}</span>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-success">
                                ${formatCompactNumber(stat.totalValue)}
                              </p>
                              <p className="text-xs text-text-tertiary">{stat.count} codes</p>
                            </div>
                          </div>
                          <div className="h-2 bg-surface rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-primary to-success"
                              initial={{ width: 0 }}
                              animate={{ width: `${(stat.totalValue / categoryStats[0].totalValue) * 100}%` }}
                              transition={{ delay: idx * 0.05 + 0.2, duration: 0.5 }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Top Used HS Codes */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Most Used HS Codes
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {analytics.topUsedCodes.slice(0, 6).map((code, idx) => {
                        const fullCode = getHSNCodeByCode(code.code);
                        return (
                          <motion.div
                            key={code.code}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-surface-light rounded-lg p-4 hover:bg-opacity-80 cursor-pointer transition-all"
                            onClick={() => fullCode && handleViewCode(fullCode)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <span className="font-mono font-bold text-primary">{code.code}</span>
                                <p className="text-sm text-text-secondary mt-1 line-clamp-1">
                                  {code.description}
                                </p>
                              </div>
                              <Badge variant={idx < 3 ? 'success' : 'secondary'}>
                                #{idx + 1}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-800">
                              <div className="flex items-center gap-1">
                                <TrendingUp className="w-4 h-4 text-success" />
                                <span className="text-sm text-text-primary">
                                  {formatCompactNumber(code.shipments)} shipments
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-warning" />
                                <span className="text-sm text-text-primary">
                                  ${formatCompactNumber(code.value)}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Monthly Usage Trend */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-4">
                      Monthly Usage Trend
                    </h3>
                    <div className="bg-surface-light rounded-lg p-6">
                      <div className="flex items-end justify-between h-48 gap-2">
                        {analytics.monthlyUsage.map((month, idx) => {
                          const maxSearches = Math.max(...analytics.monthlyUsage.map(m => m.searches));
                          const height = (month.searches / maxSearches) * 100;
                          return (
                            <div key={month.month} className="flex-1 flex flex-col items-center">
                              <motion.div
                                className="w-full bg-gradient-to-t from-primary to-primary-light rounded-t-md"
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                transition={{ delay: idx * 0.05, duration: 0.5 }}
                              />
                              <span className="text-xs text-text-tertiary mt-2">{month.month}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-800">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-primary rounded-full" />
                          <span className="text-sm text-text-secondary">Code Searches</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>

      {/* Detail Modal */}
      {selectedCode && (
        <HSNCodeDetailModal
          code={selectedCode}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCode(null);
          }}
        />
      )}
    </div>
  );
}
