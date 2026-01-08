// Mock data generator for realistic enterprise data

import { Company, Shipment, Contact, HSCode } from '@/types';

// Realistic company names by industry
const companyNames = {
  textile: [
    'Global Fabrics Ltd', 'TextileCorp International', 'Premium Yarns Co', 'Silkway Trading',
    'Cotton Mills Inc', 'Fiber Dynamics', 'Weave Masters', 'Textile Innovations',
    'Fashion Fabrics Group', 'Euro Textiles', 'Asian Textile Hub', 'Fabric World',
  ],
  electronics: [
    'TechComponents Ltd', 'Electronics Global', 'Circuit Systems Inc', 'Digital Parts Co',
    'Semiconductor Solutions', 'Tech Innovations', 'Electronic Wholesale', 'Component Masters',
    'Digital Electronics', 'Tech Supply Chain', 'Electronics Distributors', 'Silicon Trading',
  ],
  food: [
    'Global Foods Trading', 'Agri Export Inc', 'Food Solutions Ltd', 'Fresh Produce Co',
    'Organic Traders', 'Food Commodities', 'Agro Industries', 'Global Harvest',
    'Food Distributors', 'Agricultural Exports', 'Nutrition Trading', 'Food Partners',
  ],
  machinery: [
    'Industrial Machines Ltd', 'Machinery Global', 'Engineering Solutions', 'Heavy Equipment Co',
    'Machine Tools Inc', 'Industrial Systems', 'Equipment Traders', 'Machinery Hub',
    'Engineering Exports', 'Industrial Partners', 'Machinery Dynamics', 'Equipment Solutions',
  ],
  chemicals: [
    'ChemTrade Global', 'Chemical Solutions Inc', 'Industrial Chemicals', 'Polymer Trading',
    'Chemical Exports Ltd', 'Global Chemicals', 'Chemical Dynamics', 'Industrial Compounds',
    'Chemical Partners', 'Polymer Solutions', 'Chemical Industries', 'Global ChemCo',
  ],
  automotive: [
    'Auto Parts Global', 'Automotive Solutions', 'Vehicle Components Ltd', 'Auto Trading Inc',
    'Parts Distributors', 'Automotive Exports', 'Vehicle Systems', 'Auto Components',
    'Global Auto Parts', 'Automotive Industries', 'Parts & Accessories', 'Auto Supplies',
  ],
};

const countries = [
  'United States', 'China', 'Germany', 'India', 'United Kingdom', 'Japan',
  'France', 'Italy', 'Brazil', 'Canada', 'South Korea', 'Spain',
  'Australia', 'Mexico', 'Indonesia', 'Netherlands', 'Saudi Arabia',
  'Turkey', 'Switzerland', 'Poland', 'Belgium', 'Thailand',
  'Vietnam', 'Singapore', 'Malaysia', 'Philippines', 'Bangladesh',
];

