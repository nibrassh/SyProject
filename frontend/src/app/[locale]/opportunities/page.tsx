import Layout from "@/Layouts/Layout"
import OpportunitiesMap from "@/components/OpportunitiesMap"

interface Opportunity {
  id: number
  name: string
  location: [number, number]
  type: string
  image: string
  address: string
  shortDescription: string
}

export default async function OpportunitiesPage() {
  // Get the base URL, fallback to localhost for development
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const response = await fetch(`${baseUrl}/api/opportunities`, {
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch opportunities');
  }

  const opportunities: Opportunity[] = await response.json();

  return (
    <Layout>
      <OpportunitiesMap opportunities={opportunities} />
    </Layout>
  )
}