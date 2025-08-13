'use client'
import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useTranslations, useLocale } from 'next-intl'
import { FaMapMarkerAlt, FaList, FaArrowLeft, FaBuilding, FaEye, FaHandshake } from 'react-icons/fa'
import { companies, userRequests } from '@/data/fakeData'
import Image from 'next/image'
import Link from 'next/link'
import InvestmentFormModal from './InvestmentFormModal'
import OpportunitiesMap from './OpportunitiesMap'
import OpportunitiesList from './OpportunitiesList'


const createCustomIcon = (color: string = '#e74c3c') => {
  return L.divIcon({
    html: `<div style="color: ${color}; font-size: 24px;"><svg viewBox="0 0 24 24" style="width:24px;height:24px;"><path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg></div>`,
    className: '',
    iconSize: [24, 24]
  })
}

export default function InvestmentOpportunitySystem({companies}) {
  const t = useTranslations('opportunities')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  // State management
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list')
  // const [currentLevel, setCurrentLevel] = useState<'companies' | 'branches' | 'centers' | 'opportunities'>('companies')
  // const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  // const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  // const [selectedCenter, setSelectedCenter] = useState<Center | null>(null)
  // const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  // const [mapCenter, setMapCenter] = useState<[number, number]>([34.8021, 38.9968]) // Syria center
  // const [mapZoom, setMapZoom] = useState(7)
  // const [showOpportunityModal, setShowOpportunityModal] = useState(false)
  // const [showInvestmentForm, setShowInvestmentForm] = useState(false)

  // const userId = "user123"

  // // Check if user has already requested an opportunity
  // const hasUserRequested = (opportunityId: number) => {
  //   return userRequests.some(req =>
  //     req.userId === userId &&
  //     req.opportunityId === opportunityId &&
  //     req.status === 'pending'
  //   )
  // }

  // // Handle opportunity request
  // const handleRequestOpportunity = (opportunity: Opportunity) => {
  //   if (hasUserRequested(opportunity.id)) {
  //     alert(t('alreadyRequestedMessage'))
  //     return
  //   }

  //   // Open investment form modal
  //   setShowInvestmentForm(true)
  // }

  // // Handle investment form submission
  // const handleInvestmentFormSubmit = (formData: any) => {
  //   if (!selectedOpportunity) return

  //   // Add request to mock data
  //   userRequests.push({
  //     userId,
  //     opportunityId: selectedOpportunity.id,
  //     status: 'pending',
  //     requestDate: new Date().toISOString()
  //   })

  //   // Close form and show success message
  //   setShowInvestmentForm(false)
  //   alert(t('requestSent'))
  // }

  // const closeInvestmentForm = () => {
  //   setShowInvestmentForm(false)
  // }

  // const getBreadcrumbs = (): Breadcrumb[] => {
  //   const breadcrumbs: Breadcrumb[] = [
  //     {
  //       label: t('companies'),
  //       onClick: () => {
  //         setCurrentLevel('companies')
  //         setSelectedCompany(null)
  //         setSelectedBranch(null)
  //         setSelectedCenter(null)
  //         setMapCenter([34.8021, 38.9968])
  //         setMapZoom(7)
  //       }
  //     }
  //   ]

  //   if (selectedCompany) {
  //     breadcrumbs.push({
  //       label: isArabic ? selectedCompany.name : selectedCompany.nameEn,
  //       onClick: () => {
  //         setCurrentLevel('branches')
  //         setSelectedBranch(null)
  //         setSelectedCenter(null)
  //         setMapCenter(selectedCompany.location)
  //         setMapZoom(9)
  //       }
  //     })
  //   }

  //   if (selectedBranch) {
  //     breadcrumbs.push({
  //       label: isArabic ? selectedBranch.name : selectedBranch.nameEn,
  //       onClick: () => {
  //         setCurrentLevel('centers')
  //         setSelectedCenter(null)
  //         setMapCenter(selectedBranch.location)
  //         setMapZoom(11)
  //       }
  //     })
  //   }

  //   if (selectedCenter) {
  //     breadcrumbs.push({
  //       label: isArabic ? selectedCenter.name : selectedCenter.nameEn,
  //       onClick: () => {
  //         setCurrentLevel('opportunities')
  //         setMapCenter(selectedCenter.location)
  //         setMapZoom(13)
  //       }
  //     })
  //   }

  //   return breadcrumbs
  // }
  
  
  return (
    <div className={`container mx-auto px-4 py-8 font-tajawal ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Main Content */}
      {viewMode === 'map' ? (
        // Map View
       <OpportunitiesMap opportunities={companies} viewMode={viewMode} setViewMode={setViewMode}/>
      ) : (
        // List View
       <OpportunitiesList opportunities={companies} viewMode={viewMode} setViewMode={setViewMode}/>
      )}
  
    </div>
  )
}