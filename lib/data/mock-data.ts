// Central mock data store with large realistic datasets

import { 
  Company, 
  Shipment, 
  Contact, 
  User, 
  PricingPlan, 
  Invoice, 
  ExportHistory,
  TeamMember,
  APIKey,
  ChartData 
} from '@/types';
import { generateCompanies, generateShipments, generateContacts, hsCodes } from './mock-generator';

// Generate large datasets
export const mockCompanies: Company[] = generateCompanies(5000);
export const mockShipments: Shipment[] = generateShipments(mockCompanies, 12000);
export const mockContacts: Contact[] = generateContacts(mockCompanies.slice(0, 2000), 3);

// Current user
export const mockUser: User = {
  id: 'user-1',
  name: 'John Mitchell',
  email: 'john.mitchell@company.com',
  company: 'Global Trade Solutions',
  plan: 'pro',
  credits: 2500,
  creditsUsed: 1500,
  totalCredits: 4000,
  joinedDate: '2023-06-15T00:00:00Z',
};

// Pricing plans
export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 299,
    currency: 'USD',
    period: 'month',
    credits: 1000,
    features: [
      '1,000 monthly credits',
      'Basic shipment data',
      'Company profiles',
      'Export to CSV',
      'Email support',
      '1 user account',
    ],
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 799,
    currency: 'USD',
    period: 'month',
    credits: 5000,
    popular: true,
    features: [
      '5,000 monthly credits',
      'Advanced analytics',
      'Contact database access',
      'AI email generator',
      'Priority support',
      'Up to 5 users',
      'API access',
      'Custom reports',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 2499,
    currency: 'USD',
    period: 'month',
    credits: 25000,
    features: [
      '25,000+ monthly credits',
      'Unlimited users',
      'Dedicated account manager',
      'Custom integrations',
      'White-label options',
      'SLA guarantee',
      'Advanced API access',
      'Training & onboarding',
      'Custom data requests',
    ],
  },
];

// Mock invoices
export const mockInvoices: Invoice[] = [
  {
    id: 'inv-2024-001',
    date: '2024-01-01T00:00:00Z',
    amount: 799,
    status: 'paid',
    plan: 'Professional',
    credits: 5000,
  },
  {
    id: 'inv-2023-012',
    date: '2023-12-01T00:00:00Z',
    amount: 799,
    status: 'paid',
    plan: 'Professional',
    credits: 5000,
  },
  {
    id: 'inv-2023-011',
    date: '2023-11-01T00:00:00Z',
    amount: 799,
    status: 'paid',
    plan: 'Professional',
    credits: 5000,
  },
  {
    id: 'inv-2023-010',
    date: '2023-10-01T00:00:00Z',
    amount: 299,
    status: 'paid',
    plan: 'Starter',
    credits: 1000,
  },
];

// Export history
export const mockExportHistory: ExportHistory[] = [
  {
    id: 'exp-1',
    name: 'Textile_Companies_Export_2024',
    type: 'csv',
    records: 1250,
    date: '2024-01-05T14:30:00Z',
    size: '2.4 MB',
    status: 'completed',
  },
  {
    id: 'exp-2',
    name: 'Electronics_Shipments_Q4_2023',
    type: 'excel',
    records: 3420,
    date: '2023-12-28T10:15:00Z',
    size: '5.8 MB',
    status: 'completed',
  },
  {
    id: 'exp-3',
    name: 'Buyer_Contacts_December',
    type: 'csv',
    records: 890,
    date: '2023-12-20T16:45:00Z',
    size: '1.2 MB',
    status: 'completed',
  },
  {
    id: 'exp-4',
    name: 'Automotive_Trade_Report',
    type: 'pdf',
    records: 540,
    date: '2023-12-15T09:20:00Z',
    size: '8.3 MB',
    status: 'completed',
  },
  {
    id: 'exp-5',
    name: 'Asia_Pacific_Analysis',
    type: 'excel',
    records: 2100,
    date: '2023-12-10T13:00:00Z',
    size: '4.1 MB',
    status: 'completed',
  },
];

// Team members
export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'John Mitchell',
    email: 'john.mitchell@company.com',
    role: 'Admin',
    status: 'active',
    joinedDate: '2023-06-15T00:00:00Z',
  },
  {
    id: 'team-2',
    name: 'Sarah Connor',
    email: 'sarah.connor@company.com',
    role: 'Manager',
    status: 'active',
    joinedDate: '2023-07-20T00:00:00Z',
  },
  {
    id: 'team-3',
    name: 'Mike Johnson',
    email: 'mike.johnson@company.com',
    role: 'Analyst',
    status: 'active',
    joinedDate: '2023-08-10T00:00:00Z',
  },
  {
    id: 'team-4',
    name: 'Emma Davis',
    email: 'emma.davis@company.com',
    role: 'Analyst',
    status: 'active',
    joinedDate: '2023-09-05T00:00:00Z',
  },
];

