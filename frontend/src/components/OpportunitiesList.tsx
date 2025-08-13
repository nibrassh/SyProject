'use client'

import Image from 'next/image'
import { FaBuilding, FaArrowLeft, FaList, FaMapMarkerAlt } from 'react-icons/fa'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'
import ViewDetails from './ViewDetails'
import Link from 'next/link'
import ViewCenterDetails from './ViewCenterDetails'

export default function OpportunitiesList({ opportunities, viewMode, setViewMode ,type}) {
  const t = useTranslations('opportunities')
  const isArabic = useLocale() === 'ar'

  const [selectedOpportunities, setSelectedOpportunities] = useState(opportunities)
  const [selectedCompanyId, setSelectedCompanyId] = useState(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState(null) // 👈 for ViewDetails

  const uniqueCompanies = Array.from(
    new Map(
      opportunities.map((item) => [
        item._id,
        { id: item._id, name: item.name },
      ])
    ).values()
  )

  const handleCompanyChange = (e) => {
    const id = e.target.value
    if (!id) {
      setSelectedCompanyId(null)
      setSelectedOpportunities(opportunities)
    } else {
      const filtered = opportunities.filter((op) => op._id.toString() === id)
      setSelectedCompanyId(id)
      setSelectedOpportunities(filtered)
    }
  }

  return (
    <>
      <div className="mb-8 mt-8 mx-8" dir={isArabic ? 'rtl' : 'ltr'} lang={isArabic ? 'ar' : 'en'}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-800 font-tajawal-bold">{t('title')}</h1>
          <select
            value={selectedCompanyId || ''}
            onChange={handleCompanyChange}
            className={`bg-white border-2 border-indigo-200 rounded-xl px-4 py-3 text-gray-700 font-tajawal-medium min-w-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm hover:border-indigo-300 transition-all duration-200 ${
              isArabic ? 'text-right' : 'text-left'
            }`}
          >
          <option value="">
  {
    type === 'company' ? t('companies') :
    type === 'branch' ? (isArabic ? "الفروع" : "branches") :
    type === 'center' ? (isArabic ? "المراكز" : "centers") :
    ''
  }
</option>

            {uniqueCompanies.map((item) => (
              <option key={item.id} value={item.id}>
                {isArabic ? item.name?.ar : item.name?.en}
              </option>
            ))}
          </select>
        </div>

        {selectedCompanyId && (
          <div className={`flex items-center mb-6 ${isArabic ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`flex items-center bg-gray-50 rounded-lg px-4 py-2 ${
                isArabic ? 'space-x-reverse space-x-2' : 'space-x-2'
              }`}
            >
              <FaArrowLeft className={`text-gray-400 text-sm ${isArabic ? 'rotate-180' : ''}`} />
              <button
                onClick={() => {
                  setSelectedCompanyId(null)
                  setSelectedOpportunities(opportunities)
                }}
                className="text-indigo-600 hover:text-indigo-800 font-tajawal-medium text-sm px-2 py-1 rounded hover:bg-indigo-50 transition-all duration-200"
              >
                {isArabic
                  ? uniqueCompanies.find((c) => c.id.toString() === selectedCompanyId)?.name?.ar
                  : uniqueCompanies.find((c) => c.id.toString() === selectedCompanyId)?.name?.en}
              </button>
            </div>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between">
          <div className="bg-gray-100 p-1 rounded-xl shadow-inner">
            <div className={`flex ${isArabic ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
              {[{ mode: 'map', icon: <FaMapMarkerAlt />, label: t('mapView') },
                { mode: 'list', icon: <FaList />, label: t('listView') },
              ].map(({ mode, icon, label }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex items-center px-6 py-3 rounded-lg font-tajawal-medium min-w-[140px] justify-center transition-all duration-300 ${
                    viewMode === mode
                      ? 'bg-white text-indigo-600 shadow-md border border-indigo-100'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {icon}
                  <span className={isArabic ? 'ml-2' : 'mr-2'}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Opportunity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 py-4" dir={isArabic ? 'rtl' : 'ltr'}>
        {selectedOpportunities.map((item) => {
          const name = isArabic ? item.name?.ar : item.name?.en
          const description = isArabic ? item.shortdescription?.ar : item.shortdescription?.en
          const address = isArabic ? item.address?.ar : item.address?.en

          return (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
            >
              {item.image && (
                <div className="relative h-48 w-full">
                  <Image src={item.image} alt={name} fill className="object-cover" unoptimized />
                </div>
              )}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div
                    className={`flex-shrink-0 w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center ${
                      isArabic ? 'ml-4' : 'mr-4'
                    }`}
                  >
                    <FaBuilding className="text-indigo-600 text-xl" />
                  </div>
                  <h3 className={`text-xl font-bold text-gray-800 ${isArabic ? 'text-right' : 'text-left'}`}>{name}</h3>
                </div>

                {address && (
                  <p className={`text-sm text-gray-500 ${isArabic ? 'text-right' : 'text-left'}`}>📍 {address}</p>
                )}
                <p className={`text-gray-600 text-sm leading-relaxed ${isArabic ? 'text-right' : 'text-left'}`}>
                  {description}
                </p>

<div className={`flex flex-wrap gap-4 mt-4 ${isArabic ? 'justify-start' : 'justify-end'}`}>
  {type === 'company' && item.branches?.length > 0 && (
    <Link
      href={`/opportunities/${item._id}`}
      className="text-indigo-600 font-semibold hover:underline flex items-center"
      // Remove onClick alert if not needed or keep it
         >
      {isArabic ? 'عرض الفروع' : 'Show Branches'}
    </Link>
  )}

  {type === 'branch' && item.centers?.length > 0 && (
    <Link
      href={`/opportunities/${item.compId}/${item._id}`}
      className="text-indigo-600 font-semibold hover:underline flex items-center"
    >
      {isArabic ? 'عرض المراكز' : 'Show Centers'}
    </Link>
  )}

  <button
    className="text-indigo-600 font-semibold hover:underline flex items-center"
    onClick={() => setSelectedOpportunity(item)} // 👈 Show details
  >
    {isArabic ? 'عرض التفاصيل' : 'View Details'}
    <FaArrowLeft className={`ml-2 transition-transform ${isArabic ? 'rotate-180' : ''}`} />
  </button>
</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ViewDetails Modal */}
{selectedOpportunity && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 backdrop-blur-sm">
    <div
      className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl h-[80vh] overflow-y-auto p-10 relative animate-fade-in custom-scroll"
      dir={isArabic ? 'rtl' : 'ltr'}
      lang={isArabic ? 'ar' : 'en'}
    >
      <button
        onClick={() => setSelectedOpportunity(null)}
        className="absolute top-4 right-6 text-gray-400 hover:text-red-600 text-2xl"
      >
        ✕
      </button>
    {type === 'center' ? (
  <ViewCenterDetails opportunity={selectedOpportunity} type={type} />
) : (
  <ViewDetails opportunity={selectedOpportunity} type={type} />
)}
    </div>
  </div>
)}



    </>
  )
}
