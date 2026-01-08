// Core type definitions for the Trade Intelligence Platform

export interface Company {
  id: string;
  name: string;
  country: string;
  city: string;
  type: 'importer' | 'exporter' | 'both';
  shipmentCount: number;
  lastShipmentDate: string;
  totalVolume: number; // in tonnes
  establishedYear: number;
  industry: string;
  verified: boolean;
}

export interface Shipment {
  id: string;
  companyId: string;
  companyName: string;
  country: string;
  origin: string;
  destination: string;
  productDescription: string;
  hsCode: string;
  quantity: number;
  unit: string;
  weight: number; // in kg
  value: number; // in USD
  date: string;
  portOfLoading: string;
  portOfDischarge: string;
  shipmentType: 'import' | 'export';
  status: 'completed' | 'in-transit' | 'customs';
}

export interface Contact {
  id: string;
  companyId: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  verified: boolean;
  locked: boolean;
  linkedIn?: string;
}

export interface HSCode {
  code: string;
  description: string;
  category: string;
}

export interface ChartData {
  label: string;
  value: number;
  date?: string;
}

export interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  plan: string;
  credits: number;
}

export interface ExportHistory {
  id: string;
  name: string;
  type: 'csv' | 'excel' | 'pdf';
  records: number;
  date: string;
  size: string;
  status: 'completed' | 'processing' | 'failed';
}

export interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  plan: 'starter' | 'pro' | 'enterprise';
  credits: number;
  creditsUsed: number;
  totalCredits: number;
  joinedDate: string;
  avatar?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  period: 'month' | 'year';
  credits: number;
  features: string[];
  popular?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  joinedDate: string;
  avatar?: string;
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  createdDate: string;
  lastUsed: string;
  requests: number;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  date: string;
  read: boolean;
}