// API Keys
export const mockAPIKeys: APIKey[] = [
  {
    id: 'key-1',
    name: 'Production API Key',
    key: 'tk_live_8Kx9mP2nQ4rT6vY8zA1bC3dE5fG7hJ9k',
    createdDate: '2023-06-15T00:00:00Z',
    lastUsed: '2024-01-07T15:30:00Z',
    requests: 15420,
  },
  {
    id: 'key-2',
    name: 'Development API Key',
    key: 'tk_test_1aB2cD3eF4gH5iJ6kL7mN8oP9qR0sT',
    createdDate: '2023-08-20T00:00:00Z',
    lastUsed: '2024-01-06T10:15:00Z',
    requests: 3890,
  },
];

// Chart data for dashboard
export const generateChartData = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  // Shipment volume over time
  const shipmentVolumeData: ChartData[] = months.map((month, index) => ({
    label: month,
    value: 15000 + Math.random() * 10000 + index * 1000,
    date: `2024-${String(index + 1).padStart(2, '0')}-01`,
  }));

  // Top countries
  const topCountriesData: ChartData[] = [
    { label: 'China', value: 125000 },
    { label: 'United States', value: 98000 },
    { label: 'Germany', value: 76000 },
    { label: 'India', value: 65000 },
    { label: 'Japan', value: 54000 },
    { label: 'United Kingdom', value: 43000 },
    { label: 'France', value: 38000 },
    { label: 'South Korea', value: 32000 },
  ];

  // Product categories
  const productCategoriesData: ChartData[] = [
    { label: 'Electronics', value: 28 },
    { label: 'Textiles', value: 22 },
    { label: 'Machinery', value: 18 },
    { label: 'Chemicals', value: 12 },
    { label: 'Automotive', value: 10 },
    { label: 'Food & Agriculture', value: 6 },
    { label: 'Others', value: 4 },
  ];

  // Trade value over time
  const tradeValueData: ChartData[] = months.map((month, index) => ({
    label: month,
    value: 2500000 + Math.random() * 500000 + index * 100000,
    date: `2024-${String(index + 1).padStart(2, '0')}-01`,
  }));

  return {
    shipmentVolume: shipmentVolumeData,
    topCountries: topCountriesData,
    productCategories: productCategoriesData,
    tradeValue: tradeValueData,
  };
};

// Export HS Codes
export { hsCodes };

// Helper function to get company by ID
export const getCompanyById = (id: string): Company | undefined => {
  return mockCompanies.find(c => c.id === id);
};

// Helper function to get shipments by company
export const getShipmentsByCompany = (companyId: string): Shipment[] => {
  return mockShipments.filter(s => s.companyId === companyId);
};

// Helper function to get contacts by company
export const getContactsByCompany = (companyId: string): Contact[] => {
  return mockContacts.filter(c => c.companyId === companyId);
};

// Search and filter functions
export const searchCompanies = (
  query: string,
  filters?: {
    country?: string;
    minShipments?: number;
    maxShipments?: number;
    type?: string;
  }
): Company[] => {
  let results = mockCompanies;

  // Text search
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      c => 
        c.name.toLowerCase().includes(lowerQuery) ||
        c.country.toLowerCase().includes(lowerQuery) ||
        c.industry.toLowerCase().includes(lowerQuery)
    );
  }

  // Apply filters
  if (filters) {
    if (filters.country) {
      results = results.filter(c => c.country === filters.country);
    }
    if (filters.minShipments !== undefined) {
      results = results.filter(c => c.shipmentCount >= filters.minShipments!);
    }
    if (filters.maxShipments !== undefined) {
      results = results.filter(c => c.shipmentCount <= filters.maxShipments!);
    }
    if (filters.type && filters.type !== 'all') {
      results = results.filter(c => c.type === filters.type);
    }
  }

  return results;
};

export const searchShipments = (
  query: string,
  filters?: {
    country?: string;
    hsCode?: string;
    startDate?: string;
    endDate?: string;
    type?: string;
  }
): Shipment[] => {
  let results = mockShipments;

  // Text search
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(
      s => 
        s.companyName.toLowerCase().includes(lowerQuery) ||
        s.productDescription.toLowerCase().includes(lowerQuery) ||
        s.hsCode.includes(lowerQuery) ||
        s.country.toLowerCase().includes(lowerQuery)
    );
  }

  // Apply filters
  if (filters) {
    if (filters.country) {
      results = results.filter(s => 
        s.country === filters.country || 
        s.origin === filters.country || 
        s.destination === filters.country
      );
    }
    if (filters.hsCode) {
      results = results.filter(s => s.hsCode.startsWith(filters.hsCode!));
    }
    if (filters.startDate) {
      results = results.filter(s => s.date >= filters.startDate!);
    }
    if (filters.endDate) {
      results = results.filter(s => s.date <= filters.endDate!);
    }
    if (filters.type && filters.type !== 'all') {
      results = results.filter(s => s.shipmentType === filters.type);
    }
  }

  return results;
};
