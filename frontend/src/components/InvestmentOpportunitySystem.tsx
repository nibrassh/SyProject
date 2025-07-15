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

// Types
interface Company {
  id: number
  name: string
  nameEn: string
  type: string
  description: string
  descriptionEn: string
  location: [number, number]
  branches: Branch[]
}

interface Branch {
  id: number
  name: string
  nameEn: string
  location: [number, number]
  address: string
  addressEn: string
  centers: Center[]
}

interface Center {
  id: number
  name: string
  nameEn: string
  location: [number, number]
  address: string
  addressEn: string
  opportunities: Opportunity[]
}

interface Opportunity {
  id: number
  name: string
  nameEn: string
  description: string
  descriptionEn: string
  budget: string
  budgetEn: string
  duration: string
  durationEn: string
  image: string
  status: string
}

interface Breadcrumb {
  label: string
  onClick?: () => void
}

interface MapMarker {
  id: number
  position: [number, number]
  name: string
  description: string
  onClick: () => void
  opportunity?: Opportunity
}

// Custom map icon
const createCustomIcon = (color: string = '#e74c3c') => {
  return L.divIcon({
    html: `<div style="color: ${color}; font-size: 24px;"><svg viewBox="0 0 24 24" style="width:24px;height:24px;"><path fill="currentColor" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" /></svg></div>`,
    className: '',
    iconSize: [24, 24]
  })
}

