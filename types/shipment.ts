// Shipment Tracker Type Definitions

export type ShipmentStatus = 'Loaded' | 'Departed' | 'In Transit' | 'Delayed' | 'Arrived' | 'Customs Clearance';

export interface Checkpoint {
  location: string;
  timestamp: string;
  status: string;
  description: string;
  completed: boolean;
}

export interface Shipment {
  shipmentId: string;
  billOfLading: string;
  containerNumber: string;
  vesselName: string;
  carrier: string;
  originPort: string;
  originCountry: string;
  destinationPort: string;
  destinationCountry: string;
  departureDate: string;
  estimatedArrivalDate: string;
  actualArrivalDate?: string;
  currentStatus: ShipmentStatus;
  lastUpdated: string;
  shipperCompany: string;
  consigneeCompany: string;
  latitude: number;
  longitude: number;
  cargoType: string;
  weight: number;
  volume: number;
  checkpoints: Checkpoint[];
  progressPercentage: number;
}

export interface ShipmentSearchResult {
  found: boolean;
  shipment?: Shipment;
  message?: string;
}
