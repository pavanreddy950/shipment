import { mockCompanies } from '@/lib/data/mock-data';
import CompanyProfileClient from './CompanyProfileClient';

// Generate static params for a subset of companies
export function generateStaticParams() {
  // Generate static pages for first 100 companies to keep build size reasonable
  return mockCompanies.slice(0, 100).map((company) => ({
    id: company.id,
  }));
}

export default function CompanyProfilePage({ params }: { params: { id: string } }) {
  return <CompanyProfileClient companyId={params.id} />;
}