const cities = {
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami'],
  'China': ['Shanghai', 'Beijing', 'Shenzhen', 'Guangzhou', 'Hong Kong'],
  'Germany': ['Hamburg', 'Berlin', 'Munich', 'Frankfurt', 'Cologne'],
  'India': ['Mumbai', 'Delhi', 'Chennai', 'Kolkata', 'Bangalore'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Liverpool', 'Bristol'],
  'Japan': ['Tokyo', 'Osaka', 'Yokohama', 'Nagoya', 'Kobe'],
};

const ports = [
  'Shanghai Port', 'Singapore Port', 'Shenzhen Port', 'Ningbo-Zhoushan Port',
  'Busan Port', 'Hong Kong Port', 'Guangzhou Port', 'Qingdao Port',
  'Dubai Port', 'Tianjin Port', 'Rotterdam Port', 'Port Klang',
  'Antwerp Port', 'Xiamen Port', 'Kaohsiung Port', 'Los Angeles Port',
  'Hamburg Port', 'Long Beach Port', 'New York/New Jersey Port', 'Tanjung Pelepas Port',
];

const hsCodes: HSCode[] = [
  { code: '520100', description: 'Cotton, not carded or combed', category: 'Textile' },
  { code: '620342', description: 'Men\'s or boys\' trousers', category: 'Apparel' },
  { code: '851712', description: 'Smartphones', category: 'Electronics' },
  { code: '847130', description: 'Portable computers', category: 'Electronics' },
  { code: '870323', description: 'Motor vehicles (1500-3000cc)', category: 'Automotive' },
  { code: '271000', description: 'Petroleum oils', category: 'Energy' },
  { code: '100190', description: 'Wheat', category: 'Agriculture' },
  { code: '090111', description: 'Coffee, not roasted', category: 'Food' },
  { code: '392010', description: 'Plastic plates and sheets', category: 'Plastics' },
  { code: '854140', description: 'Photosensitive semiconductor devices', category: 'Electronics' },
  { code: '730441', description: 'Steel tubes and pipes', category: 'Metals' },
  { code: '841112', description: 'Turbojets', category: 'Machinery' },
  { code: '300490', description: 'Medicaments', category: 'Pharmaceuticals' },
  { code: '940350', description: 'Wooden furniture', category: 'Furniture' },
  { code: '950300', description: 'Toys', category: 'Toys' },
];

const productDescriptions: Record<string, string[]> = {
  '520100': ['Raw Cotton Bales', 'Cotton Fiber', 'Organic Cotton', 'Premium Cotton'],
  '620342': ['Denim Jeans', 'Casual Trousers', 'Cotton Pants', 'Formal Trousers'],
  '851712': ['5G Smartphones', 'Android Phones', 'Mobile Devices', 'Smart Devices'],
  '847130': ['Laptop Computers', 'Gaming Laptops', 'Business Laptops', 'Ultrabooks'],
  '870323': ['Sedan Cars', 'SUVs', 'Crossover Vehicles', 'Passenger Cars'],
  '271000': ['Crude Oil', 'Refined Petroleum', 'Diesel Fuel', 'Gasoline'],
  '100190': ['Durum Wheat', 'Bread Wheat', 'Organic Wheat', 'Premium Wheat'],
  '090111': ['Arabica Coffee', 'Robusta Coffee', 'Green Coffee Beans', 'Specialty Coffee'],
  '392010': ['PVC Sheets', 'Acrylic Sheets', 'Polycarbonate Panels', 'Plastic Boards'],
  '854140': ['LED Chips', 'Solar Cells', 'Photodiodes', 'Light Sensors'],
  '730441': ['Seamless Steel Pipes', 'Carbon Steel Tubes', 'Stainless Steel Pipes', 'Industrial Pipes'],
  '841112': ['Aircraft Engines', 'Jet Turbines', 'Aviation Engines', 'Turbojet Engines'],
  '300490': ['Generic Medicines', 'Pharmaceutical Tablets', 'Medical Drugs', 'Healthcare Products'],
  '940350': ['Office Furniture', 'Bedroom Furniture', 'Living Room Sets', 'Custom Furniture'],
  '950300': ['Educational Toys', 'Action Figures', 'Board Games', 'Electronic Toys'],
};

const roles = [
  'CEO', 'Managing Director', 'Procurement Manager', 'Supply Chain Director',
  'Import Manager', 'Export Manager', 'Business Development Manager',
  'Operations Director', 'Logistics Manager', 'Purchasing Head',
  'Commercial Director', 'Sales Manager', 'Trade Compliance Officer',
];

const firstNames = [
  'John', 'Michael', 'David', 'James', 'Robert', 'William', 'Richard', 'Thomas',
  'Maria', 'Anna', 'Sarah', 'Lisa', 'Jennifer', 'Emma', 'Emily', 'Jessica',
  'Raj', 'Priya', 'Amit', 'Sanjay', 'Wei', 'Li', 'Chen', 'Zhang',
  'Ahmed', 'Mohammed', 'Hassan', 'Fatima', 'Carlos', 'Juan', 'Luis',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Kumar', 'Sharma', 'Patel', 'Singh', 'Wang', 'Lee', 'Chen', 'Liu',
  'Mohammed', 'Ali', 'Hassan', 'Rodriguez', 'Martinez', 'Lopez', 'Gonzalez',
  'Schmidt', 'Müller', 'Weber', 'Schneider', 'Dubois', 'Martin', 'Bernard',
];

// Helper functions
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomItem = <T,>(arr: T[]): T => arr[random(0, arr.length - 1)];
const randomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

// Generate companies
export const generateCompanies = (count: number): Company[] => {
  const companies: Company[] = [];
  const industries = Object.keys(companyNames);
  
  for (let i = 0; i < count; i++) {
    const industry = randomItem(industries);
    const country = randomItem(countries);
    const cityList = cities[country as keyof typeof cities] || ['Capital City', 'Port City', 'Industrial City'];
    
    companies.push({
      id: `comp-${i + 1}`,
      name: randomItem(companyNames[industry as keyof typeof companyNames]),
      country,
      city: randomItem(cityList),
      type: randomItem(['importer', 'exporter', 'both'] as const),
      shipmentCount: random(5, 500),
      lastShipmentDate: randomDate(new Date('2023-01-01'), new Date('2024-12-31')).toISOString(),
      totalVolume: random(100, 50000),
      establishedYear: random(1980, 2020),
      industry,
      verified: Math.random() > 0.3,
    });
  }
  
  return companies;
};

// Generate shipments
export const generateShipments = (companies: Company[], count: number): Shipment[] => {
  const shipments: Shipment[] = [];
  
  for (let i = 0; i < count; i++) {
    const company = randomItem(companies);
    const hsCode = randomItem(hsCodes);
    const products = productDescriptions[hsCode.code] || ['General Product'];
    const isExport = company.type === 'exporter' || (company.type === 'both' && Math.random() > 0.5);
    
    const origin = isExport ? company.country : randomItem(countries.filter(c => c !== company.country));
    const destination = isExport ? randomItem(countries.filter(c => c !== company.country)) : company.country;
    
    shipments.push({
      id: `ship-${i + 1}`,
      companyId: company.id,
      companyName: company.name,
      country: company.country,
      origin,
      destination,
      productDescription: randomItem(products),
      hsCode: hsCode.code,
      quantity: random(100, 10000),
      unit: randomItem(['pieces', 'kg', 'tonnes', 'units', 'cartons']),
      weight: random(500, 50000),
      value: random(10000, 5000000),
      date: randomDate(new Date('2023-01-01'), new Date('2024-12-31')).toISOString(),
      portOfLoading: randomItem(ports),
      portOfDischarge: randomItem(ports),
      shipmentType: isExport ? 'export' : 'import',
      status: randomItem(['completed', 'in-transit', 'customs'] as const),
    });
  }
  
  return shipments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Generate contacts
export const generateContacts = (companies: Company[], perCompany: number = 3): Contact[] => {
  const contacts: Contact[] = [];
  let contactId = 1;
  
  companies.forEach((company) => {
    const numContacts = random(1, perCompany);
    for (let i = 0; i < numContacts; i++) {
      const firstName = randomItem(firstNames);
      const lastName = randomItem(lastNames);
      const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${company.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
      
      contacts.push({
        id: `contact-${contactId++}`,
        companyId: company.id,
        name: `${firstName} ${lastName}`,
        role: randomItem(roles),
        email,
        phone: `+${random(1, 99)}-${random(100, 999)}-${random(1000000, 9999999)}`,
        verified: Math.random() > 0.4,
        locked: Math.random() > 0.5,
        linkedIn: Math.random() > 0.6 ? `linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}` : undefined,
      });
    }
  });
  
  return contacts;
};

export { hsCodes };
