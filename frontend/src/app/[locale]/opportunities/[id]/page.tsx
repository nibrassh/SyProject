'use client'

import { useState, useEffect } from "react"
import Layout from "@/Layouts/Layout"
import axios from "axios"
import OpportunitiesList from "@/components/OpportunitiesList"

import dynamic from 'next/dynamic'
import { useParams } from "next/navigation"

const OpportunitiesMap = dynamic(() => import('@/components/OpportunitiesMap'), {
  ssr: false,
})

export default function OpportunitiesPage() {
  const [branches, setbranches] = useState([])
const { id } = useParams() as { id: string }
    const [viewMode, setViewMode] = useState<'map' | 'list'>('list')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchbranches = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/v1/branches/${id}`
        )
        setbranches(response.data.branches)
      } catch (err: any) {
        console.error("Error fetching companies:", err)
        setError("Failed to load branches. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchbranches()
  }, [id])

  return (
    <Layout>
      {loading && (
        <div className="flex justify-center items-center h-64 text-xl">
          Loading branches...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 mt-4">
          {error}
        </div>
      )}

{!loading && !error && (
  viewMode === 'map' ? (
    <OpportunitiesMap
     type={"branch"}
      opportunities={branches || []}
      viewMode={viewMode}
      setViewMode={setViewMode}
    />
  ) : (
    <OpportunitiesList
     type={"branch"}
      opportunities={branches || []}
      viewMode={viewMode}
      setViewMode={setViewMode}
    />
  )
)}
    </Layout>
  )
}
