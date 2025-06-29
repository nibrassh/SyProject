'use client'
import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

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
    }, 2500) // Slightly faster rotation
    return () => clearInterval(timer)
  }, [professions.length])

  return (
    <section className="relative min-h-[90vh] md:min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
            <span className="block text-indigo-600">{t('discover')}</span>
            <span className="block text-gray-800">{t('collaborate')}</span>
            <span className="block text-indigo-600">{t('succeed')}</span>
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
            <span className="text-gray-600">{t('join_forces_with')}</span>{' '}
            <span className="text-indigo-600 font-bold relative inline-block min-w-[180px] sm:min-w-[220px] h-[40px] sm:h-[50px] md:h-[60px]">
              {professions.map((profession, index) => (
                <span 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentProfession ? 'opacity-100' : 'opacity-0'}`}
                >
                  {profession}
                </span>
              ))}
            </span>
          </h2>
        </div>

        <div className="mt-10 md:mt-12 space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {t('join_now')}
          </button>
          <button className="px-6 py-2.5 sm:px-8 sm:py-3 bg-white text-indigo-600 border border-indigo-200 rounded-full font-medium hover:bg-indigo-50 transition-colors shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
            {t('learn_more')}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
      </div>
    </section>
  )
}