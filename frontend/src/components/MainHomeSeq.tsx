'use client'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function HeroSection() {
  const t = useTranslations('home')
  const [currentProfession, setCurrentProfession] = useState(0)

  const professions = [
    t('developers'),
    t('investors'),
    t('entrepreneurs'),
    t('startups'),
    t('innovators'),
    t('visionaries')
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProfession(prev => (prev + 1) % professions.length)
    }, 2500)
    return () => clearInterval(timer)
  }, [professions.length])

  return (
    <section className="relative w-full flex flex-col justify-center overflow-hidden py-8 sm:py-12" style={{height: 'calc(100vh - 140px)'}}>
      {/* Enhanced Background with Multiple Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-indigo-100/50"></div>

      {/* Animated Background Elements - Full Screen Coverage */}
      <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-indigo-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1/3 h-1/3 bg-pink-200/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

      {/* Main Content Container - Accounting for Header and Footer */}
      <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 h-full">
        <div className="w-full max-w-5xl mx-auto text-center">
          {/* Main Heading with Enhanced Typography - Three words in one line */}
          <div className="mb-2 md:mb-3">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-tajawal-extrabold mb-2 leading-relaxed tracking-normal">
              <div className="flex flex-wrap justify-center items-center gap-2 md:gap-3 lg:gap-4 px-2">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 animate-gradient-x drop-shadow-lg px-1 py-1">
                  {t('discover')}
                </span>
                <span className="text-gray-800 drop-shadow-lg px-1 py-1">
                  {t('collaborate')}
                </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-gradient-x drop-shadow-lg px-1 py-1">
                  {t('succeed')}
                </span>
              </div>
            </h1>
          </div>

          {/* Enhanced Subtitle with Better Animation - More organized layout */}
          <div className="max-w-5xl mx-auto mb-2 md:mb-3 text-center">
           

            {/* Additional descriptive text with better spacing */}
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed px-4 font-tajawal-light">
                {t('description')}
              </p>
            </div>
        </div>

          {/* Enhanced Call-to-Action Buttons - Better Organization */}
          <div className="max-w-2xl mx-auto mb-2 md:mb-3">
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                href={'/opportunities'}
                className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg font-tajawal-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-indigo-300 w-full sm:w-auto sm:min-w-[180px] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-purple-700 to-blue-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
              <span className="relative flex items-center gap-3">
                <svg className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {t('join_now')}
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>

              <Link
                href={'/about'}
                className="group relative inline-flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base md:text-lg font-tajawal-bold text-indigo-600 bg-white/90 backdrop-blur-sm border-2 border-indigo-200 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-indigo-300 w-full sm:w-auto sm:min-w-[180px] overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-indigo-100/30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>
              <span className="relative flex items-center gap-2">
                <svg className="w-4 h-4 transform group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {t('learn_more')}
                <svg className="w-4 h-4 transform group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

          {/* Features Section - Better Organization */}
          <div className="max-w-5xl mx-auto mb-2 md:mb-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="text-center group p-3 md:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-indigo-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-tajawal-bold text-gray-800 mb-2">{t('features.speed.title')}</h3>
                <p className="text-gray-600 leading-relaxed text-xs md:text-sm font-tajawal-regular">{t('features.speed.description')}</p>
              </div>

              <div className="text-center group p-3 md:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-tajawal-bold text-gray-800 mb-2">{t('features.reliability.title')}</h3>
                <p className="text-gray-600 leading-relaxed text-xs md:text-sm font-tajawal-regular">{t('features.reliability.description')}</p>
              </div>

              <div className="text-center group p-3 md:p-4 rounded-xl bg-white/50 backdrop-blur-sm border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
                  <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-base md:text-lg font-tajawal-bold text-gray-800 mb-2">{t('features.network.title')}</h3>
                <p className="text-gray-600 leading-relaxed text-xs md:text-sm font-tajawal-regular">{t('features.network.description')}</p>
              </div>
          </div>
        </div>

        </div>


      </div>

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none"></div>
    </section>
  )
}