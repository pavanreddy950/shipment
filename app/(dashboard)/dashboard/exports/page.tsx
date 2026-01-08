'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, CheckCircle, Clock, XCircle, FileSpreadsheet } from 'lucide-react';
import Header from '@/components/dashboard/Header';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Input from '@/components/ui/Input';
import { mockExportHistory } from '@/lib/data/mock-data';
import { formatDate } from '@/lib/utils';

export default function ExportsPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportName, setExportName] = useState('');
  const [exportType, setExportType] = useState<'csv' | 'excel' | 'pdf'>('csv');

  const handleExport = async () => {
    setIsExporting(true);
    setExportProgress(0);

    // Simulate export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExporting(false);
            setExportProgress(0);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5 text-success" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-danger" />;
      default:
        return <FileText className="w-5 h-5 text-primary" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        title="Exports & Downloads" 
        subtitle="Export data and manage your download history"
      />

      <div className="p-8 space-y-6">
        {/* New Export */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card>
            <h3 className="text-xl font-semibold text-text-primary mb-6">
              Create New Export
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Input
                  label="Export Name"
                  placeholder="e.g., Q4_2023_Companies"
                  value={exportName}
                  onChange={(e) => setExportName(e.target.value)}
                />

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Export Type
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['csv', 'excel', 'pdf'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setExportType(type as any)}
                        className={`p-4 rounded-lg border transition-all ${
                          exportType === type
                            ? 'border-primary bg-primary/10'
                            : 'border-gray-800 hover:border-gray-700'
                        }`}
                      >
                        <div className="text-center">
                          {getFileIcon(type)}
                          <p className="text-sm font-medium text-text-primary mt-2 uppercase">
                            {type}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Data Source
                  </label>
                  <select className="input">
                    <option>All Companies</option>
                    <option>Search Results</option>
                    <option>Saved Lists</option>
                    <option>Recent Shipments</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Date Range
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <input type="date" className="input" />
                    <input type="date" className="input" />
                  </div>
                </div>
              </div>

              <div className="bg-surface-light rounded-lg p-6">
                <h4 className="text-sm font-semibold text-text-primary mb-4">
                  Export Preview
                </h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Records:</span>
                    <span className="text-text-primary">~1,250</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Estimated Size:</span>
                    <span className="text-text-primary">~2.4 MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Format:</span>
                    <span className="text-text-primary uppercase">{exportType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Credits:</span>
                    <span className="text-warning">50 credits</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-800">
                  {isExporting ? (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-text-secondary">Exporting...</span>
                        <span className="text-sm font-semibold text-primary">{exportProgress}%</span>
                      </div>
                      <div className="h-2 bg-surface rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${exportProgress}%` }}
                          className="h-full bg-primary"
                        />
                      </div>
                    </div>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={handleExport}
                      disabled={!exportName}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Export History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-text-primary">
                Export History
              </h3>
              <Button variant="ghost" size="sm">
                Clear History
              </Button>
            </div>

            <div className="space-y-3">
              {mockExportHistory.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 bg-surface-light rounded-lg hover:bg-opacity-80 transition-all"
                >
                  <div className="flex-shrink-0">
                    {getFileIcon(item.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary truncate">
                      {item.name}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-text-secondary mt-1">
                      <span>{item.records.toLocaleString()} records</span>
                      <span>•</span>
                      <span>{item.size}</span>
                      <span>•</span>
                      <span>{formatDate(item.date)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge
                      variant={
                        item.status === 'completed' ? 'success' :
                        item.status === 'processing' ? 'warning' : 'danger'
                      }
                    >
                      {getStatusIcon(item.status)}
                      <span className="ml-1">{item.status}</span>
                    </Badge>

                    {item.status === 'completed' && (
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Export Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center">
              <p className="text-text-secondary text-sm mb-2">Total Exports</p>
              <p className="text-3xl font-bold text-text-primary">{mockExportHistory.length}</p>
            </Card>
            <Card className="text-center">
              <p className="text-text-secondary text-sm mb-2">This Month</p>
              <p className="text-3xl font-bold text-text-primary">3</p>
            </Card>
            <Card className="text-center">
              <p className="text-text-secondary text-sm mb-2">Total Records</p>
              <p className="text-3xl font-bold text-text-primary">8.1K</p>
            </Card>
            <Card className="text-center">
              <p className="text-text-secondary text-sm mb-2">Data Size</p>
              <p className="text-3xl font-bold text-text-primary">21.8 MB</p>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
