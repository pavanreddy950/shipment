// Mock Shipment Data Generator - 5,000+ Realistic Shipments

import { Shipment, ShipmentStatus, Checkpoint } from '@/types/shipment';

const vessels = [
  'MAERSK ESSEX', 'MSC OSCAR', 'CMA CGM ANTOINE DE SAINT', 'EVER GIVEN', 'COSCO SHIPPING UNIVERSE',
  'OOCL HONG KONG', 'APL TEMASEK', 'HYUNDAI PRIDE', 'YANG MING UNITY', 'HAPAG LLOYD BERLIN',
  'NYK APOLLO', 'MOL TRUTH', 'K LINE NAVIGATOR', 'EVERGREEN EXCELLENCE', 'ZIM SAMMY OFER',
  'ONE COMMITMENT', 'COSCO GLORY', 'MSC GULSUN', 'HMM ALGECIRAS', 'MAERSK MC-KINNEY'
];

const carriers = [
  'Maersk Line', 'MSC', 'CMA CGM', 'COSCO Shipping', 'Hapag-Lloyd',
  'ONE (Ocean Network Express)', 'Evergreen Marine', 'Yang Ming', 'HMM', 'ZIM',
  'PIL (Pacific International Lines)', 'Wan Hai Lines', 'OOCL', 'APL', 'NYK Line'
];

const ports = [
  { name: 'Shanghai Port', country: 'China', lat: 31.2304, lng: 121.4737 },
  { name: 'Singapore Port', country: 'Singapore', lat: 1.2644, lng: 103.8220 },
  { name: 'Ningbo-Zhoushan Port', country: 'China', lat: 29.8683, lng: 121.5440 },
  { name: 'Shenzhen Port', country: 'China', lat: 22.5431, lng: 114.0579 },
  { name: 'Guangzhou Port', country: 'China', lat: 23.1291, lng: 113.2644 },
  { name: 'Busan Port', country: 'South Korea', lat: 35.1028, lng: 129.0403 },
  { name: 'Hong Kong Port', country: 'Hong Kong', lat: 22.2793, lng: 114.1628 },
  { name: 'Rotterdam Port', country: 'Netherlands', lat: 51.9244, lng: 4.4777 },
  { name: 'Antwerp Port', country: 'Belgium', lat: 51.2194, lng: 4.4025 },
  { name: 'Hamburg Port', country: 'Germany', lat: 53.5511, lng: 9.9937 },
  { name: 'Los Angeles Port', country: 'USA', lat: 33.7405, lng: -118.2668 },
  { name: 'Long Beach Port', country: 'USA', lat: 33.7546, lng: -118.2004 },
  { name: 'New York/New Jersey Port', country: 'USA', lat: 40.6693, lng: -74.0395 },
  { name: 'Dubai Port', country: 'UAE', lat: 25.2769, lng: 55.2962 },
  { name: 'Port Klang', country: 'Malaysia', lat: 2.9987, lng: 101.3932 },
  { name: 'Tokyo Port', country: 'Japan', lat: 35.6205, lng: 139.7814 },
  { name: 'Kaohsiung Port', country: 'Taiwan', lat: 22.6163, lng: 120.2999 },
  { name: 'Tianjin Port', country: 'China', lat: 38.9811, lng: 117.7401 },
  { name: 'Chennai Port', country: 'India', lat: 13.0827, lng: 80.2707 },
  { name: 'Melbourne Port', country: 'Australia', lat: -37.8136, lng: 144.9631 },
  { name: 'Santos Port', country: 'Brazil', lat: -23.9618, lng: -46.3322 },
  { name: 'Felixstowe Port', country: 'UK', lat: 51.9541, lng: 1.3515 },
  { name: 'Valencia Port', country: 'Spain', lat: 39.4699, lng: -0.3763 },
  { name: 'Jebel Ali Port', country: 'UAE', lat: 24.9857, lng: 55.0272 }
];

const cargoTypes = [
  'Electronics', 'Textiles', 'Machinery', 'Chemicals', 'Automobiles',
  'Consumer Goods', 'Raw Materials', 'Food Products', 'Pharmaceuticals',
  'Furniture', 'Steel', 'Plastics', 'Paper Products', 'Toys'
];

const companies = [
  'Global Trading Co', 'Pacific Imports Ltd', 'Euro Commerce Group', 'Asian Traders Inc',
  'Continental Shipping', 'Oceanic Exports', 'World Trade Partners', 'Universal Logistics',
  'Prime Cargo Solutions', 'Elite Importers', 'Premier Exports Ltd', 'Worldwide Freight',
  'International Commerce', 'Global Supply Chain', 'Mega Trade Corp', 'Superior Logistics'
];

// Helper functions
const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomDate = (start: Date, end: Date): Date => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateBOL = (): string => {
  const prefix = ['MAEU', 'MSCU', 'CMDU', 'COSU', 'HLCU', 'ONEY', 'EGLV'];
  return `${randomItem(prefix)}${Math.floor(Math.random() * 10000000).toString().padStart(7, '0')}`;
};

const generateContainerNumber = (): string => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const prefix = Array(4).fill(0).map(() => letters[Math.floor(Math.random() * letters.length)]).join('');
  const number = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return `${prefix}${number}${Math.floor(Math.random() * 10)}`;
};

const statuses: ShipmentStatus[] = ['Loaded', 'Departed', 'In Transit', 'Delayed', 'Arrived', 'Customs Clearance'];

