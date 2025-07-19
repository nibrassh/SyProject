'use client'
import Layout from "@/Layouts/Layout"
import dynamic from 'next/dynamic'

const InvestmentOpportunitySystem = dynamic(
  () => import("@/components/InvestmentOpportunitySystem"),
  { ssr: false }
)

export default function OpportunitiesPage() {
  return (
    <Layout>
      <InvestmentOpportunitySystem />
    </Layout>
  )
}