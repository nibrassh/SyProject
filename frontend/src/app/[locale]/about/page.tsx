import Layout from "@/Layouts/Layout"
import Image from "next/image"
import { setRequestLocale } from 'next-intl/server'
import { useTranslations } from 'next-intl'
import { Metadata } from 'next'

import enMessages from '../../../../messages/en.json'
import arMessages from '../../../../messages/ar.json'

const messages = {
  en: enMessages,
  ar: arMessages
}

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }]
}

export async function generateMetadata({ params: { locale } }: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const localeMessages = messages[locale as keyof typeof messages]
  return {
    title: localeMessages.about.metadata.title,
    description: localeMessages.about.metadata.description,
    openGraph: {
      title: localeMessages.about.metadata.title,
      description: localeMessages.about.metadata.description,
      images: [{
        url: '/images/about-og.jpg',
        width: 1200,
        height: 630,
        alt: localeMessages.about.metadata.title,
      }]
    },
    alternates: {
      canonical: '/about',
      languages: {
        'en-US': '/en/about',
        'ar-SA': '/ar/about'
      }
    }
  }
}

export default function AboutPage({ params: { locale } }: { 
  params: { locale: string } 
}) {
  setRequestLocale(locale)
  const t = useTranslations('about')

  return (
    <Layout>
      <div className="h-full overflow-y-auto">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-tajawal">
              {t('hero_title')}
            </h1>
            <div className="w-16 h-1 bg-white mx-auto"></div>
          </div>
        </div>

        {/* Vision Section */}
        <section className="py-4 md:py-6 bg-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-green-500 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-red-500 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <div className="text-center mb-6">
              <h2 className="text-xl md:text-2xl font-light text-blue-800 mb-3 font-tajawal">
                {t('vision_title')}
              </h2>
              <div className="w-16 h-1 bg-blue-600 mx-auto mb-4"></div>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto font-tajawal">
                {t('vision_description')}
              </p>
            </div>

            {/* Vision Images Grid */}
            <div className="grid md:grid-cols-3 gap-4 mt-4">
              {/* Future Vision */}
              <div className="text-center group">
                <div className="relative h-24 md:h-28 rounded-xl overflow-hidden shadow-lg mb-3 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-800/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-blue-800 font-tajawal">{t('cards.future_vision.title')}</h3>
                  </div>
                </div>
                <p className="text-gray-600 font-tajawal text-xs leading-relaxed">
                  {t('cards.future_vision.description')}
                </p>
              </div>

              {/* Free Syria */}
              <div className="text-center group">
                <div className="relative h-24 md:h-28 rounded-xl overflow-hidden shadow-lg mb-3 bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-800/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-green-800 font-tajawal">{t('cards.free_syria.title')}</h3>
                  </div>
                </div>
                <p className="text-gray-600 font-tajawal text-xs leading-relaxed">
                  {t('cards.free_syria.description')}
                </p>
              </div>

              {/* Reconstruction */}
              <div className="text-center group">
                <div className="relative h-24 md:h-28 rounded-xl overflow-hidden shadow-lg mb-3 bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center group-hover:shadow-xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-red-800/20"></div>
                  <div className="relative z-10 text-center">
                    <div className="w-12 h-12 mx-auto mb-2 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-sm md:text-base font-semibold text-red-800 font-tajawal">{t('cards.reconstruction.title')}</h3>
                  </div>
                </div>
                <p className="text-gray-600 font-tajawal text-xs leading-relaxed">
                  {t('cards.reconstruction.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Section */}
        <section className="py-8 md:py-12 bg-gray-50">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <h2 className="text-xl md:text-2xl font-light text-blue-800 mb-4 font-tajawal">
              {t('why_title')}
            </h2>
            <div className="w-16 h-1 bg-blue-600 mx-auto mb-4"></div>
            <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed max-w-4xl mx-auto font-tajawal">
              {t('why_description')}
            </p>

            <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
              <p className="text-lg md:text-xl font-semibold text-blue-900 mb-3 font-tajawal leading-relaxed">
                {t('why_quote')}
              </p>
              <p className="text-sm md:text-base text-gray-700 font-tajawal">
                {t('why_subquote')}
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-8 md:py-12 bg-blue-800 text-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-xl md:text-2xl font-light mb-4 font-tajawal">
              {t('cta_title')}
            </h2>
            <p className="text-base md:text-lg mb-6 max-w-3xl mx-auto font-tajawal leading-relaxed">
              {t('cta_description')}
            </p>
            <div className="flex flex-col items-center">
              <a
                href={`mailto:${t('cta_email')}`}
                className="inline-flex items-center px-6 md:px-8 py-3 bg-white text-blue-800 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg font-tajawal text-sm md:text-base"
              >
                {t('cta_button')}: {t('cta_email')}
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}