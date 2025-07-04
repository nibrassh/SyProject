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
      <div className="relative h-96 bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('hero_title')}
          </h1>
          <div className="w-24 h-1 bg-white mx-auto"></div>
        </div>
      </div>

      {/* Vision Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-blue-800 mb-4">
              {t('vision_title')}
            </h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              {t('vision_description')}
            </p>
          </div>

          <div className={`grid md:grid-cols-2 gap-12 items-center ${t('direction') === 'rtl' ? 'md:flex-row-reverse' : ''}`}>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/images.jpg"
                alt={t('vision_image_alt')}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h3 className="text-2xl font-serif text-blue-900 mb-6">
                {t('mission_title')}
              </h3>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {t('mission_description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-light text-blue-800 mb-4">
            {t('why_title')}
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            {t('why_description')}
          </p>
          
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl mx-auto">
            <p className="text-2xl font-serif text-blue-900 mb-4">
              {t('why_quote')}
            </p>
            <p className="text-lg text-gray-700">
              {t('why_subquote')}
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-light mb-6">
            {t('cta_title')}
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            {t('cta_description')}
          </p>
          <div className="flex flex-col items-center">
            <a 
              href={`mailto:${t('cta_email')}`} 
              className="px-8 py-3 bg-white text-blue-800 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              {t('cta_button')}: {t('cta_email')}
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}