// Generate checkpoints based on status
const generateCheckpoints = (
  status: ShipmentStatus,
  origin: string,
  destination: string,
  departureDate: Date,
  arrivalDate: Date
): Checkpoint[] => {
  const checkpoints: Checkpoint[] = [];
  const totalDays = Math.floor((arrivalDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Checkpoint 1: Origin Port - Loaded
  checkpoints.push({
    location: origin,
    timestamp: new Date(departureDate.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'Loaded',
    description: 'Container loaded onto vessel',
    completed: true
  });

  // Checkpoint 2: Departed
  checkpoints.push({
    location: origin,
    timestamp: departureDate.toISOString(),
    status: 'Departed',
    description: 'Vessel departed from origin port',
    completed: true
  });

  // Checkpoint 3: In Transit
  if (['In Transit', 'Delayed', 'Arrived', 'Customs Clearance'].includes(status)) {
    checkpoints.push({
      location: 'International Waters',
      timestamp: new Date(departureDate.getTime() + (totalDays / 3) * 24 * 60 * 60 * 1000).toISOString(),
      status: 'In Transit',
      description: 'Shipment in transit to destination',
      completed: status !== 'In Transit'
    });
  }

  // Checkpoint 4: Approaching Port
  if (['Delayed', 'Arrived', 'Customs Clearance'].includes(status)) {
    checkpoints.push({
      location: `Approaching ${destination}`,
      timestamp: new Date(arrivalDate.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: status === 'Delayed' ? 'Delayed' : 'Approaching',
      description: status === 'Delayed' ? 'Shipment delayed due to weather conditions' : 'Vessel approaching destination port',
      completed: ['Arrived', 'Customs Clearance'].includes(status)
    });
  }

  // Checkpoint 5: Arrived
  if (['Arrived', 'Customs Clearance'].includes(status)) {
    checkpoints.push({
      location: destination,
      timestamp: arrivalDate.toISOString(),
      status: 'Arrived',
      description: 'Vessel arrived at destination port',
      completed: true
    });
  }

  // Checkpoint 6: Customs Clearance
  if (status === 'Customs Clearance' || Math.random() > 0.7) {
    checkpoints.push({
      location: destination,
      timestamp: new Date(arrivalDate.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'Customs Clearance',
      description: 'Undergoing customs clearance',
      completed: status === 'Customs Clearance'
    });
  }

  return checkpoints;
};

// Calculate progress percentage
const calculateProgress = (status: ShipmentStatus): number => {
  const progressMap: Record<ShipmentStatus, number> = {
    'Loaded': 10,
    'Departed': 25,
    'In Transit': 60,
    'Delayed': 55,
    'Arrived': 90,
    'Customs Clearance': 95
  };
  return progressMap[status] || 0;
};

// Generate 5000+ shipments
export const generateShipments = (count: number = 5000): Shipment[] => {
  const shipments: Shipment[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const origin = randomItem(ports);
    let destination = randomItem(ports);
    // Ensure destination is different from origin
    while (destination.name === origin.name) {
      destination = randomItem(ports);
    }

    const departureDate = randomDate(
      new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
      new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)  // 30 days in future
    );

    const transitDays = 15 + Math.floor(Math.random() * 30); // 15-45 days transit
    const arrivalDate = new Date(departureDate.getTime() + transitDays * 24 * 60 * 60 * 1000);

    const status = randomItem(statuses);
    const checkpoints = generateCheckpoints(status, origin.name, destination.name, departureDate, arrivalDate);

    // Calculate current position (interpolate between origin and destination)
    const progress = calculateProgress(status) / 100;
    const currentLat = origin.lat + (destination.lat - origin.lat) * progress;
    const currentLng = origin.lng + (destination.lng - origin.lng) * progress;

    shipments.push({
      shipmentId: `SHP${(1000000 + i).toString().padStart(7, '0')}`,
      billOfLading: generateBOL(),
      containerNumber: generateContainerNumber(),
      vesselName: randomItem(vessels),
      carrier: randomItem(carriers),
      originPort: origin.name,
      originCountry: origin.country,
      destinationPort: destination.name,
      destinationCountry: destination.country,
      departureDate: departureDate.toISOString(),
      estimatedArrivalDate: arrivalDate.toISOString(),
      actualArrivalDate: status === 'Arrived' ? arrivalDate.toISOString() : undefined,
      currentStatus: status,
      lastUpdated: new Date().toISOString(),
      shipperCompany: randomItem(companies),
      consigneeCompany: randomItem(companies),
      latitude: currentLat,
      longitude: currentLng,
      cargoType: randomItem(cargoTypes),
      weight: 10000 + Math.floor(Math.random() * 40000), // 10-50 tons
      volume: 20 + Math.floor(Math.random() * 80), // 20-100 CBM
      checkpoints,
      progressPercentage: calculateProgress(status)
    });
  }

  return shipments;
};

// Generate the shipments
export const mockShipments: Shipment[] = generateShipments(5000);

// Search function
export const searchShipment = (query: string): Shipment | undefined => {
  const normalizedQuery = query.toUpperCase().trim();
  
  return mockShipments.find(
    s => 
      s.shipmentId.toUpperCase() === normalizedQuery ||
      s.billOfLading.toUpperCase() === normalizedQuery ||
      s.containerNumber.toUpperCase() === normalizedQuery
  );
};

// Get shipments by status
export const getShipmentsByStatus = (status: ShipmentStatus): Shipment[] => {
  return mockShipments.filter(s => s.currentStatus === status);
};

// Get recent shipments
export const getRecentShipments = (count: number = 20): Shipment[] => {
  return mockShipments
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
    .slice(0, count);
};