export default function InvestmentOpportunitySystem() {
  const t = useTranslations('opportunities')
  const locale = useLocale()
  const isArabic = locale === 'ar'

  // State management
  const [viewMode, setViewMode] = useState<'map' | 'list'>('list')
  const [currentLevel, setCurrentLevel] = useState<'companies' | 'branches' | 'centers' | 'opportunities'>('companies')
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)
  const [selectedCenter, setSelectedCenter] = useState<Center | null>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([34.8021, 38.9968]) // Syria center
  const [mapZoom, setMapZoom] = useState(7)
  const [showOpportunityModal, setShowOpportunityModal] = useState(false)

  // Mock user ID (in real app, get from auth)
  const userId = "user123"

  // Check if user has already requested an opportunity
  const hasUserRequested = (opportunityId: number) => {
    return userRequests.some(req =>
      req.userId === userId &&
      req.opportunityId === opportunityId &&
      req.status === 'pending'
    )
  }

  // Handle opportunity request
  const handleRequestOpportunity = (opportunity: Opportunity) => {
    if (hasUserRequested(opportunity.id)) {
      alert(t('alreadyRequestedMessage'))
      return
    }

    // Add request to mock data
    userRequests.push({
      userId,
      opportunityId: opportunity.id,
      status: 'pending',
      requestDate: new Date().toISOString()
    })

    alert(t('requestSent'))
  }

  // Breadcrumb generation
  const getBreadcrumbs = (): Breadcrumb[] => {
    const breadcrumbs: Breadcrumb[] = [
      {
        label: t('companies'),
        onClick: () => {
          setCurrentLevel('companies')
          setSelectedCompany(null)
          setSelectedBranch(null)
          setSelectedCenter(null)
          setMapCenter([34.8021, 38.9968])
          setMapZoom(7)
        }
      }
    ]

    if (selectedCompany) {
      breadcrumbs.push({
        label: isArabic ? selectedCompany.name : selectedCompany.nameEn,
        onClick: () => {
          setCurrentLevel('branches')
          setSelectedBranch(null)
          setSelectedCenter(null)
          setMapCenter(selectedCompany.location)
          setMapZoom(9)
        }
      })
    }

    if (selectedBranch) {
      breadcrumbs.push({
        label: isArabic ? selectedBranch.name : selectedBranch.nameEn,
        onClick: () => {
          setCurrentLevel('centers')
          setSelectedCenter(null)
          setMapCenter(selectedBranch.location)
          setMapZoom(11)
        }
      })
    }

    if (selectedCenter) {
      breadcrumbs.push({
        label: isArabic ? selectedCenter.name : selectedCenter.nameEn,
        onClick: () => {
          setCurrentLevel('opportunities')
          setMapCenter(selectedCenter.location)
          setMapZoom(13)
        }
      })
    }

    return breadcrumbs
  }

  // Get current data based on level
  const getCurrentData = () => {
    switch (currentLevel) {
      case 'companies':
        return companies
      case 'branches':
        return selectedCompany?.branches || []
      case 'centers':
        return selectedBranch?.centers || []
      case 'opportunities':
        return selectedCenter?.opportunities || []
      default:
        return []
    }
  }

  // Get map markers based on current level
  const getMapMarkers = (): MapMarker[] => {

    switch (currentLevel) {
      case 'companies':
        return companies.map(company => ({
          id: company.id,
          position: company.location as [number, number],
          name: isArabic ? company.name : company.nameEn,
          description: isArabic ? company.description : company.descriptionEn,
          onClick: () => {
            setSelectedCompany(company)
            setCurrentLevel('branches')
            setMapCenter(company.location)
            setMapZoom(9)
          }
        }))
      case 'branches':
        return (selectedCompany?.branches || []).map(branch => ({
          id: branch.id,
          position: branch.location as [number, number],
          name: isArabic ? branch.name : branch.nameEn,
          description: isArabic ? branch.address : branch.addressEn,
          onClick: () => {
            setSelectedBranch(branch)
            setCurrentLevel('centers')
            setMapCenter(branch.location)
            setMapZoom(11)
          }
        }))
      case 'centers':
        return (selectedBranch?.centers || []).map(center => ({
          id: center.id,
          position: center.location as [number, number],
          name: isArabic ? center.name : center.nameEn,
          description: isArabic ? center.address : center.addressEn,
          onClick: () => {
            setSelectedCenter(center)
            setCurrentLevel('opportunities')
            setMapCenter(center.location)
            setMapZoom(13)
          }
        }))
      case 'opportunities':
        return (selectedCenter?.opportunities || []).map(opportunity => ({
          id: opportunity.id,
          position: (selectedCenter?.location || [0, 0]) as [number, number],
          name: isArabic ? opportunity.name : opportunity.nameEn,
          description: isArabic ? opportunity.description : opportunity.descriptionEn,
          opportunity,
          onClick: () => {
            setSelectedOpportunity(opportunity)
            setShowOpportunityModal(true)
          }
        }))
      default:
        return []
    }
  }

  return (
    <div className={`container mx-auto px-4 py-8 font-tajawal ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 font-tajawal-bold">
            {t('title')}
          </h1>

          {/* Companies Dropdown - Always visible */}
          <div className="relative">
            <select
              value={selectedCompany?.id || ''}
              onChange={(e) => {
                const companyId = parseInt(e.target.value)
                if (companyId) {
                  const company = companies.find(c => c.id === companyId)
                  if (company) {
                    setSelectedCompany(company)
                    setCurrentLevel('branches')
                    setSelectedBranch(null)
                    setSelectedCenter(null)
                    setMapCenter(company.location)
                    setMapZoom(9)
                  }
                } else {
                  setSelectedCompany(null)
                  setCurrentLevel('companies')
                  setSelectedBranch(null)
                  setSelectedCenter(null)
                  setMapCenter([34.8021, 38.9968])
                  setMapZoom(7)
                }
              }}
              className={`bg-white border-2 border-indigo-200 rounded-xl px-4 py-3 text-gray-700 font-tajawal-medium min-w-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm hover:border-indigo-300 transition-all duration-200 ${isArabic ? 'text-right' : 'text-left'}`}
              dir={isArabic ? 'rtl' : 'ltr'}
            >
              <option value="">{t('companies')}</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>
                  {isArabic ? company.name : company.nameEn}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className={`flex items-center mb-6 ${isArabic ? 'justify-end' : 'justify-start'}`} dir={isArabic ? 'rtl' : 'ltr'}>
          <div className={`flex items-center bg-gray-50 rounded-lg px-4 py-2 ${isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
            {getBreadcrumbs().map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && (
                  <FaArrowLeft className={`mx-2 text-gray-400 text-sm ${isArabic ? 'rotate-180' : ''}`} />
                )}
                <button
                  onClick={crumb.onClick}
                  className={`text-indigo-600 hover:text-indigo-800 font-tajawal-medium text-sm px-2 py-1 rounded hover:bg-indigo-50 transition-all duration-200 ${isArabic ? 'text-right' : 'text-left'}`}
                >
                  {crumb.label}
                </button>
              </div>
            ))}
          </div>
        </nav>

        {/* Filter and View Options Section */}
        <div className="mb-6">
          {/* Filter Section Title and View Toggle in same row */}
          <div className={`flex items-center justify-between mb-4`}>
          

            {/* View Toggle */}
            <div className="bg-gray-100 p-1 rounded-xl shadow-inner">
              <div className={`flex ${isArabic ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                <button
                  onClick={() => setViewMode('map')}
                  className={`flex items-center px-6 py-3 rounded-lg font-tajawal-medium transition-all duration-300 min-w-[140px] justify-center ${
                    viewMode === 'map'
                      ? 'bg-white text-indigo-600 shadow-md border border-indigo-100'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <FaMapMarkerAlt className={`text-lg ${isArabic ? 'ml-2' : 'mr-2'}`} />
                  {t('mapView')}
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center px-6 py-3 rounded-lg font-tajawal-medium transition-all duration-300 min-w-[140px] justify-center ${
                    viewMode === 'list'
                      ? 'bg-white text-indigo-600 shadow-md border border-indigo-100'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <FaList className={`text-lg ${isArabic ? 'ml-2' : 'mr-2'}`} />
                  {t('listView')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      {viewMode === 'map' ? (
        // Map View
        <div className="relative rounded-xl overflow-hidden shadow-xl border border-gray-200 z-0">
          <MapContainer
            center={mapCenter as [number, number]}
            zoom={mapZoom}
            style={{ height: "600px", width: "100%" }}
            key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {getMapMarkers().map(marker => (
              <Marker
                key={marker.id}
                position={marker.position as [number, number]}
                icon={createCustomIcon('#e74c3c')}
              >
                <Popup>
                  <div className="space-y-3 min-w-[250px]">
                    <h3 className="font-bold text-lg text-indigo-600 font-tajawal-bold">
                      {marker.name}
                    </h3>
                    <p className="text-gray-700 font-tajawal-medium">
                      {marker.description}
                    </p>
                    {marker.opportunity && (
                      <div className="space-y-2">
                        <div className="relative w-full h-32 rounded-md overflow-hidden">
                          <Image
                            src={marker.opportunity.image}
                            alt={marker.name}
                            fill
                            className="object-cover"
                            unoptimized={true}
                          />
                        </div>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('budget')}:</span> {isArabic ? marker.opportunity.budget : marker.opportunity.budgetEn}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">{t('duration')}:</span> {isArabic ? marker.opportunity.duration : marker.opportunity.durationEn}
                        </p>
                      </div>
                    )}
                    <button
                      onClick={marker.onClick}
                      className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-300 font-tajawal-medium"
                    >
                      {currentLevel === 'opportunities' ?
                        t('viewDetails') :
                        t('explore')
                      }
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ) : (
        // List View
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isArabic ? 'rtl' : 'ltr'}`} dir={isArabic ? 'rtl' : 'ltr'}>
          {getCurrentData().map((item: any) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
              onClick={() => {
                if (currentLevel === 'companies') {
                  setSelectedCompany(item)
                  setCurrentLevel('branches')
                  setMapCenter(item.location)
                  setMapZoom(9)
                } else if (currentLevel === 'branches') {
                  setSelectedBranch(item)
                  setCurrentLevel('centers')
                  setMapCenter(item.location)
                  setMapZoom(11)
                } else if (currentLevel === 'centers') {
                  setSelectedCenter(item)
                  setCurrentLevel('opportunities')
                  setMapCenter(item.location)
                  setMapZoom(13)
                } else if (currentLevel === 'opportunities') {
                  setSelectedOpportunity(item)
                  setShowOpportunityModal(true)
                }
              }}
            >
              {currentLevel === 'opportunities' && item.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={isArabic ? item.name : item.nameEn}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
              )}

              <div className="p-6" dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Header with Icon */}
                <div className={`flex items-start mb-4 ${isArabic ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center ${isArabic ? 'ml-4' : 'mr-4'}`}>
                    <FaBuilding className="text-indigo-600 text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-xl font-bold text-gray-800 font-tajawal-bold mb-2 ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? item.name : item.nameEn}
                    </h3>
                    <p className={`text-gray-600 font-tajawal-medium leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ?
                        (item.description || item.address) :
                        (item.descriptionEn || item.addressEn)
                      }
                    </p>
                  </div>
                </div>

                {/* Opportunity Details */}
                {currentLevel === 'opportunities' && (
                  <div className={`bg-gray-50 rounded-lg p-4 mb-4 ${isArabic ? 'text-right' : 'text-left'}`}>
                    <div className="grid grid-cols-1 gap-3">
                      <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-2 h-2 bg-indigo-500 rounded-full ${isArabic ? 'ml-3' : 'mr-3'}`}></div>
                        <span className="text-sm text-gray-600 font-tajawal-medium">
                          <span className="font-bold text-gray-800">{t('budget')}:</span> {isArabic ? item.budget : item.budgetEn}
                        </span>
                      </div>
                      <div className={`flex items-center ${isArabic ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-2 h-2 bg-green-500 rounded-full ${isArabic ? 'ml-3' : 'mr-3'}`}></div>
                        <span className="text-sm text-gray-600 font-tajawal-medium">
                          <span className="font-bold text-gray-800">{t('duration')}:</span> {isArabic ? item.duration : item.durationEn}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Button */}
                <div className={`flex ${isArabic ? 'justify-start' : 'justify-end'}`}>
                  <div className={`inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:from-indigo-600 hover:to-indigo-700 transition-all duration-200 font-tajawal-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${isArabic ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm font-bold">
                      {currentLevel === 'opportunities' ?
                        t('viewDetails') :
                        t('explore')
                      }
                    </span>
                    <FaArrowLeft className={`text-sm ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Opportunity Modal */}
      {showOpportunityModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="relative">
              {/* Modal Header with Image */}
              <div className="relative h-64 w-full">
                <Image
                  src={selectedOpportunity.image}
                  alt={isArabic ? selectedOpportunity.name : selectedOpportunity.nameEn}
                  fill
                  className="object-cover rounded-t-2xl"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-2xl"></div>
                <button
                  onClick={() => setShowOpportunityModal(false)}
                  className={`absolute top-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110 ${isArabic ? 'left-4' : 'right-4'}`}
                >
                  <FaArrowLeft className={`text-gray-700 text-lg ${isArabic ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-8" dir={isArabic ? 'rtl' : 'ltr'}>
                {/* Title Section */}
                <div className={`mb-6 ${isArabic ? 'text-right' : 'text-left'}`}>
                  <h2 className="text-3xl font-bold text-gray-800 font-tajawal-bold mb-2">
                    {isArabic ? selectedOpportunity.name : selectedOpportunity.nameEn}
                  </h2>
                  <div className={`w-16 h-1 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full ${isArabic ? 'mr-auto' : 'ml-0'}`}></div>
                </div>

                {/* Description */}
                <div className={`mb-8 ${isArabic ? 'text-right' : 'text-left'}`}>
                  <p className="text-gray-600 font-tajawal-medium leading-relaxed text-lg">
                    {isArabic ? selectedOpportunity.description : selectedOpportunity.descriptionEn}
                  </p>
                </div>

                {/* Details Cards */}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 ${isArabic ? 'rtl' : 'ltr'}`}>
                  <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-6 rounded-xl border border-indigo-200">
                    <div className={`flex items-center mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center ${isArabic ? 'ml-3' : 'mr-3'}`}>
                        <span className="text-white font-bold text-lg">💰</span>
                      </div>
                      <h4 className={`font-bold text-gray-800 font-tajawal-bold ${isArabic ? 'text-right' : 'text-left'}`}>
                        {t('requiredBudget')}
                      </h4>
                    </div>
                    <p className={`text-indigo-700 font-tajawal-bold text-xl ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? selectedOpportunity.budget : selectedOpportunity.budgetEn}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <div className={`flex items-center mb-3 ${isArabic ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center ${isArabic ? 'ml-3' : 'mr-3'}`}>
                        <span className="text-white font-bold text-lg">⏱️</span>
                      </div>
                      <h4 className={`font-bold text-gray-800 font-tajawal-bold ${isArabic ? 'text-right' : 'text-left'}`}>
                        {t('implementationDuration')}
                      </h4>
                    </div>
                    <p className={`text-green-700 font-tajawal-bold text-xl ${isArabic ? 'text-right' : 'text-left'}`}>
                      {isArabic ? selectedOpportunity.duration : selectedOpportunity.durationEn}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className={`flex flex-col sm:flex-row gap-4 ${isArabic ? 'sm:flex-row-reverse' : ''}`}>
                  <Link
                    href={`/opportunities/${selectedOpportunity.id}`}
                    className={`flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-indigo-600 hover:to-indigo-700 transition-all duration-300 text-center font-tajawal-bold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isArabic ? 'flex-row-reverse' : ''}`}
                  >
                    <FaEye className={`text-lg ${isArabic ? 'ml-3' : 'mr-3'}`} />
                    {t('viewFullDetails')}
                  </Link>

                  <button
                    onClick={() => handleRequestOpportunity(selectedOpportunity)}
                    disabled={hasUserRequested(selectedOpportunity.id)}
                    className={`flex-1 px-6 py-4 rounded-xl transition-all duration-300 text-center font-tajawal-bold flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${isArabic ? 'flex-row-reverse' : ''} ${
                      hasUserRequested(selectedOpportunity.id)
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
                    }`}
                  >
                    <FaHandshake className={`text-lg ${isArabic ? 'ml-3' : 'mr-3'}`} />
                    {hasUserRequested(selectedOpportunity.id)
                      ? t('alreadyRequested')
                      : t('requestInvestment')
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
