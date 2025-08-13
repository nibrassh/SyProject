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
const { branchId } = useParams() as { branchId: string }
    const [viewMode, setViewMode] = useState<'map' | 'list'>('list')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchbranches = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/v1/centers/${branchId}`
        )
          setbranches(response.data.centers)
      } catch (err: any) {
        console.error("Error fetching centers:", err)
        setError("Failed to load centers. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchbranches()
  }, [branchId])

  return (
    <Layout>
      {loading && (
        <div className="flex justify-center items-center h-64 text-xl">
          Loading centers...
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
     type={"center"}
      opportunities={branches || []}
      viewMode={viewMode}
      setViewMode={setViewMode}
    />
  ) : (
    <OpportunitiesList
     type={"center"}
      opportunities={branches || []}
      viewMode={viewMode}
      setViewMode={setViewMode}
    />
  )
)}
    </Layout>
  )
}
