'use client'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const { t, i18n } = useTranslation('home')
  const [currentProfession, setCurrentProfession] = useState(0)

  // Profession translations
  const professions = [
    t('professions.contractors'),
    t('professions.investors'),
    t('professions.engineers'),
    t('professions.partners'),
    t('professions.architects'),
    t('professions.companies')
  ]

  // Auto-rotate professions
  useEffect(() => {
    const timer = setInterval(() => {
    setCurrentProfession(prev => (prev + 1) % professions.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [professions.length])

  return (
    <section className={`relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-blue-50 to-white ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
      <div className="container mx-auto px-4 text-center">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
            <span className="block text-blue-600">{t('hero.explore')}</span>
            <span className="block text-gray-800">.. {t('hero.connect')} ..</span>
            <span className="block text-blue-600">{t('hero.achieve')}</span>
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8">
            <span className="text-gray-600">{t('hero.connect_with')}</span>{' '}
            <span className="text-blue-600 font-bold relative inline-block min-w-[200px] h-[50px] md:h-[60px]">
              {professions.map((profession, index) => (
                <span 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ${index === currentProfession ? 'opacity-100' : 'opacity-0'}`}
                >
                  {profession}
                </span>
              ))}
            </span>
          </h2>
        </div>

        <div className="mt-12">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
            {t('hero.get_started')}
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  )
}